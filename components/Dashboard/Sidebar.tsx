"use client";
import React from "react";
import Link from "next/link";
import {
  Airplay,
  Bell,
  BookCheck,
  BookOpen,
  Boxes,
  CircleUser,
  Computer,
  DollarSign,
  ExternalLink,
  Home,
  LayoutGrid,
  LineChart,
  Menu,
  Package,
  Package2,
  Pencil,
  Search,
  Send,
  Settings,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import LogoutBtn from "../LogoutBtn";
export const navLinks = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Projects",
    icon: LayoutGrid,
    href: "/dashboard/projects",
  },
  {
    title: "Skills",
    icon: Boxes,
    href: "/dashboard/skills",
  },
  {
    title: "Services",
    icon: Computer,
    href: "/dashboard/services",
  },
  {
    title: "Resume",
    icon: BookCheck,
    href: "/dashboard/resume",
  },
  {
    title: "Blogs",
    icon: Pencil,
    href: "/dashboard/blogs",
  },
  {
    title: "Messages",
    icon: Send,
    href: "/dashboard/messages",
  },
  {
    title: "Testimonials",
    icon: Users,
    href: "/dashboard/testimonials",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];
export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span className="">JB Web developer </span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navLinks.map((item, i) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  href={item.href}
                  key={i}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive && " bg-muted  text-primary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ExternalLink className="h-4 w-4" />
              Live Website
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <LogoutBtn />
        </div>
      </div>
    </div>
  );
}
