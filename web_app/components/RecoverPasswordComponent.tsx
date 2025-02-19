import Image from "next/image";
import { useState } from "react";
import Input from "./inputs/Input";
import Button from "./Button";
import { sendResetPasswordEmail } from "@/api/users";
import { showToast } from "@/utils/toastHelper";
import Loader from "./Loader";

export function RecoverPasswordComponent() {
  const [sending, setSending] = useState(false);
  const [email, setEmail] = useState("");

  const handleSendEmail = async () => {
    setSending(true);
    await sendResetPasswordEmail({ email });
    showToast("success", "Email sent");

    setTimeout(() => (window.location.href = "/"), 1500);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col space-y-3 md:w-1/5">
        <div className="flex justify-center items-center">
          <Image src="/logo.jpeg" alt="" height={210} width={210} />
        </div>

        <div className="flex flex-col space-y-1 mt-2">
          <Input value={email} setValue={setEmail} label="Email" />
        </div>

        <Button
          onClick={() => {
            if (sending) return;
            handleSendEmail();
          }}
          type="save"
          disabled={sending}
        >
          {sending ? <Loader /> : "Send Email"}
        </Button>

        <div className="flex items-center justify-end space-x-1">
          <span className="text-sm">Already have an account?</span>
          <span
            className="font-bold underline cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            Login.
          </span>
        </div>
      </div>
    </div>
  );
}
