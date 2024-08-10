import React, { ReactNode } from "react";

import { Metadata } from "next";
import App from "@/components/Appprovider";
import AdminHeader from "@/components/AdminHeader";
type childrenProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Admin",
};
const Layout = ({ children }: childrenProps) => {
  return (
    <div>
      <App>
        <AdminHeader />
        {children}
      </App>
    </div>
  );
};

export default Layout;
