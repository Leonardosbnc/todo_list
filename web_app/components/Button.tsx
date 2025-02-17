import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  width?: string;
  type: "save" | "normal" | "filter" | "delete";
}

export default function Button({
  onClick,
  children,
  type,
  width = "w-full",
}: ButtonProps) {
  const getTypeClassName = () => {
    const defaultClassName =
      "bg-blue-500 hover:bg-blue-600 text-white duration-500";
    switch (type) {
      case "save":
        return "bg-green-500 text-white hover:bg-green-600 duration-500";
      case "delete":
        return "bg-red-500 text-white hover:bg-red-600 duration-500";
      case "filter":
        return "bg-purple-500 text-white hover:bg-purple-600 duration-500";
      case "normal":
        return defaultClassName;
      default:
        return defaultClassName;
    }
  };

  return (
    <button
      onClick={onClick}
      className={twMerge(
        "border border-1 rounded-lg h-9",
        getTypeClassName(),
        width
      )}
    >
      {children}
    </button>
  );
}
