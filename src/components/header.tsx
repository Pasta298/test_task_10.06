import Button from "./button";

export default function Header() {
  return (
    <div className="flex justify-center items-center w-full h-[10%] min-h-15 gap-4 border-black border-b-2 shrink-0">
      <Button>Edit Users</Button>
      <Button>Users</Button>
    </div>
  );
}
