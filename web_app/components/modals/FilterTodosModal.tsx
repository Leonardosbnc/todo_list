import { useState } from "react";
import BaseModal from "./BaseModal";
import Button from "../Button";

interface IProps {
  isOpen: boolean;
  handleOpenStateChange: (v: boolean) => void;
  handleSaveFilter: (filters: { status: string | undefined }) => void;
}

export default function FilterTodosModal({
  isOpen,
  handleOpenStateChange,
  handleSaveFilter,
}: IProps) {
  const [status, setStatus] = useState("");

  return (
    <BaseModal isOpen={isOpen} handleOpenStateChange={handleOpenStateChange}>
      <div className="flex-col space-y-4">
        <span className="font-bold text-lg">Create new To-do</span>

        <div className="flex flex-col space-y-1">
          <span className="font-semibold">Status</span>
          <select onChange={({ target }) => setStatus(target.value)}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <Button type="normal" onClick={() => handleSaveFilter({ status })}>
          Apply
        </Button>
      </div>
    </BaseModal>
  );
}
