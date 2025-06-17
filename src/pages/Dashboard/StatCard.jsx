// StatCard.jsx
export default function StatCard({ label, value, icon, bg = 'bg-blue-100', text = 'text-blue-700' }) {
   return (
      <div className={`p-4 rounded-xl shadow-sm ${bg} ${text} flex items-center space-x-4`}>
         <div className="text-2xl">{icon}</div>
         <div>
            <div className="text-sm font-medium">{label}</div>
            <div className="text-xl font-bold">{value}</div>
         </div>
      </div>
   );
}
