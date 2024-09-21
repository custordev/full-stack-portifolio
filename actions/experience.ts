"use server";

import { db } from "@/prisma/db";
import { ExperienceProps, ServiceProps } from "@/types/types";
import { revalidatePath } from "next/cache";

export type ProjectCategoryProps = {
  title: string;
  slug: string;
};
export type ProjectProps = {
  title: string;
  slug: string;
  imageUrl: string;
  tags: string;
  description: string;
  categoryId: string;
  github: string;
  hostedLink: string;
};
export async function createExperience(data: ExperienceProps) {
  try {
    const newExp = await db.experience.create({
      data,
    });
    console.log(newExp);
    revalidatePath("/dashboard/resume");
    return newExp;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getExperiences() {
  try {
    const experiences = await db.experience.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return experiences;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getExperienceById(id: string) {
  if (id) {
    try {
      const experience = await db.experience.findUnique({
        where: {
          id,
        },
      });

      return experience;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
export async function deleteExperienceById(id: string) {
  if (id) {
    try {
      const experience = await db.experience.delete({
        where: {
          id,
        },
      });

      return {
        ok: true,
        data: experience,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export async function updateExperienceById(id: string, data: ExperienceProps) {
  try {
    const updatedExp = await db.experience.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/resume");
    return updatedExp;
  } catch (error) {
    console.log(error);
  }
}
