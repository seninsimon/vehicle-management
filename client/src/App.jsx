import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddVehicle from './pages/AddVehicle';
import ShowroomVehicles from './pages/ShowroomVehicles';  // ✅ new
import CustomerVehicles from './pages/CustomerVehicles';  // ✅ new

function App() {
  const location = useLocation();
  const hideSidebarRoutes = ['/login'];
  const showLayout = !hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      {showLayout && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
      )}

      {/* Sidebar */}
      {showLayout && <Sidebar />}

      {/* Main Content Area */}
      <div
        className={`pt-16 ${showLayout ? 'md:ml-64' : ''} transition-all duration-300`}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddVehicle />} />
          <Route path="/showroom" element={<ShowroomVehicles />} /> {/* ✅ */}
          <Route path="/customer" element={<CustomerVehicles />} /> {/* ✅ */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
