import { twMerge } from "tailwind-merge";
import BaseModal from "./BaseModal";
import { ITodo } from "@/interfaces";

interface IProps {
  isOpen: boolean;
  handleOpenStateChange: (v: boolean) => void;
  todo: ITodo;
}

export default function TodoDetailsModal({
  isOpen,
  handleOpenStateChange,
  todo,
}: IProps) {
  return (
    <BaseModal isOpen={isOpen} handleOpenStateChange={handleOpenStateChange}>
      <div className="space-y-4">
        <span className="font-bold text-xl">To-Do Details</span>

        <div className="space-y-1">
          <div className="text-lg font-semibold">Name</div>
          <span className="max-w-10/12 break-all">{todo.name}</span>
        </div>
        {todo.description && (
          <div className="flex-col space-y-1">
            <div className="text-lg font-semibold">Description</div>
            <span className="max-w-10/12 break-all">{todo.description}</span>
          </div>
        )}
        <div className="flex-col space-y-1">
          <div className="text-lg font-semibold">Status</div>
          <span
            className={twMerge(
              "capitalize",
              todo.status === "completed" ? "text-green-500" : "text-yellow-600"
            )}
          >
            {todo.status}
          </span>
        </div>
        <div className="flex-col space-y-1">
          <div className="text-lg font-semibold">Created Date</div>
          <span>
            {new Date(todo.created_at)
              .toJSON()
              .slice(0, 10)
              .split("-")
              .reverse()
              .join("/")}
          </span>
        </div>
        <div className="flex-col space-y-1">
          <div className="text-lg font-semibold">Last Update</div>
          <span>
            {todo.updated_at &&
              new Date(todo.updated_at)
                .toJSON()
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("/")}
          </span>
        </div>
      </div>
    </BaseModal>
  );
}
