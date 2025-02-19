import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "./Button";
import { showToast } from "@/utils/toastHelper";
import PasswordInput from "./inputs/PasswordInput";
import { resetPassword } from "@/api/users";

export function ResetPasswordComponent() {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const handlResetPassword = async () => {
    if (password !== confirmpassword) {
      showToast("error", "Passwords must match");
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token") as string;

    const { status, data } = await resetPassword({ token, password });

    if (status === 204) {
      showToast("success", "Password updated!");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } else {
      showToast("error", data.error || "Could not update Password...");
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col space-y-3 md:w-1/5">
        <div className="flex justify-center items-center">
          <Image src="/logo.jpeg" alt="" height={210} width={210} />
        </div>

        <div className="flex flex-col space-y-1 mt-2">
          <PasswordInput
            value={password}
            setValue={setPassword}
            label="Password"
          />
        </div>

        <div className="flex flex-col space-y-1 mt-2">
          <PasswordInput
            value={confirmpassword}
            setValue={setConfirmPassword}
            label="Confirm Password"
          />
        </div>

        <Button onClick={handlResetPassword} type="save">
          Save
        </Button>
      </div>
    </div>
  );
}
