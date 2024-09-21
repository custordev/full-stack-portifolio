import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800 py-16 mb-8">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Jb web developer™
          </a>
          . All Rights Reserved.
        </span>
        <Button asChild variant={"outline"}>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>
    </footer>
  );
}
