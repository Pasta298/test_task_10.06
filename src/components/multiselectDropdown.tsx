import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function MultiSelectDropdown({
  options,
  label,
}: {
  options: string[];
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([options[0]]);

  const toggle = (opt: string) => {
    setSelected((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt],
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between gap-4 border border-gray-300 px-4 py-3 text-sm min-w-40 bg-white"
      >
        <span>
          {selected.length > 0 ? `Selected (${selected.length})` : label}
        </span>
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && (
        <div className="absolute top-full left-0 z-10 w-full border border-gray-300 border-t-0 bg-white shadow-sm">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => toggle(opt)}
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              <div
                className={`w-4 h-4 border flex items-center justify-center ${
                  selected.includes(opt)
                    ? "bg-black border-black"
                    : "border-gray-400"
                }`}
              >
                {selected.includes(opt) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
