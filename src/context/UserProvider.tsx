import { useState } from "react";
import { UsersContext } from "./UserContext";
import type { User } from "./types";
import { USERS } from "../data/data";

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(USERS);

  const addUser = (user: Omit<User, "id">) => {
    const id = Math.max(...users.map((u) => u.id)) + 1;
    setUsers((prev) => [...prev, { id, ...user }]);
  };

  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const updateUser = (id: number, data: Omit<User, "id">) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { id, ...data } : u)));
  };

  return (
    <UsersContext.Provider value={{ users, addUser, deleteUser, updateUser }}>
      {children}
    </UsersContext.Provider>
  );
}
