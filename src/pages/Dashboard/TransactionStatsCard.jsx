import {
  ArrowDownCircle,
  ArrowUpCircle,
  Clock,
  XCircle,
  CheckCircle,
} from 'lucide-react';

export default function TransactionStatsCard({ type, confirmed, failed, pending }) {
  const isDeposit = type === 'deposit';
  const title = isDeposit ? 'Deposits' : 'Withdrawals';
  const color = isDeposit ? 'text-green-600' : 'text-red-600';
  const icon = isDeposit ? (
    <ArrowDownCircle size={24} className={color} />
  ) : (
    <ArrowUpCircle size={24} className={color} />
  );

  const total = confirmed + failed + pending;

  return (
    <div className="bg-white rounded-xl shadow-md p-5 w-full">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>

      {/* Total row */}
      <div className="flex items-center justify-between mb-2 text-sm text-gray-800">
        <span className="font-medium">📊 Total:</span>
        <span className="font-bold">{total}</span>
      </div>

      <div className="gap-2 text-sm text-gray-700 space-y-1">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" />
            Confirmed:
          </span>
          <span className="font-semibold">{confirmed}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <XCircle size={16} className="text-red-500" />
            Failed:
          </span>
          <span className="font-semibold">{failed}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Clock size={16} className="text-yellow-500" />
            Pending:
          </span>
          <span className="font-semibold">{pending}</span>
        </div>
      </div>
    </div>
  );
}
