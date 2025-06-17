import { useState } from 'react';
import { useAdminData } from '../../contexts/AdminDataContext';
import UserInfoModal from './UserInfoModal';

export default function TransactionRow({ transaction, refetch }) {
   const { confirmTransaction, cancelTransaction, users } = useAdminData();
   const [modalOpen, setModalOpen] = useState(false);
   const [selectedUser, setSelectedUser] = useState(null);

   const handleOpenModal = () => {
      const user = users.find((u) => u.$id === transaction.userId);
      if (user) {
         setSelectedUser(user);
         setModalOpen(true);
      }
   };

   const handleSave = async (newBalance, newTotalDeposits) => {
      await confirmTransaction(
         transaction.$id,
         transaction.userId,
         newBalance,
         newTotalDeposits,
         true,
      );

      setModalOpen(false);
      refetch();
   };

   const handleDirectConfirm = async () => {
      const user = users.find((u) => u.$id === transaction.userId);
      if (user) {
         await confirmTransaction(
            transaction.$id,
            transaction.userId,
            null,
            null,
            false,
         );

         refetch();
      }
   };

   return (
      <div className='bg-white p-4 rounded-md shadow-sm'>
         <p className='text-sm text-gray-700'>
            <strong>Amount:</strong> ${transaction.amount}
         </p>
         <p className='text-sm text-gray-700'>
            <strong>Status:</strong> {transaction.status}
         </p>
         <p className='text-sm text-gray-700'>
            <strong>Method:</strong> {transaction.method}
         </p>
         <p className='text-sm text-gray-700'>
            <strong>Address:</strong>{' '}
            {selectedUser[`${transaction.method}Deposit`] || 'N/A'}
         </p>
         <p className='text-sm text-gray-700'>
            <strong>User ID:</strong> {transaction.userId}
         </p>

         <div className='mt-4 flex gap-2 *:cursor-pointer'>
            <button
               onClick={handleOpenModal}
               className='bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded'>
               View User
            </button>

            <button
               onClick={() => cancelTransaction(transaction.$id)}
               className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded'>
               Cancel
            </button>

            <button
               onClick={handleDirectConfirm}
               className='bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded'>
               Confirm
            </button>
         </div>

         <UserInfoModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            user={selectedUser}
            onSave={handleSave}
         />
      </div>
   );
}
