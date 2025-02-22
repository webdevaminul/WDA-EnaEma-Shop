"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import TitleLeft from "@/components/Titles/TitleLeft";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("/api/users/list");
        if (data.success) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <TitleLeft title={"Users List"} subTitle={"List of all users having account"} />
      {loading ? (
        <p className="text-center text-gray-600 h-96">Loading users...</p>
      ) : (
        <div className="min-h-96 mt-8 overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Profile</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-600">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="border-b text-gray-600">
                    <td className="pl-2">
                      <figure className="h-14 w-14 rounded-full overflow-hidden">
                        <img
                          src={user.profile}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </figure>
                    </td>
                    <td className="p-3 text-nowrap">{user.name}</td>
                    <td className="p-3 text-nowrap">{user.email}</td>
                    <td className="p-3 text-nowrap">{user.phone}</td>
                    <td className="p-3 text-nowrap">{user.role}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
