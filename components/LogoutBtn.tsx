"use client";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutBtn() {
  const router = useRouter();
  async function handleLogout() {
    await signOut();
    router.push("/login");
  }
  return (
    <Button onClick={handleLogout} size="sm" className="w-full">
      Logout
    </Button>
  );
}
