import { Trash2 } from "lucide-react";
import Dropdown from "./dropdown";
import MultiSelectDropdown from "./multiselectDropdown";

export default function FilterHeading({
  departments,
  countries,
  statuses,
  selectedDepartments,
  selectedCountry,
  selectedStatus,
  onDepartmentsChange,
  onCountryChange,
  onStatusChange,
  onClearFilters,
  onAddUser,
  canUseOtherFilters,
}: {
  departments: string[];
  countries: string[];
  statuses: string[];

  selectedDepartments: string[];
  selectedCountry: string;
  selectedStatus: string;

  onDepartmentsChange: (value: string[]) => void;
  onCountryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onClearFilters: () => void;

  onAddUser: () => void;
  canUseOtherFilters: boolean;
}) {
  return (
    <>
      <p className="text-sm text-gray-600 mb-4">
        Please add at least 3 departments to be able to proceed next steps.
      </p>

      <div className="flex items-center gap-3 mb-6">
        <MultiSelectDropdown
          options={departments}
          label="Department"
          value={selectedDepartments}
          onChange={onDepartmentsChange}
        />
        <Dropdown
          options={countries}
          value={selectedCountry}
          placeholder="Select country"
          onChange={onCountryChange}
          disabled={!canUseOtherFilters}
          allowInput={false}
        />
        <Dropdown
          options={statuses}
          value={selectedStatus}
          placeholder="All Statuses"
          onChange={onStatusChange}
          disabled={!canUseOtherFilters}
          allowInput={false}
        />

        <button
          className="border border-gray-300 p-2 hover:bg-gray-100 cursor-pointer"
          onClick={onClearFilters}
        >
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
