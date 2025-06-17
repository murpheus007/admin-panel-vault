// WelcomeCard.jsx
import { useAdmin } from '../../contexts/AdminContext';

export default function WelcomeCard() {
   const {
      state: { userInfo },
   } = useAdmin();

   return (
      <div className="bg-white rounded-xl shadow p-6 mb-4">
         <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Welcome, {userInfo?.fullName || 'Admin'} 👋
         </h2>
         <p className="text-gray-600">
            You have full control of the platform. From here you can manage users,
            deposits, withdrawals, KYC verifications, and support tickets.
         </p>
      </div>
   );
}
