import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration"
import { useAuth, useUser} from "@clerk/clerk-react";
import axios from 'axios'
import { toast } from "react-toastify";
export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const currency = import.meta.env.VITE_CURRENCY

    const navigate = useNavigate()

    const {getToken} = useAuth()

    const {user} = useUser()

    const [allCourses, setAllCourses] = useState([])
    const [isEducator, setisEducator] = useState(false)
    const [enrolledCourses, setEnrolledCourses] = useState([])
    const [userData, setUserData] = useState(null)

    
    //Fetch All COurses 
    const fetchAllCourses = async () => {
        //setAllCourses(dummyCourses);
        try {
            const { data }= await axios.get(backendUrl + '/api/course/all');
           if(data.success){
            setAllCourses(data.courses)
           }
           else{
            toast.error(data.message)
           }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //fetch userData
    const fetchUserData = async () => {
        if(user.publicMetadata.role === 'educator')
        {
            setisEducator(true)
        }
        try {
            const token = await getToken();
            const { data } = await axios.get(backendUrl + '/api/user/data', {headers: {Authorization: `Bearer ${token}`}})
            if(data.success){
                setUserData(data.user)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    //Function to calculate aveerage rating of course
  const calculateRating = (course) => {

    if (!course?.courseRatings?.length) return 0;

    let total = 0;

    course.courseRatings.forEach((rating) => {
        total += rating.rating;
    });

    return Math.floor(total / course.courseRatings.length);
};
    //Function to calculate Course chapter time
   const calculateChapterTime = (chapter) => {
    let time = 0;

    if (!Array.isArray(chapter?.chapterContent)) {
        return humanizeDuration(0);
    }

    chapter.chapterContent.forEach((lecture) => {
        time += lecture.lectureDuration || 0;
    });

    return humanizeDuration(time * 60 * 1000, {
        units: ["h", "m"],
    });
};

    //Function to Calculate  Course Duration
    const calculateCourseDuration = (course) => {
    let time = 0;

    if (!course?.courseContent) {
        return humanizeDuration(0);
    }

    course.courseContent.forEach((chapter) => {
        if (Array.isArray(chapter.chapterContent)) {
            chapter.chapterContent.forEach((lecture) => {
                time += lecture.lectureDuration || 0;
            });
        }
    });

    return humanizeDuration(time * 60 * 1000, {
        units: ["h", "m"],
    });
};


    // Function calculate to No of Lectures in the course
    const calculateNoOfLectures = (course) => {

    if (!course?.courseContent) {
        return 0;
    }

    let totalLectures = 0;

    course.courseContent.forEach((chapter) => {

        if (Array.isArray(chapter?.chapterContent)) {
            totalLectures += chapter.chapterContent.length;
        }

    });

    return totalLectures;
}
     //fetch user enrolled course
     const fetchUserEnrolledCourses = async () => {
       try {
        const token = await getToken();
        const { data } = await axios.get(backendUrl + '/api/user/enrolled-courses', {headers: {Authorization: `Bearer ${token}`}})
        if(data.success){
            setEnrolledCourses(data.enrolledCourses.reverse())

        }
        else{
            toast.error(data.message)
        }
       } catch (error) {
        toast.error(error.message)
       }
       
     }

    useEffect (() => {
        fetchAllCourses()
        
    },[])

 

    useEffect(() => {
        if(user){
            fetchUserData()
            fetchUserEnrolledCourses()
        }
    },[user]);

    const value = {
        currency,allCourses,navigate,calculateRating,
        isEducator,setisEducator,calculateNoOfLectures,calculateCourseDuration,
        calculateChapterTime,enrolledCourses,fetchUserEnrolledCourses,backendUrl, userData, setUserData, getToken, fetchAllCourses
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}