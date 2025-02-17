import { useState } from "react";
import Input from "./inputs/Input";
import PasswordInput from "./inputs/PasswordInput";
import Button from "./Button";
import { createUser } from "@/api/users";

export default function SignUpComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    const { status, data } = await createUser({ user: { email, password } });
    if (status === 201) {
      alert("Success");
      window.location.href = "/";
    } else {
      alert(data?.error || "Something went wrong...");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col space-y-3 w-1/5">
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
