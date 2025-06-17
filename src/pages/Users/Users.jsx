import { useState, useMemo } from 'react';
import { useAdminData } from '../../contexts/AdminDataContext';

export default function Users() {
  const { users, plans, loading } = useAdminData();
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const usersPerPage = 10;

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        user.$id?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * usersPerPage;
    const end = start + usersPerPage;
    return filteredUsers.slice(start, end);
  }, [filteredUsers, page]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const getUserPlansCount = (userId) =>
    plans.filter((plan) => plan.userId === userId).length;

  if (loading)
    return <div className='p-4 text-center text-gray-500'>Loading users...</div>;

  return (
    <div className='grid gap-6'>
      <div className='mb-4 flex items-center justify-between gap-6'>
        <h1 className='text-xl font-bold'>Manage Users</h1>
        <input
          type='text'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset to page 1 on search
          }}
          placeholder='Search by name or ID'
          className='border px-3 py-1 rounded-md'
        />
      </div>

      {filteredUsers.length === 0 ? (
        <p className='text-center text-gray-500'>No users found.</p>
      ) : (
        <div className='grid gap-3'>
          {paginatedUsers.map((user) => (
            <div
              key={user.$id}
              className='bg-white p-4 rounded shadow flex justify-between items-center'
            >
              <div>
                <p className='text-sm text-gray-800 font-semibold'>
                  {user.fullName}
                </p>
                <p className='text-xs text-gray-600'>ID: {user.$id}</p>
                <p className='text-sm text-gray-700'>
                  Balance: ${user.balance}
                </p>
                <p className='text-sm text-gray-700'>
                  Plans: {getUserPlansCount(user.$id)}
                </p>
                <p className='text-sm text-gray-700'>
                  Verified: {user.kycStatus === 'approved' ? '✅ Yes' : '❌ No'}
                </p>
              </div>
              <button
                onClick={() => setSelectedUser(user)}
                className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 cursor-pointer'
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {filteredUsers.length > usersPerPage && (
        <div className='flex justify-between items-center mt-4'>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className='px-4 py-1 rounded bg-gray-200 disabled:opacity-50'
          >
            Prev
          </button>
          <span className='text-sm text-gray-600'>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className='px-4 py-1 rounded bg-gray-200 disabled:opacity-50'
          >
            Next
          </button>
        </div>
      )}

      {selectedUser && (
        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded w-full max-w-4xl max-h-[90vh] overflow-y-auto relative'>
            <button
              onClick={() => setSelectedUser(null)}
              className='absolute top-4 right-4 text-gray-600 hover:text-black'
            >
              ✕
            </button>
            <h2 className='text-xl font-bold mb-4'>User Details</h2>
            <p>
              <strong>Name:</strong> {selectedUser.fullName}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>ID:</strong> {selectedUser.$id}
            </p>
            <p>
              <strong>Balance:</strong> {selectedUser.balance}
            </p>
            <p>
              <strong>Total Deposits:</strong> {selectedUser.totalDeposits}
            </p>
            <p>
              <strong>KYC:</strong> {selectedUser.kycStatus}
            </p>
            <p>
              <strong>Referrer:</strong> {selectedUser.referredBy || 'None'}
            </p>
            <div className='mt-4'>
              <h3 className='font-semibold'>Crypto Addresses</h3>
              <p>
                <strong>Bitcoin:</strong>{' '}
                {selectedUser.bitcoinDeposit || 'N/A'}
              </p>
              <p>
                <strong>Ethereum:</strong>{' '}
                {selectedUser.ethereumDeposit || 'N/A'}
              </p>
              <p>
                <strong>USDT:</strong> {selectedUser.usdtDeposit || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
