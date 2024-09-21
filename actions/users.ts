"use server";

"use server";

import { db } from "@/prisma/db";
import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
export type RegisterInputProps = {
  name: string;
  email: string;
  role: UserRole;
  image: string;
  password: string;
};
export async function createUser(formData: RegisterInputProps) {
  const { name, image, email, role, password } = formData;
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return {
        data: null,
        error: `User with this email ( ${email})  already exists in the Database`,
        status: 409,
      };
    }
    // Encrypt the Password =>bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    //Generate Token
    const generateToken = () => {
      const min = 100000; // Minimum 6-figure number
      const max = 999999; // Maximum 6-figure number
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const userToken = generateToken();
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        image,
        token: userToken,
      },
    });
    return {
      data: newUser,
      error: null,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
}
