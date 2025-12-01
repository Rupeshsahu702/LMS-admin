import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = () => {
    try {
        const {
            CLOUDINARY_CLOUD_NAME,
            CLOUDINARY_API_KEY,
            CLOUDINARY_API_SECRET,
        } = process.env;

        if (
            !CLOUDINARY_CLOUD_NAME ||
            !CLOUDINARY_API_KEY ||
            !CLOUDINARY_API_SECRET
        ) {
            throw new Error(
                "Missing required Cloudinary environment variables"
            );
        }

        cloudinary.config({
            cloud_name: CLOUDINARY_CLOUD_NAME,
            api_key: CLOUDINARY_API_KEY,
            api_secret: CLOUDINARY_API_SECRET,
        });

        console.log("Cloudinary configured successfully");
    } catch (error) {
        console.error("Cloudinary configuration error:", error.message);
        throw new Error(`Cloudinary configuration failed: ${error.message}`);
    }
};

export default connectCloudinary;
