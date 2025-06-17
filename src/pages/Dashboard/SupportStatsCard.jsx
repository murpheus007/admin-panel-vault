import { Ticket } from 'lucide-react';

export default function SupportStatsCard({ total = 0, read = 0 }) {
  const unread = total - read;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Support Tickets</h3>
          <p className="text-3xl font-bold text-indigo-600">{total}</p>
        </div>
        <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full">
          <Ticket size={24} />
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500 space-y-1">
        <p>
          ✅ Read:{" "}
          <span className="font-medium text-gray-700">{read}</span>
        </p>
        <p>
          ❌ Unread:{" "}
          <span className="font-medium text-gray-700">{unread}</span>
        </p>
      </div>
    </div>
  );
}
