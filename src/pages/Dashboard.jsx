import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Profile page
    navigate(createPageUrl("Profile"));
  }, [navigate]);

  return null;
}