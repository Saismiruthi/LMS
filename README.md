🎓 Learning Management System (LMS)

A full-stack Learning Management System built using the MERN stack for students to discover courses, enroll in courses, track learning progress, and for educators to create and manage courses.

📌 Project Overview

The application connects students and educators through a centralized online learning platform.

👨‍🎓 Students can

Browse published courses

Search and explore courses

View course details

Purchase courses

Access enrolled courses

Watch lectures

Track lecture completion

View learning progress

Rate purchased courses

👨‍🏫 Educators can

Become an educator

Create and publish courses

Add course information and lectures

Upload course thumbnails

Manage courses

View enrolled students

View course-related earnings

Access an educator dashboard

✨ Key Features

Student Features

🔐 Secure user authentication

📚 Course browsing and search

📖 Course details

💳 Course purchasing using Stripe

🎥 Lecture player

📈 Course progress tracking

✅ Lecture completion

⭐ Course ratings

Educator Features

🔐 Educator authentication and authorization

👨‍🏫 Become an educator

➕ Course creation

📝 Lecture management

🖼️ Course thumbnail upload

☁️ Cloudinary media storage

📚 Educator course management

👥 Enrolled student information

💰 Earnings and dashboard information

💳 Payment System

Stripe Checkout is used for course purchases.

Payment Workflow

Student
   ↓
Select Course
   ↓
Purchase Request
   ↓
Stripe Checkout
   ↓
Payment
   ↓
Stripe Webhook
   ↓
Purchase Completed
   ↓
Student Enrollment

🔐 Authentication

Clerk is used for user authentication. The backend uses authenticated user information to identify users and perform protected operations.

Authentication Workflow

User
  ↓
Clerk Authentication
  ↓
Authenticated Request
  ↓
Express Backend
  ↓
User Identification
  ↓
MongoDB

☁️ Cloudinary Media Storage

Cloudinary is used to store course thumbnails and uploaded media. Multer handles file uploads before the media is uploaded to Cloudinary.

Upload Workflow

Course Form
    ↓
Frontend
    ↓
Multipart Request
    ↓
Multer
    ↓
Express Backend
    ↓
Cloudinary
    ↓
Media URL
    ↓
MongoDB

📈 Course Progress Tracking

Completed lecture information is stored in the CourseProgress model so students can maintain their learning progress.

⭐ Course Rating System

Students can rate courses they have purchased. The backend validates enrollment and rating information before saving a rating.

🏗️ System Architecture

The project follows a client-server architecture.

                    ┌─────────────────────┐
                    │   Student /         │
                    │   Educator          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ React Frontend      │
                    │ Vite                │
                    └──────────┬──────────┘
                               │
                            REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Express Backend     │
                    │ Node.js             │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        ┌───────────┐   ┌────────────┐   ┌────────────┐
        │ MongoDB   │   │ Cloudinary │   │   Stripe   │
        │ Mongoose  │   │   Media    │   │  Payments  │
        └───────────┘   └────────────┘   └────────────┘

                    ┌─────────────────────┐
                    │ Clerk Authentication│
                    └─────────────────────┘

🔄 Application Workflow

Student Workflow

Register / Login
      ↓
Browse Courses
      ↓
View Course Details
      ↓
Select Course
      ↓
Stripe Checkout
      ↓
Payment Successful
      ↓
Course Enrollment
      ↓
My Enrollments
      ↓
Watch Lectures
      ↓
Update Progress
      ↓
Rate Course

Educator Workflow

User Login
     ↓
Become Educator
     ↓
Educator Role
     ↓
Dashboard
     ↓
Create Course
     ↓
Upload Thumbnail
     ↓
Cloudinary Storage
     ↓
Publish Course
     ↓
Track Enrollments
     ↓
View Earnings

🛠️ Technologies Used

Frontend

Technology

Purpose

React.js

User interface

Vite

Development and build tool

React Router

Client-side routing

Axios

API communication

Tailwind CSS

Styling

Clerk React

Authentication

React YouTube

Video integration

Quill

Rich text editor

React Toastify

Notifications

RC Progress

Progress visualization

Humanize Duration

Duration formatting

Uniqid

Unique identifiers

Backend

Technology

Purpose

Node.js

JavaScript runtime

Express.js

Backend API framework

Mongoose

MongoDB ODM

Clerk Express

Authentication integration

Multer

File upload handling

Cloudinary

Media storage

Stripe

Payment processing

Svix

Webhook verification

CORS

Cross-origin communication

dotenv

Environment configuration

Nodemon

Development server

Database

Technology

Purpose

MongoDB

Application database

Mongoose

Database modeling and queries

Deployment

Technology

Purpose

Vercel

Application deployment

🗄️ Database Design

The main database models are:

User

Course

CourseProgress

Purchase

User

Stores user-related information and enrollment details.

Course

Stores course information, description, content, educator information, thumbnail, enrollment information, and ratings.

CourseProgress

Stores user ID, course ID, and completed lecture information.

Purchase

Stores user information, course information, purchase amount, payment status, and payment-related information.

🧠 Backend Architecture

server/
├── configs/
│   ├── cloudinary.js
│   ├── mongodb.js
│   └── multer.js
├── controllers/
│   ├── courseController.js
│   ├── educatorController.js
│   ├── userController.js
│   └── webhooks.js
├── middlewares/
├── models/
│   ├── Course.js
│   ├── CourseProgress.js
│   ├── Purchase.js
│   └── User.js
├── routes/
│   ├── courseRoute.js
│   ├── educatorRoutes.js
│   └── userRoutes.js
├── server.js
├── package.json
└── vercel.json

🌐 Frontend Architecture

client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── educator/
│   │   └── student/
│   ├── context/
│   │   └── AppContext.jsx
│   ├── pages/
│   │   ├── educator/
│   │   └── student/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
├── tailwind.config.js
└── vercel.json

👨‍🎓 Student Pages

pages/student/
├── Home.jsx
├── CoursesList.jsx
├── CourseDetails.jsx
├── MyEnrollments.jsx
└── Player.jsx

👨‍🏫 Educator Pages

pages/educator/
├── Educator.jsx
├── Dashboard.jsx
├── AddCourse.jsx
├── MyCourses.jsx
└── StudentsEnrolled.jsx

🔌 REST API Structure

/api/course
/api/educator
/api/user

Course APIs

Fetch published courses

Fetch course details

Educator APIs

Become an educator

Create courses

Get educator courses

Get dashboard information

Get enrolled students

User APIs

Get user information

Get enrolled courses

Purchase courses

Update course progress

Get course progress

Add course ratings

🔄 API Request Flow

React Component
       ↓
Axios Request
       ↓
Express Route
       ↓
Controller
       ↓
Mongoose Model
       ↓
MongoDB
       ↓
Controller Response
       ↓
JSON Response
       ↓
React UI

🔔 Webhook Integration

Clerk Webhooks

Used to synchronize user information with the application database.

Events include:

user.created

user.updated

user.deleted

Stripe Webhooks

Used to process payment events.

Example:

checkout.session.completed

🔐 Security & Environment Variables

Sensitive configuration should be stored in environment variables.

Example backend configuration:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Frontend example:

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

Use the exact environment variable names configured in your application source code.

Never commit real credentials, .env files, API keys, database passwords, Stripe secrets, Clerk secrets, Cloudinary secrets, or webhook secrets to GitHub.

⚙️ Installation

Prerequisites

Node.js

npm

MongoDB or MongoDB Atlas

Git

Clerk configuration

Stripe configuration

Cloudinary configuration

1. Clone the Repository

git clone https://github.com/Saismiruthi/LMS.git
cd LMS

2. Install Frontend Dependencies

cd client
npm install

3. Install Backend Dependencies

cd ../server
npm install

🔧 Environment Configuration

Create server/.env and configure the required backend variables:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Configure the frontend Clerk publishable key in the frontend environment.

Example:

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

▶️ Running the Application

The frontend and backend run as separate applications.

Start Backend

cd server
npm run server

Or:

npm start

Start Frontend

Open another terminal:

cd client
npm run dev

🧪 Development Commands

Frontend

npm run dev
npm run build
npm run lint
npm run preview

Backend

npm run server
npm start

🌐 Live Demo

Backend

https://lms-backend-vert-seven.vercel.app/

The backend is deployed using Vercel. A complete production setup also requires the frontend and external service environment variables to be configured correctly.

🧠 Challenges & Solutions

Frontend and Backend Communication

REST APIs were created using Express and consumed from the React frontend using Axios.

User Authentication

Clerk was integrated for authentication, while the backend uses authenticated user information for protected operations.

Course Media Upload

Multer handles file uploads and Cloudinary provides external media storage.

Payment Confirmation

Stripe Checkout handles payments and Stripe webhooks confirm completed checkout events.

Course Progress

The CourseProgress model stores completed lecture information for each user and course.

📚 What I Learned

Frontend

React.js

Component-based architecture

React Router

Context API

Axios

Tailwind CSS

Form handling

Video integration

Responsive UI development

Backend

Node.js

Express.js

REST API development

Routes and controllers

Middleware

File uploads

Webhooks

Authentication integration

Payment integration

Database

MongoDB

Mongoose

Schema design

Models

CRUD operations

Document relationships

populate()

Progress tracking

Third-Party Services

Clerk authentication

Stripe Checkout

Stripe webhooks

Cloudinary media storage

Svix webhook verification

Development and Deployment

Git

GitHub

Environment variables

Vercel

Debugging full-stack applications

🔮 Future Improvements

Online quizzes and assessments

Course completion certificates

Advanced student analytics

Advanced educator analytics

Notification system

Student-educator communication

Advanced course filtering

Improved mobile experience

Automated frontend and backend testing

Additional security and validation

CI/CD automation

More advanced learning analytics

🤝 Contributing

Clone the repository:

git clone https://github.com/Saismiruthi/LMS.git

Create a branch:

git checkout -b feature/your-feature

Make changes:

git add .

Commit:

git commit -m "Add your feature"

Push:

git push origin feature/your-feature

Then create a Pull Request.

⚠️ Security Notice

Never commit:

.env files

API keys

Database credentials

Stripe secret keys

Clerk secret keys

Cloudinary API secrets

Webhook secrets

Always use environment variables for sensitive configuration.

📄 License

This project currently does not include a dedicated open-source license.

If you plan to distribute this project as open source, add an appropriate LICENSE file.

👩‍💻 Author

Sai Smiruthi

Full-Stack Developer | MERN Stack | Software Development

GitHub

https://github.com/Saismiruthi

Project Repository

https://github.com/Saismiruthi/LMS

⭐ Project Highlights

MERN Full-Stack Application

React + Vite Frontend

Node.js + Express Backend

MongoDB + Mongoose

Clerk Authentication

Stripe Payment Integration

Stripe Webhooks

Cloudinary Media Storage

Course Management

Student Enrollment

Course Progress Tracking

Course Rating System

Educator Dashboard

REST APIs

Modular Backend Architecture

Vercel Deployment

🙌 Thank You

Thank you for checking out this project!

If you find the project useful or interesting, consider giving the repository a ⭐.
