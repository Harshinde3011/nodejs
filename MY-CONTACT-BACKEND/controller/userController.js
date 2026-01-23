import User from "../models/userModel.js";
import bcrypt from "bcrypt"
import ApiError from "../utils/ApiError.js";
import JWT from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

class UserController {

    async registration(req, res, next) {
        try {

            const { username, email, password, mobileNo } = req.body;

            if (!username || !mobileNo || !password) {
                throw new ApiError("Please provide valid data", 400);
            }

            const isUserExists = await User.findOne({
                mobileNo: mobileNo
            });

            if (isUserExists) {
                throw new ApiError("User already exists", 400);
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("hashedPassword: ", hashedPassword);

            const user = await User.create({
                username,
                mobileNo,
                email,
                password: hashedPassword
            });

            if (user) {
                res.status(201).json({
                    _id: user._id,
                    email: user.email,
                    message: "User created successfully",
                })
            } else {
                throw new ApiError("User data is not valid", 400)
            }

        } catch (error) {
            console.log("Error in UserController.registration");
            next(error)
        }
    }

    async login(req, res, next) {
        try {

            const { password, mobileNo } = req.body;

            if (!mobileNo || !password) {
                throw new ApiError("Please provide valid data", 400);
            }

            const isUserExists = await User.findOne({
                mobileNo: mobileNo
            });

            if (isUserExists && (await bcrypt.compare(password, isUserExists.password))) {
                const user = {
                    _id: isUserExists._id,
                    username: isUserExists.username,
                    email: isUserExists.email,
                }

                const accesToken = JWT.sign(user, process.env.ACCESS_TOKEN_KEY, { expiresIn: "15m" });

                res.status(200).json({
                    accesToken
                })
            }else{
                throw new ApiError("Invalid credentails provided",400) 
            }

        } catch (error) {
            console.log("Error in UserController.registration");
            next(error)
        }
    }

    async currentUser(req, res, next) {
        try {
            const user = req.user  // comming from verifyJWT middleware

            res.status(201).json({
                data: user
            })
        } catch (error) {
            console.log("Error in UserController.registration");
            next(error)
        }
    }

    // used stream to upload file, and backpress handled, you can use multer which will automatically handle backPressure
    async uploadMedia(req, res, next) {
        try {
            const _fileName = fileURLToPath(import.meta.url);
            const _dirname = path.dirname(_fileName);
            const filename = req.headers["x-file-name"] || "uploaded.bin";
    
            const filePath = path.join(_dirname, filename);
    
            const writeStream = fs.createWriteStream(filePath);
    
            req.pipe(writeStream);
    
            writeStream.on("finish", () => {
                res.json({ message: "File uploaded successfully" });
            })
    
            writeStream.on("error", () => {
                res.status(500).json({ error: "Upload failed" });
            });
        } catch (error) {
            console.log("Error in UserController.uploadMedia");
            next(error)
        }
    }

    async uploadOnS3(req, res) {
        try {
            const s3 = new S3Client({
                region: "ap-south-1",
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY,
                    secretAccessKey: process.env.AWS_SECRET_KEY
                }
            });
            const upload = new Upload({
                client: s3,
                params: {
                    Bucket: "my-bucket-name",
                    Key: `uploads/${Date.now()}.bin`,
                    Body: req // 👈 stream directly from request
                }
            });

            await upload.done();

            res.json({ message: "File uploaded to S3 successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Upload failed" });
        }
    };

}

export default new UserController();