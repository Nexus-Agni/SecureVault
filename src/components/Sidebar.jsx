import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { account } from '@/lib/appwrite';
import { toast } from 'sonner';
import { 
  FaShieldAlt, 
  FaLock, 
  FaTachometerAlt, 
  FaKey, 
  FaExclamationTriangle,
  FaUserCircle,
  FaSignOutAlt
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const menuItems = [
    {
      path: '/dashboard',
      icon: FaTachometerAlt,
      label: 'Dashboard',
      description: 'Overview & Stats'
    },
    {
      path: '/vault',
      icon: FaLock,
      label: 'Vault',
      description: 'Password Manager'
    },
    {
      path: '/generate-password',
      icon: FaKey,
      label: 'Password Generator',
      description: 'Create Strong Passwords'
    },
    {
      path: '/check-breach',
      icon: FaExclamationTriangle,
      label: 'Check Breach',
      description: 'Security Check'
    }
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    // TODO: Implement logout functionality
    // Will call account.deleteSession('current')
    // Then navigate to login page
    toast.info("Logout functionality to be implemented");
  };

  return (
    <aside className="hidden md:flex w-64 flex-col bg-stone-900/50 border-r border-stone-700">
      {/* Logo Section */}
      <div className="p-4 border-b border-stone-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 border-2 border-red-500/40 flex items-center justify-center">
            <FaShieldAlt className="text-red-500 text-xl" />
          </div>
          <div>
            <h2 className="text-white text-lg font-bold">SecureVault</h2>
            <p className="text-stone-400 text-xs">Password Manager</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`group flex items-start gap-3 px-3 py-3 rounded-lg transition-all border-l-4 ${
                  active
                    ? 'bg-stone-800 text-white border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                    : 'text-stone-400 hover:bg-stone-800/50 hover:text-white border-transparent'
                }`}
              >
                <Icon className={`text-xl mt-0.5 ${active ? 'text-red-500' : 'group-hover:text-red-400'}`} />
                <div className="flex flex-col items-start text-left">
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs text-stone-500 group-hover:text-stone-400">
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-stone-700">
        {user && (
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 border-2 border-red-500/40 flex items-center justify-center">
                <FaUserCircle className="text-red-500 text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-bold truncate">{user.name || 'User'}</p>
                <p className="text-stone-400 text-xs truncate">{user.email}</p>
              </div>
            </div>
            
            <Button
              onClick={handleLogout}
              className="w-full bg-stone-800 hover:bg-stone-700 text-white border border-stone-700 rounded-full h-9 text-sm"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </Button>
          </div>
        )}

        {/* Footer Info */}
        <div className="text-center pt-3 border-t border-stone-700">
          <p className="text-stone-500 text-xs">
            Secured by <span className="text-red-500 font-semibold">Appwrite</span>
          </p>
          <p className="text-stone-600 text-[10px] mt-1">
            End-to-end encrypted
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
