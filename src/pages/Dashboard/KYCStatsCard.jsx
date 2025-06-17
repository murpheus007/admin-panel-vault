import { IdCard } from 'lucide-react';

export default function KYCStatsCard({ total, verified = 0 }) {
  const notVerified = total - verified;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">KYC Submissions</h3>
          <p className="text-3xl font-bold text-blue-600">{total}</p>
        </div>
        <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
          <IdCard size={24} />
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500 space-y-1">
        <p>
          ✅ Verified:{" "}
          <span className="font-medium text-gray-700">{verified}</span>
        </p>
        <p>
          ❌ Not Verified:{" "}
          <span className="font-medium text-gray-700">{notVerified}</span>
        </p>
      </div>
    </div>
  );
}
