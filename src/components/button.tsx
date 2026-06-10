import type { PropsWithChildren } from "react";

export default function Button({ children }: PropsWithChildren) {
  return (
    <div className="px-6 py-2 w-50 text-center font-family-karla text-lg border-2 border-gray-400 hover:bg-gray-400 hover:text-white active:bg-gray-400 cursor-pointer select-none">
      {children}
    </div>
  );
}
