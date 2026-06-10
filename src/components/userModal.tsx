import { useState } from "react";
import Field from "../components/field";
import Dropdown from "../components/dropdown";
import TextInput from "../components/textInput";
import { useUsers } from "../hooks/useUsers";

interface UserModalProps {
  onClose: () => void;
}

export default function UserModal({ onClose }: UserModalProps) {
  const { users, addUser } = useUsers();

  const departments = [...new Set(users.map((u) => u.department.name))];
  const countries = [...new Set(users.map((u) => u.country.name))];
  const statuses = [...new Set(users.map((u) => u.status.name))];

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");

  const isValid = name.trim() && department && country && status;

  const handleAdd = () => {
    if (!isValid) return;
    addUser({
      name,
      department: {
        name: department,
        value: department.slice(0, 3).toUpperCase(),
      },
      country: { name: country, value: country.slice(0, 2).toUpperCase() },
      status: { name: status, value: status.toUpperCase() },
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
      onClick={onClose}
    >
      <div
        className="bg-white border border-gray-300 p-10 w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-center text-2xl tracking-[0.2em] font-normal mb-10">
          ADD USER
        </h1>

        <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-10">
          <Field label="Full Name">
            <TextInput
              value={name}
              onChange={setName}
              placeholder="Enter full name"
            />
          </Field>
          <Field label="Department">
            <Dropdown
              options={departments}
              value={department}
              placeholder="Select department"
              onChange={setDepartment}
              disabled={false}
            />
          </Field>
          <Field label="Country">
            <Dropdown
              options={countries}
              value={country}
              placeholder="Select country"
              onChange={setCountry}
              disabled={false}
            />
          </Field>
          <Field label="Status">
            <Dropdown
              options={statuses}
              value={status}
              placeholder="Select status"
              onChange={setStatus}
              disabled={false}
            />
          </Field>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="border border-gray-300 px-8 py-3 text-sm hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!isValid}
            className={`border border-gray-300 px-8 py-3 text-sm ${
              isValid
                ? "hover:bg-gray-100 cursor-pointer text-black"
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
