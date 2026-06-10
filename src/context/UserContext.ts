import { createContext } from "react";
import type { UsersContextType } from "./types";

export const UsersContext = createContext<UsersContextType | null>(null);
