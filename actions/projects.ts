"use server";

import { db } from "@/prisma/db";
import { Boxes, LayoutGrid, Pencil, Send } from "lucide-react";
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
export async function createProjectCategory(data: ProjectCategoryProps) {
  const slug = data.slug;
  if (slug) {
    try {
      const existingCategory = await db.projectCategory.findUnique({
        where: {
          slug,
        },
      });
      if (existingCategory) {
        return existingCategory;
      }
      const newCategory = await db.projectCategory.create({
        data,
      });
      console.log(newCategory);
      revalidatePath("/dashboard/projects");
      return newCategory;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
export async function createProject(data: ProjectProps) {
  const slug = data.slug;
  try {
    const existingProject = await db.project.findUnique({
      where: {
        slug,
      },
    });
    if (existingProject) {
      return existingProject;
    }
    const newProject = await db.project.create({
      data,
    });
    // console.log(newCategory);
    revalidatePath("/dashboard/projects");
    return newProject;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProjectCategories() {
  try {
    const categories = await db.projectCategory.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return categories;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getProjectsByCategories() {
  try {
    const categories = await db.projectCategory.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        products: true,
      },
    });

    return categories;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getProjects() {
  try {
    const projects = await db.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return projects;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getProjectById(id: string) {
  if (id) {
    try {
      const project = await db.project.findUnique({
        where: {
          id,
        },
      });

      return project;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
export async function deleteProjectById(id: string) {
  if (id) {
    try {
      const project = await db.project.delete({
        where: {
          id,
        },
      });

      return {
        ok: true,
        data: project,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export async function updateProjectById(id: string, data: ProjectProps) {
  try {
    const updatedProject = await db.project.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/projects");
    return updatedProject;
  } catch (error) {
    console.log(error);
  }
}

export async function getAnalytics() {
  try {
    const blogsCount = await db.blog.count();
    const messageCount = await db.message.count();
    const projectCount = await db.project.count();
    const serviceCount = await db.service.count();
    const analytics = [
      {
        title: "Blogs",
        count: blogsCount,
        href: "/dashboard/blogs",
        symbol: "",
        icon: Pencil,
      },
      {
        title: "Messages",
        count: messageCount,
        href: "/dashboard/messages",
        symbol: "",
        icon: Send,
      },
      {
        title: "Projects",
        count: projectCount,
        href: "/dashboard/projects",
        symbol: "",
        icon: LayoutGrid,
      },
      {
        title: "Services",
        count: serviceCount,
        href: "/dashboard/services",
        symbol: "",
        icon: Boxes,
      },
    ];
    return analytics;
  } catch (error) {
    console.log(error);
    return [];
  }
}
