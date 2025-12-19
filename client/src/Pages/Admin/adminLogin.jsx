import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import API from "../../utils/api";
import InputField from "../../components/inputField";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const res = await API.post("/admin/login", form);
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EFDFBD]">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-[#FFEBd6] p-8 rounded-xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-[#4E342E]">
          Admin Login
        </h2>

        <InputField
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          icon={Mail}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          icon={Lock}
        />

        <button
          type="submit"
          className="w-full bg-[#4E342E] text-white py-2 rounded-md hover:bg-[#3b2722]"
        >
          Login
        </button>
      </form>
    </div>
  );
}



