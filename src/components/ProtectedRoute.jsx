import { Navigate, useLocation } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';

const ProtectedRoute = ({ children }) => {
   const { state } = useAdmin();
   const { admin, loading } = state;
   const location = useLocation();

   if (loading) {
      return (
         <div className='h-screen flex items-center justify-center'>
            <p className='text-gray-600 text-xl'>
               Checking admin credentials...
            </p>
         </div>
      );
   }

   return admin ? (
      children
   ) : (
      <Navigate
         to='/login'
         state={{ from: location.pathname }}
         replace
      />
   );
};

export default ProtectedRoute;
