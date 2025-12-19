import React, { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import API from "../../utils/api";
import InputField from "../../components/inputField";
import { useNavigate } from "react-router-dom";

export default function AdminRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      await API.post("/admin/register", form);
      alert("Admin registered successfully");
      navigate("/admin/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EFDFBD]">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-[#FFEBd6] p-8 rounded-xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-[#4E342E]">
          Admin Register
        </h2>

        <InputField
          label="Name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          icon={User}
        />

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
          className="w-full bg-[#C9A14A] text-[#4E342E] py-2 rounded-md hover:bg-[#D4AF37]"
        >
          Register Admin
        </button>
      </form>
    </div>
  );
}

