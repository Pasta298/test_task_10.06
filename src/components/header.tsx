import { NavLink } from "react-router-dom";
import Button from "./button";

export default function Header() {
  return (
    <div className="flex justify-center items-center w-full min-h-15 h-[10%] gap-4 border-black border-b-2 shrink-0">
      <NavLink to="/users">
        <Button>Users</Button>
      </NavLink>
      <NavLink to="/edit-users">
        <Button>Edit Users</Button>
      </NavLink>
    </div>
  );
}
