"use server";

import { db } from "@/prisma/db";
import { ServiceProps } from "@/types/types";
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
export async function createService(data: ServiceProps) {
  const slug = data.slug;
  if (slug) {
    try {
      const existingService = await db.service.findUnique({
        where: {
          slug,
        },
      });
      if (existingService) {
        return existingService;
      }
      const newService = await db.service.create({
        data,
      });
      console.log(newService);
      revalidatePath("/dashboard/services");
      return newService;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export async function getServices() {
  try {
    const services = await db.service.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return services;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getServiceById(id: string) {
  if (id) {
    try {
      const service = await db.service.findUnique({
        where: {
          id,
        },
      });

      return service;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
export async function deleteServiceById(id: string) {
  if (id) {
    try {
      const service = await db.service.delete({
        where: {
          id,
        },
      });

      return {
        ok: true,
        data: service,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export async function updateServiceById(id: string, data: ServiceProps) {
  try {
    const updatedService = await db.service.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/services");
    return updatedService;
  } catch (error) {
    console.log(error);
  }
}
