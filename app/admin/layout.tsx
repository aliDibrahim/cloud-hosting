import React from "react";
import AdminSidebar from "./AdminSidebar";
import type { Metadata } from "next";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { verifyTokenForPage } from "@/utils/verifyToken";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "This is admin dashboard",
};

const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  //   const token = cookies().get("jwtToken")?.value;
  //   if (!token) redirect("/");

  //   const payload = verifyTokenForPage(token);
  //   if (payload?.isAdmin === false) redirect("/");

  return (
    <div>
      <div className="flex justify-between items-center w-[90%] border-b-2 border-[#4657a8] mb-4 m-auto">
        <AdminSidebar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AdminDashboardLayout;
