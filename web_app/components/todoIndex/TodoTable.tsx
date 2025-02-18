import { ITodo } from "@/interfaces";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface TodoTableProps {
  todos: ITodo[];
  setEditModalData: (todo: ITodo) => void;
  setSlugToAction: (slug: string) => void;
  setConfirmation: (action: "complete" | "delete") => void;
}

export default function TodoTable({
  todos,
  setEditModalData,
  setSlugToAction,
  setConfirmation,
}: TodoTableProps) {
  return (
    <div className="flex-col w-full space-y-2 h-[75%] overflow-y-auto md:text-normal text-sm">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <div className="flex-col w-full pt-3 space-y-2" key={todo.slug}>
            <div className="flex w-full items-center">
              <span className="w-4/12 break-all">{todo.name}</span>
              <span
                className={twMerge(
                  "w-3/12 capitalize",
                  todo.status === "completed"
                    ? "text-green-500"
                    : "text-blue-500"
                )}
              >
                {todo.status}
              </span>
              <span className="w-3/12">
                {new Date(todo.created_at)
                  .toJSON()
                  .slice(0, 10)
                  .split("-")
                  .reverse()
                  .join("/")}
              </span>
              <div className="flex w-2/12 space-x-2 justify-center items-center">
                <Image
                  className={
                    todo.status === "completed"
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }
                  src="/edit.png"
                  alt=""
                  width={20}
                  height={20}
                  onClick={() => {
                    if (todo.status === "completed") return;
                    setEditModalData(todo);
                  }}
                />
                <Image
                  className={
                    todo.status === "completed"
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }
                  src="/complete.png"
                  alt=""
                  width={20}
                  height={20}
                  onClick={() => {
                    if (todo.status === "completed") return;

                    setSlugToAction(todo.slug);
                    setConfirmation("complete");
                  }}
                />
                <Image
                  className="cursor-pointer"
                  src="/delete.png"
                  alt=""
                  width={20}
                  height={20}
                  onClick={() => {
                    setSlugToAction(todo.slug);
                    setConfirmation("delete");
                  }}
                />
              </div>
            </div>

            <hr className="w-full border border-gray-300 m-0" />
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center">
          <span className="font-semibold text-xl">No To-Do Found</span>
        </div>
      )}
    </div>
  );
}
