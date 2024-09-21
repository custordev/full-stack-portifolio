"use server";
import { db } from "@/prisma/db";
import { ContactProps, SettingProps } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function updateSettings(id: string, data: SettingProps) {
  try {
    const updatedSettings = await db.settings.update({
      where: {
        id,
      },
      data,
    });
    // console.log(newCategory);
    revalidatePath("/dashboard/settings");
    return updatedSettings;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getSettings() {
  try {
    const settings = await db.settings.findMany();
    return settings[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function createSettings(data: SettingProps) {
  try {
    const settings = await db.settings.createMany({
      data,
    });
    revalidatePath("/dashboard/settings");
    return settings;
  } catch (error) {
    console.log(error);
    return null;
  }
}
