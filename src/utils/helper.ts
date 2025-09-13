import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// helper to stream buffer to cloudinary
export const streamUpload = (buffer: Buffer) =>
  new Promise<any>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" }, // auto = pdf/images/videos all handled
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
