// src/Components/Signup.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Images from "../../assets/data";
import API from "../../utils/api";
import { AuthContext } from "../../context/authContext";

const Signup = () => {
  const navigate = useNavigate();
  const { loadUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone
      };

      const res = await API.post("/user/register", payload); // <- changed to /api/user/register
      if (res.data?.token) localStorage.setItem("token", res.data.token);
      await loadUser();
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center font-sans overflow-hidden ">
      <div className="absolute inset-0">
        <img src={Images} alt="Art Background" className="w-full h-full object-cover blur-sm scale-105" />
        <div className="absolute inset-0 bg-Brown mix-blend-multiply"></div>
      </div>

      <div className="relative bg-amber-50 backdrop-blur-md shadow-2xl rounded-2xl p-10 w-full max-w-md text-center text-Brown ">
        <h1 className="text-3xl font-serif mb-4">Sign Up to ArtAmour</h1>
        <p className="text-sm mb-8 text-Redwood">Create your account to explore!</p>

        <form onSubmit={onSubmit} className="flex flex-col text-left gap-4">
          {error && <div className="text-red-600 text-sm">{error}</div>}

          <input name="name" value={form.name} onChange={onChange} type="text" placeholder="Enter Your Name" className="rounded-md p-2 border-2 outline-none focus:border-Brown" required />
          <input name="email" value={form.email} onChange={onChange} type="email" placeholder="Enter Your Email" className="rounded-md p-2 border-2 outline-none focus:border-Brown" required />
          <input name="password" value={form.password} onChange={onChange} type="password" placeholder="Enter Your Password" className="rounded-md p-2 border-2 outline-none focus:border-Brown" required />
          <input name="passwordConfirm" value={form.passwordConfirm} onChange={onChange} type="password" placeholder="Confirm Your Password" className="rounded-md p-2 border-2 outline-none focus:border-Brown" required />
          <input name="phone" value={form.phone} onChange={onChange} type="text" placeholder="Phone (optional)" className="rounded-md p-2 border-2 outline-none focus:border-Brown" />

          <button type="submit" className="w-full bg-Cream text-offcream py-2 rounded-full font-semibold hover:bg-Beige transition disabled:opacity-60" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-center text-sm text-Redwood mt-6">
            Already have an account?{" "}
            <Link to="/Signin" className="text-Brown font-semibold cursor-pointer hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
