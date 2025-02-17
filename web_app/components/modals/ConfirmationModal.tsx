import BaseModal from "./BaseModal";
import Button from "../Button";

interface IProps {
  isOpen: boolean;
  handleOpenStateChange: (v: boolean) => void;
  handleConfirm: () => void;
  action: string;
}

export default function ConfirmationModal({
  isOpen,
  handleOpenStateChange,
  handleConfirm,
  action,
}: IProps) {
  return (
    <BaseModal isOpen={isOpen} handleOpenStateChange={handleOpenStateChange}>
      <div className="flex-col space-y-4">
        <span className="font-bold text-lg capitalize">{action} To-do</span>
        <div>
          <span className="font-semibold">
            Are you sure you want to {action} this To-do?
          </span>
        </div>

        <div className="flex justify-between items-center space-x-3">
          <Button
            width="w-6/12"
            type="normal"
            onClick={() => handleOpenStateChange(false)}
          >
            Cancel
          </Button>
          <Button
            width="w-6/12"
            type={action === "complete" ? "save" : "delete"}
            onClick={() => handleConfirm()}
          >
            Confirm
          </Button>
        </div>
      </div>
    </BaseModal>
  );
}
