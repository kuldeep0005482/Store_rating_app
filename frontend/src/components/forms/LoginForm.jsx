import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button, Input } from "../ui";

export default function LoginForm({ onSubmit, loading = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!email) next.email = "Email is required";
    if (!password) next.password = "Password is required";
    setErrors(next);
    if (!Object.keys(next).length) onSubmit?.({ email, password });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        icon={Mail}
        error={errors.email}
      />

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          icon={Lock}
          error={errors.password}
          inputClassName="pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-3 top-[31px] text-[#6b7280]"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <Button type="submit" loading={loading} className="w-full">
        Login
      </Button>
    </form>
  );
}