import { useState } from "react";
import Input from "../inputs/Input";
import BaseModal from "./BaseModal";
import Button from "../Button";
import { createTodo } from "@/api/todos";
import { showToast } from "@/utils/toastHelper";

interface IProps {
  isOpen: boolean;
  handleOpenStateChange: (v: boolean) => void;
}

export default function CreateTodoModal({
  isOpen,
  handleOpenStateChange,
}: IProps) {
  const [name, setName] = useState("");

  const handleSaveTodo = async () => {
    const { status, data } = await createTodo({ name });

    if (status == 201) {
      showToast("success", "To-do successfully created!");
      setTimeout(() => {
        handleOpenStateChange(false);
      }, 1500);
      return;
    }
    showToast("error", data?.error || "Something went wrong...");
  };

  return (
    <BaseModal isOpen={isOpen} handleOpenStateChange={handleOpenStateChange}>
      <div className="flex-col space-y-4">
        <span className="font-bold text-lg">Create new To-do</span>

        <div className="flex-col space-y-1">
          <span>Name</span>
          <Input setValue={setName} value={name} />
        </div>

        <Button type="save" onClick={handleSaveTodo}>
          Save
        </Button>
      </div>
    </BaseModal>
  );
}
