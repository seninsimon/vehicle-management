import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Add Vehicle', path: '/add' },
    { label: 'Showroom Vehicles', path: '/showroom' },
    { label: 'Customer Vehicles', path: '/customer' },
  ];

  return (
    <>
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Sidebar */}
      <div className="hidden md:block fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-gray-900 text-white">
        <div className="p-6 text-xl font-bold border-b border-gray-700">
          Rich Wheels
        </div>
        <nav className="p-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block py-2 px-4 rounded hover:bg-gray-700 ${
                location.pathname === item.path ? 'bg-gray-700' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
