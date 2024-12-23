"use server";

import { User } from "next-auth";
import prisma from "./prismadb";
import bcrypt from "bcryptjs";

interface CustomUser extends User {
   role?: string
   password?: string
}

export async function createUser(email: string, password: string, name?: string): Promise<Record<string, string | CustomUser>> {

   const checkUser = await prisma.user.findUnique({
      where: {
         email,
      },
   });

   if (checkUser) {
      return { "status": "error", "message": "User already exists" };
   }

   const hashedPassword = bcrypt.hashSync(password, 10);

   const user = await prisma.user.create({
      data: {
         name,
         email,
         password: hashedPassword,
         createdAt: new Date(),
         updatedAt: new Date(),
      },
   });

   if (!user) {
      return { "status": "error", "message": "Failed to create user" };
   }

   return { "status": "success", "message": "User created successfully" };
}

export async function getUser(email: string): Promise<Record<string, string | User>> {
   const user = await prisma.user.findUnique({
      where: {
         email,
      },
      include: {
         accounts: true,
      }
   });

   if (!user) {
      return { "status": "error", "message": "User not found" };
   }

   return { "status": "success", "message": "User found successfully", "user": user };
}
