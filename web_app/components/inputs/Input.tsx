interface InputProps {
  label: string;
  value: string;
  setValue: (v: string) => void;
}

export default function Input({ value, setValue, label }: InputProps) {
  return (
    <>
      <span>{label}</span>
      <input
        className="w-full rounded-lg px-2 py-1 text-black focus:outline-none border border-1 border-black bg-gray-100"
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
    </>
  );
}
