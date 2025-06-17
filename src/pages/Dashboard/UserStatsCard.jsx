import { Users } from 'lucide-react';

export default function UserStatsCard({ total, verifiedCount = 0, roleCounts = {} }) {
  return (
    <div className='bg-white p-4 rounded-xl shadow-sm'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold text-gray-700'>Total Users</h3>
          <p className='text-3xl font-bold text-blue-600'>{total}</p>
        </div>
        <div className='bg-blue-100 text-blue-600 p-2 rounded-full'>
          <Users size={24} />
        </div>
      </div>

      <div className='mt-4 text-sm text-gray-500 space-y-1'>
        {Object.entries(roleCounts).map(([role, count]) => (
          <p key={role}>
            🧑‍💼 {role.charAt(0).toUpperCase() + role.slice(1)}:{" "}
            <span className='font-medium text-gray-700'>{count}</span>
          </p>
        ))}

        <p>
          ✅ KYC Verified:{" "}
          <span className='font-medium text-gray-700'>{verifiedCount}</span>
        </p>
        <p>
          ❌ Unverified:{" "}
          <span className='font-medium text-gray-700'>
            {total - verifiedCount}
          </span>
        </p>
      </div>
    </div>
  );
}
