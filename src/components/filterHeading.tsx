import { Trash2 } from "lucide-react";
import Dropdown from "./dropdown";
import MultiSelectDropdown from "./multiselectDropdown";

export default function FilterHeading({
  departments,
  countries,
  statuses,
  onAddUser,
}: {
  departments: string[];
  countries: string[];
  statuses: string[];
  onAddUser: () => void;
}) {
  return (
    <>
      <p className="text-sm text-gray-600 mb-4">
        Please add at least 3 departments to be able to proceed next steps.
      </p>

      <div className="flex items-center gap-3 mb-6">
        <MultiSelectDropdown options={departments} label="Department" />
        <Dropdown options={countries} value="" placeholder="Select country" />
        <Dropdown options={statuses} value="All Statuses" />

        <button className="border border-gray-300 p-2 hover:bg-gray-100 cursor-pointer">
          <Trash2 size={16} />
        </button>

        <div className="ml-auto">
          <button
            className="border border-gray-300 px-6 py-3 text-sm hover:bg-gray-100 cursor-pointer"
            onClick={onAddUser}
          >
            Add User
          </button>
        </div>
      </div>
    </>
  );
}
