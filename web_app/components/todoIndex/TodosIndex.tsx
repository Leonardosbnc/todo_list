import { deleteTodo, getTodos, updateTodo } from "@/api/todos";
import { useEffect, useState } from "react";
import Button from "../Button";
import CreateTodoModal from "../modals/CreateTodoModal";
import { twMerge } from "tailwind-merge";
import FilterTodosModal from "../modals/FilterTodosModal";
import Image from "next/image";
import { ITodo } from "@/interfaces";
import ConfirmationModal from "../modals/ConfirmationModal";
import { showToast } from "@/utils/toastHelper";
import TodoTable from "./TodoTable";

const headers = [
  { label: "Name", className: "w-4/12" },
  { label: "Status", className: "w-3/12" },
  { label: "Date", className: "w-3/12" },
  { label: "", className: "w-2/12" },
];

export default function TodosIndex() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [status, setStatus] = useState<string | undefined>();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState<ITodo | undefined>();
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [confirmation, setConfirmation] = useState<
    boolean | "complete" | "delete"
  >(false);
  const [slugToAction, setSlugToAction] = useState("");

  const fetchTodos = async () => {
    const { data } = await getTodos({ status });
    if (data?.todos) setTodos(data.todos);
  };

  const handleCompleteTodo = async () => {
    const { status } = await updateTodo(slugToAction, { status: "completed" });
    if (status === 200) {
      showToast("success", "To-do completed successfully!");
      setSlugToAction("");
      fetchTodos();
      return;
    }

    showToast("error", "Could not complete To-do...");
  };

  const handleDeleteTodo = async () => {
    const { status } = await deleteTodo(slugToAction);
    if (status === 204) {
      showToast("success", "To-do successfully deleted!");
      setSlugToAction("");
      fetchTodos();
      return;
    }

    showToast("error", "Could not delete To-do...");
  };

  const handleConfirmAction = async () => {
    switch (confirmation) {
      case "complete":
        handleCompleteTodo();
        break;
      case "delete":
        handleDeleteTodo();
        break;
      default:
        break;
    }

    setConfirmation(false);
  };

  const handleLogout = async () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  useEffect(() => {
    fetchTodos();
  }, [status]);

  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col space-y-3 w-3/5 mt-11">
        <span className="text-xl font-bold">TO-DOs</span>

        <div className="flex-col h-18 mt-4 w-full">
          <div className="flex justify-between py-2">
            <Button
              width="w-24"
              type="filter"
              onClick={() => setFilterModalOpen(true)}
            >
              Filters
            </Button>

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
                  key={header.label}
                >
                  {header.label}
                </span>
              );
            })}
          </div>

          <hr className="w-full border border-black m-0" />
        </div>

        <TodoTable
          todos={todos}
          setEditModalData={setEditModalData}
          setSlugToAction={setSlugToAction}
          setConfirmation={setConfirmation}
        />
        <div className="flex justify-end">
          <span
            className="text-sm cursor-pointer hover:underline"
            onClick={handleLogout}
          >
            Log out
          </span>
        </div>
      </div>

      {(createModalOpen || !!editModalData) && (
        <CreateTodoModal
          isOpen={createModalOpen || !!editModalData}
          handleOpenStateChange={(isOpen) => {
            setCreateModalOpen(isOpen);
            setEditModalData(undefined);
            fetchTodos();
          }}
          initialData={editModalData}
        />
      )}
      {!!confirmation && (
        <ConfirmationModal
          isOpen={!!confirmation}
          handleOpenStateChange={(v) => {
            setConfirmation(v);
            setSlugToAction("");
          }}
          handleConfirm={handleConfirmAction}
          action={confirmation as string}
        />
      )}
      {filterModalOpen && (
        <FilterTodosModal
          isOpen={filterModalOpen}
          handleOpenStateChange={setFilterModalOpen}
          handleSaveFilter={({ status }) => {
            setStatus(status);
            setFilterModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
