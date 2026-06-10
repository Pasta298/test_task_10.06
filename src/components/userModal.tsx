import { useState } from "react";
import { DEPARTMENTS, COUNTRIES, STATUSES } from "../data/data";
import Field from "../components/field";
import Dropdown from "../components/dropdown";
import TextInput from "../components/textInput";

interface UserModalProps {
  onClose: () => void;
  onAdd: (user: {
    name: string;
    department: string;
    country: string;
    status: string;
  }) => void;
}

export default function UserModal({ onClose, onAdd }: UserModalProps) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");

  const isValid = name.trim() && department && country && status;

  const handleAdd = () => {
    if (!isValid) return;
    onAdd({ name, department, country, status });
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
              options={DEPARTMENTS}
              value={department}
              placeholder="Select department"
              onChange={setDepartment}
            />
          </Field>
          <Field label="Country">
            <Dropdown
              options={COUNTRIES}
              value={country}
              placeholder="Select country"
              onChange={setCountry}
            />
          </Field>
          <Field label="Status">
            <Dropdown
              options={STATUSES}
              value={status}
              placeholder="Select status"
              onChange={setStatus}
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
