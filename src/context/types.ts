export type User = {
  id: number;
  name: string;
  department: { name: string; value: string };
  country: { name: string; value: string };
  status: { name: string; value: string };
};

export interface UsersContextType {
  users: User[];
  addUser: (user: Omit<User, "id">) => void;
  deleteUser: (id: number) => void;
  updateUser: (id: number, data: Omit<User, "id">) => void;
}
