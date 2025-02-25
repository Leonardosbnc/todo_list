import Image from "next/image";
import { useState } from "react";

interface PasswordInputProps {
  label: string;
  recoverable?: boolean;
  value: string;
  setValue: (v: string) => void;
}

export default function PasswordInput({
  label,
  value,
  setValue,
  recoverable = false,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        {recoverable && (
          <span
            className="cursor-pointer text-xs hover:underline text-gray-600 mt-1"
            onClick={() => (window.location.href = "/recover-password")}
          >
            Forgot password?
          </span>
        )}
      </div>
      <div className="flex w-full rounded-lg py-1 text-black border border-1 border-black bg-gray-100 space-x-1">
        <input
          className="w-10/12 focus:outline-none bg-gray-100 px-2"
          type={visible ? "text" : "password"}
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
        <div className="flex w-2/12 items-center justify-center">
          {visible ? (
            <Image
              src="/hidden.png"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={() => setVisible(false)}
            />
          ) : (
            <Image
              src="/eye.png"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={() => setVisible(true)}
            />
          )}
        </div>
      </div>
    </>
  );
}
