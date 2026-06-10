import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function Dropdown({
  options,
  value,
  placeholder,
  onChange,
  disabled,
  allowInput,
}: {
  options: string[];
  value: string;
  placeholder?: string;
  onChange?: (v: string) => void;
  disabled: boolean;
  allowInput: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(value);

  const selected = onChange ? value : internal;

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(selected.toLowerCase()),
  );

  return (
    <div className="relative">
      <button
        onClick={() => !disabled && setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 border border-gray-300 px-4 py-3 text-sm bg-white"
      >
        {allowInput ? (
          <input
            value={selected}
            placeholder={placeholder}
            onChange={(e) => onChange?.(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            autoComplete="off"
            className={`flex-1 outline-none bg-transparent ${!selected && placeholder ? "text-gray-400" : "text-black"}`}
          />
        ) : (
          <span
            className={
              !selected && placeholder ? "text-gray-400" : "text-black"
            }
          >
            {" "}
            {selected || placeholder}{" "}
          </span>
        )}

        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && !disabled && (
        <div className="absolute top-full left-0 z-10 w-full border border-gray-300 border-t-0 bg-white shadow-sm">
          {filteredOptions.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                if (onChange) onChange(opt);
                else setInternal(opt);
                setOpen(false);
              }}
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
