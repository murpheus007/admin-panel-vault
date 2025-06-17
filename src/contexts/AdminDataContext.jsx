// contexts/AdminDataContext.jsx
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import { db } from '../lib/database';
import { collectionsId } from '../lib/appwrite';
import { Query } from 'appwrite';
import { toast } from 'react-toastify';

const AdminDataContext = createContext();

const initialState = {
  users: [],
  transactions: [],
  plans: [],
  kyc: [],
  tickets: [],
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, ...action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const AdminDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchAll = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const [users, transactions, plans, kyc, tickets] = await Promise.all([
        db.listDocuments(collectionsId.USERS, [Query.limit(100)]),
        db.listDocuments(collectionsId.TRANSACTIONS, [Query.limit(100)]),
        db.listDocuments(collectionsId.PLANS, [Query.limit(100)]),
        db.listDocuments(collectionsId.KYC, [Query.limit(100)]),
        db.listDocuments(collectionsId.SUPPORT, [Query.limit(100)]),
      ]);

      dispatch({
        type: 'SET_DATA',
        payload: {
          users: users.documents,
          transactions: transactions.documents,
          plans: plans.documents,
          kyc: kyc.documents,
          tickets: tickets.documents,
        },
      });
    } catch (err) {
      console.error('Error fetching admin data:', err);
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  }, []);

  const refetchUsers = async () => {
    const users = await db.listDocuments(collectionsId.USERS, [Query.limit(100)]);
    dispatch({ type: 'SET_DATA', payload: { users: users.documents } });
  };

  const refetchTransactions = async () => {
    const transactions = await db.listDocuments(collectionsId.TRANSACTIONS, [Query.limit(100)]);
    dispatch({
      type: 'SET_DATA',
      payload: { transactions: transactions.documents },
    });
  };

  const refetchPlans = async () => {
    const plans = await db.listDocuments(collectionsId.PLANS, [Query.limit(100)]);
    dispatch({ type: 'SET_DATA', payload: { plans: plans.documents } });
  };

  const refetchKYC = async () => {
    const kyc = await db.listDocuments(collectionsId.KYC, [Query.limit(100)]);
    dispatch({ type: 'SET_DATA', payload: { kyc: kyc.documents } });
  };

  const refetchTickets = async () => {
    const tickets = await db.listDocuments(collectionsId.TICKETS, [Query.limit(100)]);
    dispatch({ type: 'SET_DATA', payload: { tickets: tickets.documents } });
  };

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

const confirmTransaction = async (
  transactionId,
  userId,
  updatedBalance = null,
  updatedTotalDeposits = null,
  isManual = false // true = UserInfoModal save, false = direct Confirm
) => {
  try {
    // Fetch user and transaction
    const userDoc = await db.getDocument(collectionsId.USERS, userId);
    const transactionDoc = await db.getDocument(collectionsId.TRANSACTIONS, transactionId);

    if (!userDoc || !transactionDoc) {
      toast.error("User or transaction not found");
      return;
    }

    const depositAmount = Number(transactionDoc.amount || 0);
    let newBalance = 0;
    let newTotalDeposits = 0;

    if (isManual) {
      newBalance = parseFloat(updatedBalance);
      newTotalDeposits = parseFloat(updatedTotalDeposits);
    } else {
      newBalance = Number(userDoc.balance || 0) + depositAmount;
      newTotalDeposits = Number(userDoc.totalDeposits || 0) + depositAmount;
    }

    if (isNaN(newBalance) || isNaN(newTotalDeposits)) {
      toast.error("Invalid balance or deposit value");
      return;
    }

    // 1. Update user's balance and deposits
    await db.updateDocument(collectionsId.USERS, userId, {
      balance: newBalance,
      totalDeposits: newTotalDeposits,
    });

    // 2. Mark transaction as confirmed
    await db.updateDocument(collectionsId.TRANSACTIONS, transactionId, {
      status: 'confirmed',
    });

    // 3. Handle referral bonus (if referredBy exists)
    const referrerId = userDoc.referredBy;
    if (referrerId) {
      try {
        const bonus = 0.05 * depositAmount;
        const referrer = await db.getDocument(collectionsId.USERS, referrerId);

        if (referrer) {
          const updatedRefEarnings = Number(referrer.earnings || 0) + bonus;
          const updatedRefBalance = Number(referrer.balance || 0) + bonus;

          await db.updateDocument(collectionsId.USERS, referrerId, {
            earnings: updatedRefEarnings,
            balance: updatedRefBalance,
          });
        }
      } catch (refErr) {
        console.warn("Referrer update failed:", refErr.message);
        // Optional toast here
      }
    }

    toast.success('Transaction confirmed and user updated!');
    await refetchUsers();
    await refetchTransactions();
  } catch (err) {
    toast.error('Error confirming transaction.');
    console.error(err);
  }
};


  const cancelTransaction = async (transactionId) => {
  try {
    await db.updateDocument(collectionsId.TRANSACTIONS, transactionId, {
      status: 'failed',
    });
    toast.info('Transaction marked as failed');
    // Optionally refetch
    // refetchTransactions();
  } catch (err) {
    toast.error('Failed to cancel transaction');
    console.error(err);
  }
};


  return (
    <AdminDataContext.Provider
      value={{
        ...state,
        refetchUsers,
        refetchTransactions,
        refetchPlans,
        refetchKYC,
        refetchTickets,
        refetchAll: fetchAll,
        confirmTransaction,
        cancelTransaction,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => useContext(AdminDataContext);
