import { useState } from "react";
import Input from "../inputs/Input";
import BaseModal from "./BaseModal";
import Button from "../Button";
import { createTodo, updateTodo } from "@/api/todos";
import { showToast } from "@/utils/toastHelper";
import { ITodo } from "@/interfaces";
import Loader from "../Loader";
import TextArea from "../inputs/TextArea";

interface IProps {
  isOpen: boolean;
  handleOpenStateChange: (v: boolean) => void;
  initialData: ITodo | undefined;
}

export default function CreateTodoModal({
  isOpen,
  handleOpenStateChange,
  initialData,
}: IProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [saving, setSaving] = useState(false);

  const handleSaveTodo = async () => {
    if (saving) return;

    if (name.length < 4 || name.length > 40) {
      showToast("error", "Name must be between 4 and 40 characters");
      return;
    }
    setSaving(true);

    const saveFunc = initialData?.slug
      ? updateTodo(initialData.slug, { name, description })
      : createTodo({ name, description });
    const { status, data } = await saveFunc;

    if ([200, 201].includes(status as number)) {
      showToast(
        "success",
        status === 200
          ? "To-do successfully updated!"
          : "To-do successfully created!"
      );
      setTimeout(() => {
        handleOpenStateChange(false);
      }, 1500);
      return;
    }
    setSaving(false);
    showToast("error", data?.error || "Something went wrong...");
  };

  return (
    <BaseModal isOpen={isOpen} handleOpenStateChange={handleOpenStateChange}>
      <div className="flex-col space-y-4">
        <span className="font-bold text-lg">Create new To-do</span>

        <div className="flex-col space-y-1">
          <Input setValue={setName} value={name} label="Name" />
        </div>
        <div className="flex-col space-y-1">
          <TextArea
            setValue={setDescription}
            value={description}
            label="Description"
            optional
          />
        </div>

        <Button type="save" onClick={handleSaveTodo}>
          {saving ? <Loader /> : "Save"}
        </Button>
      </div>
    </BaseModal>
  );
}
