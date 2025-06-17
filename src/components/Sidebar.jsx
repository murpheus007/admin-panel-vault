import { NavLink } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import {
   LayoutDashboard,
   Users,
   Banknote,
   BadgeDollarSign,
   IdCard,
   Ticket,
   LogOut,
} from 'lucide-react';

const navItems = [
   {
      name: 'Dashboard',
      path: '/',
      icon: {
         default: <LayoutDashboard size={18} />,
         active: (
            <LayoutDashboard
               className='stroke-blue-600'
               size={18}
            />
         ),
      },
   },
   {
      name: 'Manage Users',
      path: '/users',
      icon: {
         default: <Users size={18} />,
         active: (
            <Users
               className='stroke-blue-600'
               size={18}
            />
         ),
      },
   },
   {
      name: 'Manage Deposits',
      path: '/deposits',
      icon: {
         default: <Banknote size={18} />,
         active: (
            <Banknote
               className='stroke-blue-600'
               size={18}
            />
         ),
      },
   },
   {
      name: 'Manage Withdrawals',
      path: '/withdrawals',
      icon: {
         default: <BadgeDollarSign size={18} />,
         active: (
            <BadgeDollarSign
               className='stroke-blue-600'
               size={18}
            />
         ),
      },
   },
   {
      name: 'Manage KYC',
      path: '/kyc',
      icon: {
         default: <IdCard size={18} />,
         active: (
            <IdCard
               className='stroke-blue-600'
               size={18}
            />
         ),
      },
   },
   {
      name: 'Manage Tickets',
      path: '/tickets',
      icon: {
         default: <Ticket size={18} />,
         active: (
            <Ticket
               className='stroke-blue-600'
               size={18}
            />
         ),
      },
   },
];

export default function Sidebar() {
   const { logout } = useAdmin();

   return (
      <aside className='grid w-64 bg-white border-r h-screen p-4 shadow-sm'>
         <h2 className='text-xl font-extrabold mb-6 text-center text-blue-900'>
            DEV TEAM
         </h2>

         <nav className='grid gap-2'>
            {navItems.map((item) => (
               <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                     `flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                        isActive
                           ? 'bg-blue-100 text-blue-700 font-semibold'
                           : 'text-gray-700 hover:bg-gray-100'
                     }`
                  }>
                  {({ isActive }) => (
                     <>
                        {isActive ? item.icon.active : item.icon.default}
                        <span>{item.name}</span>
                     </>
                  )}
               </NavLink>
            ))}
         </nav>

         {/* Logout button */}
         <button
            onClick={logout} // ✅ FIXED: previously it was `() => logout`, which just returns the function without calling it
            className='mt-8 flex items-center space-x-2 text-red-600 text-sm hover:underline transition-colors'>
            <LogOut size={16} />
            <span>Logout</span>
         </button>
      </aside>
   );
}
