export default function PrimaryButton({ children, onClick, className = '', disabled = false, type = 'button' }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 transition ${className}`}
    >
      {children}
    </button>
  );
}
