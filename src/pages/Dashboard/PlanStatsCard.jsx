import { TrendingUp, CheckCircle2, Clock, DollarSign } from 'lucide-react';

export default function PlanStatsCard({
   active,
   matured,
   pending,
   amountActive = 0,
   amountMatured = 0,
   amountPending = 0,
}) {
   return (
      <div className='bg-white rounded-xl shadow-md p-5 w-full '>
         <div className='flex items-center space-x-3 mb-4'>
            <TrendingUp size={24} className='text-purple-600' />
            <h2 className='text-lg font-semibold text-gray-800'>Plans Overview</h2>
         </div>

         <div className='space-y-3 text-sm text-gray-700'>
            {/* Active */}
            <div>
               <div className='flex justify-between'>
                  <span className='flex items-center gap-2'>
                     <TrendingUp size={16} className='text-blue-500' />
                     Active Plans:
                  </span>
                  <span className='font-semibold'>{active}</span>
               </div>
               <div className='flex justify-between ml-6 text-xs text-gray-600'>
                  <span className='flex items-center gap-1'>
                     <DollarSign size={12} />
                     Total Invested:
                  </span>
                  <span>${amountActive.toLocaleString()}</span>
               </div>
            </div>

            {/* Matured */}
            <div>
               <div className='flex justify-between'>
                  <span className='flex items-center gap-2'>
                     <CheckCircle2 size={16} className='text-green-500' />
                     Matured Plans:
                  </span>
                  <span className='font-semibold'>{matured}</span>
               </div>
               <div className='flex justify-between ml-6 text-xs text-gray-600'>
                  <span className='flex items-center gap-1'>
                     <DollarSign size={12} />
                     Total Payout:
                  </span>
                  <span>${amountMatured.toLocaleString()}</span>
               </div>
            </div>

            {/* Pending */}
            {pending !== undefined && (
               <div>
                  <div className='flex justify-between'>
                     <span className='flex items-center gap-2'>
                        <Clock size={16} className='text-yellow-500' />
                        Pending Plans:
                     </span>
                     <span className='font-semibold'>{pending}</span>
                  </div>
                  <div className='flex justify-between ml-6 text-xs text-gray-600'>
                     <span className='flex items-center gap-1'>
                        <DollarSign size={12} />
                        Expected Amount:
                     </span>
                     <span>${amountPending.toLocaleString()}</span>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
