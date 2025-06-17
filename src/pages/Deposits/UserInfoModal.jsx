import { useState, useEffect } from 'react';

export default function UserInfoModal({ isOpen, onClose, user, onSave }) {
   const [balance, setBalance] = useState('');
   const [totalDeposits, setTotalDeposits] = useState('');

   useEffect(() => {
      if (user) {
         setBalance(user.balance);
         setTotalDeposits(user.totalDeposits);
      }
   }, [user]);

   if (!isOpen || !user) return null;

   return (
      <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
         <div className='grid gap-4 bg-white p-6 rounded-lg shadow-xl w-full max-w-md'>
            <div>

            <h2 className='text-xl font-bold mb-4'>User Info</h2>
            <p>
               <strong>Name:</strong> {user.fullName}
            </p>
            </div>

            <div className='grid gap-4'>
               <div>
                  <label className='block text-sm font-medium'>Balance</label>
                  <input
                     type='number'
                     value={balance}
                     onChange={(e) => setBalance(e.target.value)}
                     className='border rounded px-2 py-1 w-full'
                  />
               </div>
               <div>
                  <label className='block text-sm font-medium'>
                     Total Deposits
                  </label>
                  <input
                     type='number'
                     value={totalDeposits}
                     onChange={(e) => setTotalDeposits(e.target.value)}
                     className='border rounded px-2 py-1 w-full'
                  />
               </div>
            </div>

            <div className='flex gap-2'>
               <button
                  onClick={onClose}
                  className='w-full px-4 py-2 bg-gray-200 rounded'>
                  Cancel
               </button>
               <button
                  onClick={() => onSave(balance, totalDeposits)}
                  className='w-full px-4 py-2 bg-blue-600 text-white rounded'>
                  Save Changes
               </button>
            </div>
         </div>
      </div>
   );
}
