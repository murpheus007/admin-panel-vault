import { useAdminData } from '../../contexts/AdminDataContext';

import { Query } from 'appwrite';
import WelcomeCard from './WelcomeCard';
import StatCard from './StatCard';
import UserStatsCard from './UserStatsCard';
import KYCStatsCard from './KYCStatsCard';
import SupportStatsCard from './SupportStatsCard';
import TransactionStatsCard from './TransactionStatsCard';
import {
   Users,
   Banknote,
   BadgeDollarSign,
   FolderKanban,
   FileCheck2,
   Ticket,
} from 'lucide-react';
import PlanStatsCard from './PlanStatsCard';

export default function Dashboard() {
   const { users, transactions, plans, kyc, tickets, loading } = useAdminData();

   if (loading) return <div> Fetching data stats </div>;

   const deposits = transactions.filter((t) => t.type === 'deposit');
   const withdrawals = transactions.filter((t) => t.type === 'withdrawal');

   const totalUsers = users.length;
   const verifiedCount = users.filter((u) => u.kycStatus === 'approved').length;

   const roleCounts = users.reduce((acc, user) => {
      const role = user.role || 'unknown';
      acc[role] = (acc[role] || 0) + 1;
      return acc;
   }, {});

   const getCounts = (arr) => ({
      confirmed: arr.filter((x) => x.status === 'confirmed').length,
      failed: arr.filter((x) => x.status === 'failed').length,
      pending: arr.filter((x) => x.status === 'pending').length,
   });

   const getPlanStats = (plans) => {
      let active = 0,
         matured = 0,
         pending = 0;
      let amountActive = 0,
         amountMatured = 0,
         amountPending = 0;

      plans.forEach((plan) => {
         const amount = Number(plan.amountInvested) || 0;

         switch (plan.status) {
            case 'active':
               active++;
               amountActive += amount;
               break;
            case 'matured':
               matured++;
               amountMatured += amount;
               break;
            case 'pending':
               pending++;
               amountPending += amount;
               break;
            default:
               break;
         }
      });

      return {
         active,
         matured,
         pending,
         amountActive,
         amountMatured,
         amountPending,
      };
   };

   const kycData = kyc || [];

   const totalKYC = kycData.length;
   const verified = kycData.filter((item) => item.verified === true).length;

  const totalTickets = tickets.length;
  const readCount = tickets.filter(ticket => ticket.read === true).length;

   return (
      <div className='grid gap-6 '>
         <WelcomeCard />

         <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <UserStatsCard
               total={totalUsers}
               verifiedCount={verifiedCount}
               roleCounts={roleCounts}
            />
            <TransactionStatsCard
               type='deposit'
               {...getCounts(deposits)}
            />

            <TransactionStatsCard
               type='withdraw'
               {...getCounts(withdrawals)}
            />

            <PlanStatsCard {...getPlanStats(plans)} />
            <KYCStatsCard
               total={totalKYC}
               verified={verified}
            />
            <SupportStatsCard total={totalTickets} read={readCount} />
         </div>
      </div>
   );
}
