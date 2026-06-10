import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { USERS } from "../data/users";

const DEPARTMENTS = [...new Set(USERS.map((u) => u.department.name))];
const COUNTRIES = [...new Set(USERS.map((u) => u.country.name))];
const STATUSES = [...new Set(USERS.map((u) => u.status.name))];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-500">{label}</label>
      {children}
    </div>
  );
}

function TextInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-400 bg-white"
    />
  );
}

function Select({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between border border-gray-300 px-4 py-3 text-sm bg-white"
      >
        <span>{value}</span>
        <ChevronDown size={14} className="text-gray-400" />
      </button>
      {open && (
        <div className="absolute top-full left-0 z-10 w-full border border-gray-300 border-t-0 bg-white shadow-sm">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function EditUsersPage() {
  const [selectedUserId, setSelectedUserId] = useState(USERS[0].id);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const selectedUser = USERS.find((u) => u.id === selectedUserId)!;

  const [name, setName] = useState(selectedUser.name);
  const [department, setDepartment] = useState(selectedUser.department.name);
  const [country, setCountry] = useState(selectedUser.country.name);
  const [status, setStatus] = useState(selectedUser.status.name);

  const original = {
    name: selectedUser.name,
    department: selectedUser.department.name,
    country: selectedUser.country.name,
    status: selectedUser.status.name,
  };

  const isDirty =
    name !== original.name ||
    department !== original.department ||
    country !== original.country ||
    status !== original.status;

  const handleUserChange = (id: number) => {
    const user = USERS.find((u) => u.id === id)!;
    setSelectedUserId(id);
    setName(user.name);
    setDepartment(user.department.name);
    setCountry(user.country.name);
    setStatus(user.status.name);
    setUserDropdownOpen(false);
  };

  const handleUndo = () => {
    setName(original.name);
    setDepartment(original.department);
    setCountry(original.country);
    setStatus(original.status);
  };

  return (
    <div className="w-full bg-gray-100 h-full p-8">
      <div className="border border-gray-300 bg-white p-8">
        <h1 className="text-center text-2xl tracking-[0.2em] font-normal mb-10">
          EDIT USER
        </h1>

        <div className="max-w-[40%] mb-10">
          <Field label="User">
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen((o) => !o)}
                className="w-full flex items-center justify-between border border-gray-300 px-4 py-3 text-sm bg-white"
              >
                <span>{selectedUser.name}</span>
                <ChevronDown size={14} className="text-gray-400" />
              </button>
              {userDropdownOpen && (
                <div className="absolute top-full left-0 z-10 w-full border border-gray-300 border-t-0 bg-white shadow-sm">
                  {USERS.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => handleUserChange(user.id)}
                      className="px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      {user.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Field>
        </div>

        <h2 className="text-lg font-semibold mb-6">User Information</h2>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 mb-10">
          <Field label="Full Name">
            <TextInput value={name} onChange={setName} />
          </Field>

          <Field label="Department">
            <Select
              options={DEPARTMENTS}
              value={department}
              onChange={setDepartment}
            />
          </Field>

          <Field label="Country">
            <Select options={COUNTRIES} value={country} onChange={setCountry} />
          </Field>

          <Field label="Status">
            <Select options={STATUSES} value={status} onChange={setStatus} />
          </Field>
        </div>

        <div className="flex justify-end gap-3 mt-auto">
          <button
            onClick={handleUndo}
            className="border border-gray-300 px-8 py-3 text-sm hover:bg-gray-100 cursor-pointer"
          >
            Undo
          </button>
          <button
            disabled={!isDirty}
            className={`border border-gray-300 px-8 py-3 text-sm ${
              isDirty
                ? "hover:bg-gray-100 cursor-pointer text-black"
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
