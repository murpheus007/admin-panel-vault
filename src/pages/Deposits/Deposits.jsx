// pages/Deposits/Deposits.jsx
import { Query } from 'appwrite';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { db } from '../../lib/database';
import { collectionsId } from '../../lib/appwrite';
import TransactionRow from './TransactionRow';
import FilterSelect from '../../components/FilterSelect';

export default function Deposits() {
  const [transactions, setTransactions] = useState([]);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const queries = [
        Query.limit(10),
        Query.offset((page - 1) * 10),
        Query.equal('type', 'deposit'),
      ];
      if (statusFilter !== 'all') {
        queries.push(Query.equal('status', statusFilter));
      }

      const res = await db.listDocuments(collectionsId.TRANSACTIONS, queries);
      setTransactions(res.documents);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [statusFilter, page]);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Manage Deposits</h1>
        <FilterSelect
          value={statusFilter}
          onChange={setStatusFilter}
          options={['pending', 'confirmed', 'failed', 'all']}
          label="Status"
        />
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : transactions.length === 0 ? (
        <div className="text-center text-gray-500">No transactions found.</div>
      ) : (
        <div className="grid gap-4">
          {transactions.map((tx) => (
            <TransactionRow key={tx.$id} transaction={tx} refetch={fetchTransactions} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm text-gray-600">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-1 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
