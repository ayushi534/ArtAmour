// src/Components/Signin.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Images from "../../assets/data";
import { userLogin } from "../../Api/userApi";
import { AuthContext } from "../../context/authContext";

const Signin = () => {
  const navigate = useNavigate();
  const { loadUser } = useContext(AuthContext);

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await userLogin(form);
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token)
      }
      await loadUser();
      navigate("/");

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center font-sans ">
      <div className="flex shadow-2xl">
        <div className="absolute inset-0">
          <img src={Images} alt="Art Background" className="w-full h-full object-cover blur-sm scale-105" />
          <div className="absolute inset-0 bg-Brown mix-blend-multiply"></div>
        </div>

        <div className="relative bg-amber-50 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-[100%]  max-w-md text-center text-Brown">
          <h1 className="text-4xl font-serif">Welcome To ArtAmour</h1>
          <p className="text-sm mb-8 text-Redwood "> Login to explore exclusive collections of art and creativity</p>

          <form onSubmit={onSubmit} className="flex flex-col text-xl text-left gap-4">
            {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

            <label className="text-lg">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Enter your Email"
              className="rounded-md p-2 border-2 outline-none focus:border-Brown focus:bg-slate-50"
              required
            />

            <label className="text-lg">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="Enter your Password"
              className="rounded-md p-2 border-2 outline-none focus:border-Brown focus:bg-slate-50"
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <button type="button" className="text-sm text-Brown hover:underline">Forgot password?</button>
            </div>

            <button
              type="submit"
              className="px-10 py-2 text-2xl rounded-md bg-Cream hover:bg-Beige text-Brown disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-center text-Redwood">
              Don't have an account? <Link to="/Signup" className="text-Brown text-semibold hover:underline">Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signin;
