"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const AdminHeader = () => {
  const { data: session, status } = useSession();

  const email = session?.user?.email;

  return (
    <header>
      {status === "authenticated" && (
        <nav>
          <ul className="text-md flex list-none items-center font-semibold">
            <li className="mr-auto text-lg underline">Admin Dashboard</li>
            <li className="mr-2">{email}</li>
            <li>
              <button
                className="rounded-md bg-gray-900 px-2 py-1.5 text-white"
                onClick={() => {
                  signOut();
                }}
              >
                Log Out
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default AdminHeader;
