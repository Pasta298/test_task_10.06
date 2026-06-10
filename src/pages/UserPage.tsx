import { Trash2 } from "lucide-react";
import FilterHeading from "../components/filterHeading";
import { useState } from "react";
import UserModal from "../components/userModal";
import { useUsers } from "../hooks/useUsers";

export default function UsersPage() {
  const { users, deleteUser } = useUsers();
  const [showModal, setShowModal] = useState(false);

  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const departments = [...new Set(users.map((u) => u.department.name))];
  const countries = [...new Set(users.map((u) => u.country.name))];
  const statuses = [...new Set(users.map((u) => u.status.name))];

  const filteredUsers = users.filter((user) => {
    const matchesDepartment =
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(user.department.name);

    const matchesCountry =
      !selectedCountry || user.country.name === selectedCountry;

    const matchesStatus =
      !selectedStatus || user.status.name === selectedStatus;

    return matchesDepartment && matchesCountry && matchesStatus;
  });

  const clearFilters = () => {
    if (selectedCountry || selectedDepartments || selectedStatus) {
      setSelectedDepartments([]);
      setSelectedCountry("");
      setSelectedStatus("");
    }
  };

  return (
    <div className="bg-gray-100 min-h-full p-16">
      <div className="border border-black bg-white p-8">
        <h1 className="text-center text-2xl tracking-[0.2em] font-normal mb-6">
          USERS
        </h1>

        <FilterHeading
          departments={departments}
          countries={countries}
          statuses={statuses}
          selectedDepartments={selectedDepartments}
          selectedCountry={selectedCountry}
          selectedStatus={selectedStatus}
          onDepartmentsChange={setSelectedDepartments}
          onCountryChange={setSelectedCountry}
          onStatusChange={setSelectedStatus}
          onClearFilters={clearFilters}
          onAddUser={() => setShowModal(true)}
          canUseOtherFilters={selectedDepartments.length >= 3}
        />

        {showModal && <UserModal onClose={() => setShowModal(false)} />}
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
            {filteredUsers.map((user) => (
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
                  <button
                    className="text-gray-400 hover:text-black cursor-pointer"
                    onClick={() => deleteUser(user.id)}
                  >
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
