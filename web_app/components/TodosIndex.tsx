import { getTodos } from "@/api/todos";
import { useEffect, useState } from "react";
import Button from "./Button";
import CreateTodoModal from "./modals/CreateTodoModal";
import { twMerge } from "tailwind-merge";

interface ITodo {
  slug: string;
  name: string;
  status: string;
  created_at: string;
}

const headers = [
  { label: "Name", className: "w-4/12" },
  { label: "Status", className: "w-3/12" },
  { label: "Date", className: "w-3/12" },
  { label: "", className: "w-2/12" },
];

export default function TodosIndex() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [status, setStatus] = useState<undefined | string>();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const fetchTodos = async () => {
    const { data } = await getTodos(status);
    setTodos(data.todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col space-y-3 w-3/5 mt-11">
        <span className="text-xl font-bold">To-do</span>

        <div className="flex-col h-[80%] mt-4 w-full">
          <div className="flex justify-end p-2">
            <Button
              width="w-36"
              type="normal"
              onClick={() => setCreateModalOpen(true)}
            >
              New To-do
            </Button>
          </div>
          <div className="flex w-full">
            {headers.map((header) => {
              return (
                <span
                  className={twMerge("text-lg font-semibold", header.className)}
                >
                  {header.label}
                </span>
              );
            })}
          </div>

          <hr className="w-full border border-black m-0" />

          <div className="flex-col w-full overflow-y-auto space-y-2">
            {todos.map((todo) => (
              <div className="flex-col w-full pt-3 space-y-2">
                <div className="flex w-full">
                  <span className="w-4/12">{todo.name}</span>
                  <span className="w-3/12 capitalize">{todo.status}</span>
                  <span className="w-3/12">
                    {new Date(todo.created_at).toISOString().split("T")[0]}
                  </span>
                  <div className="w-2/12">
                    <span>edit</span>
                    <span>delete</span>
                  </div>
                </div>

                <hr className="w-full border border-gray-300 m-0" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <span className="text-sm cursor-pointer hover:underline">
            Log out
          </span>
        </div>
      </div>

      {createModalOpen && (
        <CreateTodoModal
          isOpen={createModalOpen}
          handleOpenStateChange={setCreateModalOpen}
        />
      )}
    </div>
  );
}
