import { useState } from "react";
import Input from "./inputs/Input";

export default function SignInComponent() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col space-y-3">
        <div className="flex flex-col space-y-1">
          <span>Email</span>
          <Input value={email} setValue={setEmail} />
        </div>
        <div className="flex flex-col space-y-1">
          <span>Password</span>
        </div>
      </div>
    </div>
  );
}
