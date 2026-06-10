export default function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-400 bg-white placeholder:text-gray-400"
    />
  );
}
