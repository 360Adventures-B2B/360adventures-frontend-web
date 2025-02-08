"use client";
import { useAuth } from "@/context/AuthContext";
import ButtonPrimary from "@/shared/ButtonPrimary";
import React from "react";

export default function LogoutButton() {
  const { handleLogout } = useAuth();

  return <ButtonPrimary onClick={handleLogout}>Logout</ButtonPrimary>;
}
