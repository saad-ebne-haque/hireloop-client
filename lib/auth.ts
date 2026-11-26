import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { z } from "zod";



const client = new MongoClient(`${process.env.MONGODB_SECRET_URI}`);
const db = client.db('hireloop-db');
const signupRoleValidator = process.env.NODE_ENV === "development"
    ? z.enum(["seeker", "recruiter", "admin"])
    : z.enum(["seeker", "recruiter"]);



export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

    emailAndPassword: {
        enabled: true,

    },
    user: {
        additionalFields: {
            role: {
                type: ["seeker", 'recruiter', 'admin'],
                required: false,
                defaultValue: "seeker",
                input: true,
                validator: {
                     input: signupRoleValidator,
                },
            }
        }
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    database: mongodbAdapter(db, {
        client,
    }),
});