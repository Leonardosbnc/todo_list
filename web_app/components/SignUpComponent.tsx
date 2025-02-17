import { useState } from "react";
import Input from "./inputs/Input";
import PasswordInput from "./inputs/PasswordInput";
import Button from "./Button";
import { createUser } from "@/api/users";
import Image from "next/image";
import { showToast } from "@/utils/toastHelper";

export default function SignUpComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      showToast("error", "Passwords must match");
      return;
    }

    const { status, data } = await createUser({ user: { email, password } });
    if (status === 201) {
      showToast("success", "Account created!");
      setTimeout(() => (window.location.href = "/"), 1500);
    } else {
      showToast("error", data?.error || "Something went wrong...");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col space-y-3 w-1/5">
        <div className="flex justify-center items-center">
          <Image src="/logo.jpeg" alt="" height={210} width={210} />
        </div>

        <div className="flex flex-col space-y-1">
          <span>Email</span>
          <Input value={email} setValue={setEmail} />
        </div>
        <div className="flex flex-col space-y-1">
          <span>Password</span>
          <PasswordInput value={password} setValue={setPassword} />
        </div>
        <div className="flex flex-col space-y-1">
          <span>Confirm Password</span>
          <PasswordInput
            value={confirmPassword}
            setValue={setConfirmPassword}
          />
        </div>

        <Button onClick={handleSignUp} type="save">
          Sign Up
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
