"use server";
import { db } from "@/prisma/db";
import { ContactProps, SkillProps } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createSkill(data: SkillProps) {
  try {
    const newSkill = await db.skill.create({
      data,
    });
    // console.log(newSkill);
    revalidatePath("/dashboard/skills");
    return newSkill;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getSkills() {
  try {
    const skills = await db.skill.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return skills;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function deleteSkill(id: string) {
  if (id) {
    try {
      const deletedSkill = await db.skill.delete({
        where: {
          id,
        },
      });
      return {
        ok: true,
        data: deletedSkill,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export async function updateSkillById(id: string, data: SkillProps) {
  try {
    const updatedSkill = await db.skill.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/skills");
    return updatedSkill;
  } catch (error) {
    console.log(error);
  }
}

export async function getSkillById(id: string) {
  if (id) {
    try {
      const skill = await db.skill.findUnique({
        where: {
          id,
        },
      });

      return skill;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
