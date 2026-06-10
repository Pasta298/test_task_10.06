import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import UsersPage from "./pages/UserPage";
import EditUsersPage from "./pages/EditUserPage";

function App() {
  return (
    <div className="bg-gray-100 w-screen h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-auto h-full">
        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/edit-users" element={<EditUsersPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
