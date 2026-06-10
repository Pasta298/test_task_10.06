import { useContext } from "react";
import { UsersContext } from "../context/UserContext";

export function useUsers() {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error("useUsers must be used inside UsersProvider");
  return ctx;
}
