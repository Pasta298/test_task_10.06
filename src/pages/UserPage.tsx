import { useState } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { USERS } from "../data/users";

const DEPARTMENTS = [...new Set(USERS.map((u) => u.department.name))];
const COUNTRIES = [...new Set(USERS.map((u) => u.country.name))];
const STATUSES = [...new Set(USERS.map((u) => u.status.name))];

function Dropdown({
  options,
  value,
  placeholder,
}: {
  options: string[];
  value: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between gap-4 border border-gray-300 px-4 py-2 text-sm min-w-40 bg-white"
      >
        <span
          className={selected === value && placeholder ? "text-gray-400" : ""}
        >
          {selected || placeholder}
        </span>
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && (
        <div className="absolute top-full left-0 z-10 w-full border border-gray-300 border-t-0 bg-white shadow-sm">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                setSelected(opt);
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

function MultiSelectDropdown({
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
        className="flex items-center justify-between gap-4 border border-gray-300 px-4 py-2 text-sm min-w-40 bg-white"
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

export default function UsersPage() {
  return (
    <div className="bg-gray-100 min-h-full">
      <div className="border border-gray-300 bg-white p-8">
        <h1 className="text-center text-2xl tracking-[0.2em] font-normal mb-6">
          USERS
        </h1>

        <p className="text-sm text-gray-600 mb-4">
          Please add at least 3 departments to be able to proceed next steps.
        </p>

        <div className="flex items-center gap-3 mb-6">
          <MultiSelectDropdown options={DEPARTMENTS} label="Department" />
          <Dropdown options={COUNTRIES} value="" placeholder="Select country" />
          <Dropdown options={STATUSES} value="All Statuses" />

          <button className="border border-gray-300 p-2 hover:bg-gray-100 cursor-pointer">
            <Trash2 size={16} />
          </button>

          <div className="ml-auto">
            <button className="border border-gray-300 px-6 py-2 text-sm hover:bg-gray-100 cursor-pointer">
              Add User
            </button>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left font-semibold py-3 pr-4 w-[25%]">
                Full Name
              </th>
              <th className="text-left font-semibold py-3 pr-4 w-[35%]">
                Department
              </th>
              <th className="text-left font-semibold py-3 pr-4 w-[20%]">
                Country
              </th>
              <th className="text-left font-semibold py-3 pr-4 w-[15%]">
                Status
              </th>
              <th className="w-[5%]" />
            </tr>
          </thead>
          <tbody>
            {USERS.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="py-5 pr-4 font-semibold">{user.name}</td>
                <td className="py-5 pr-4 text-gray-500">
                  {user.department.name}
                </td>
                <td className="py-5 pr-4 text-gray-500">{user.country.name}</td>
                <td className="py-5 pr-4 text-gray-500">{user.status.name}</td>
                <td className="py-5 text-right">
                  <button className="text-gray-400 hover:text-black cursor-pointer">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
