interface TextAreaProps {
  label: string;
  value: string;
  setValue: (v: string) => void;
  optional?: boolean;
}

export default function TextArea({
  value,
  setValue,
  label,
  optional = false,
}: TextAreaProps) {
  return (
    <>
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        {optional && (
          <span className="text-xs text-gray-400 mt-1">Optional</span>
        )}
      </div>
      <textarea
        className="w-full rounded-lg px-2 py-1 text-black focus:outline-none border border-1 border-black bg-gray-100 resize-none"
        rows={4}
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
    </>
  );
}
