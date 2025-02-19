import { useState } from "react";
import Input from "./inputs/Input";
import PasswordInput from "./inputs/PasswordInput";
import Button from "./Button";
import { loginUser } from "@/api/users";
import { showToast } from "@/utils/toastHelper";
import Image from "next/image";

export default function SignInComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { success, error } = await loginUser({ user: { email, password } });
    if (success) {
      showToast("success", "Successfully logged in!");
      setTimeout(() => (window.location.href = "/home"), 1500);
    } else {
      showToast("error", error);
    }
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
        <div className="flex flex-col space-y-1">
          <PasswordInput
            value={password}
            setValue={setPassword}
            label="Password"
            recoverable
          />
        </div>

        <Button onClick={handleLogin} type="save">
          Login
        </Button>

        <div className="flex items-center justify-end space-x-1">
          <span className="text-sm">Don&#39;t have an account?</span>
          <span
            className="font-bold underline cursor-pointer"
            onClick={() => (window.location.href = "/sign-up")}
          >
            Sign up.
          </span>
        </div>
      </div>
    </div>
  );
}
