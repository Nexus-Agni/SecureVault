import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { account } from '@/lib/appwrite';
import {Loader} from '@/components/Loader';
import { toast } from 'sonner';

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await account.get();
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication check failed:", error);
        toast.error("Please log in")
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#22040b] via-[#120006] to-black flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
