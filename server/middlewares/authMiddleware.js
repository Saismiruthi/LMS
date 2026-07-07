import { clerkClient } from "@clerk/express";

export const protectEducator = async (req, res, next) => {
    try {
        console.log("Authorization Header:", req.headers.authorization);

        const auth = req.auth();
        console.log("Auth:", auth);

        const { userId } = auth;
        console.log("Middleware User ID:", userId);

        const response = await clerkClient.users.getUser(userId);

        if (response.publicMetadata.role !== "educator") {
            return res.json({
                success: false,
                message: "Unauthorized Access"
            });
        }

        next();

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};