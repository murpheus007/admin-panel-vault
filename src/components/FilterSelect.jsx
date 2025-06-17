export default function FilterSelect({ value, onChange, options = [], label = "Filter by status" }) {
   return (
      <div className="mb-4 flex items-center gap-2">
         <label className="text-sm font-medium text-gray-700">{label}:</label>
         <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
         >
            {options.map((opt) => (
               <option key={opt} value={opt}>
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
               </option>
            ))}
         </select>
      </div>
   );
}
