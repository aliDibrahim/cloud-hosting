"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import ButtonSpinner from "@/components/ButtonSpinner";
import { DOMAIN } from "@/utils/constants";

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "") return toast.error("Email is required");
    if (password === "") return toast.error("Password is required");
    try {
        setLoading(true);
      await axios.post(`${DOMAIN}/api/users/login`, { email, password });
        router.replace("/");
        router.refresh();
        setLoading(false);
      toast.success("logged in");
    } catch (error: any) {
        toast.error(error?.response?.data.message);
      console.log(error);
        setLoading(false);
    }
  };

  return (
    <form onSubmit={formSubmitHandler} className="flex flex-col">
      <input
        className="border border-gray-500 rounded mb-4 px-3 py-2 
         focus:outline-none focus:border-blue-400 duration-300"
        type="email"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border border-gray-500 rounded mb-4 px-3 py-2 
         focus:outline-none focus:border-blue-400 duration-300"
        type="password"
        placeholder="Enter Your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        disabled={loading}
        type="submit"
        className="text-2xl text-white bg-blue-900 p-2 rounded-sm my-auto cursor-pointer font-bold w-[200px] m-auto hover:bg-blue-400 duration-300 "
      >
        {loading ? <ButtonSpinner /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
