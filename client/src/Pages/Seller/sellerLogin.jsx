import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { sellerLogin } from "../../Api/sellerApi";


const SellerLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await sellerLogin(payload);
      const token = res?.data?.token;
      if (!token) {
        alert("Token missing");
        return;
      }
      localStorage.setItem("sellerToken", token);
      navigate("/seller/dashboard");

    } catch (err) {
      // try to show helpful message
      const message = err?.response?.data?.message || err?.message || "Login failed";
      alert(message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-Beige px-4 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden flex">

        {/* LEFT ART SECTION */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center p-10 text-white"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
              url('/assets/auth-bg.jpg')`,
          }}
        >
          <div className="flex flex-col justify-end h-full">
            <h1 className="text-4xl font-bold mb-2 text-Gold">
              Welcome Back Seller
            </h1>
            <p className="text-sm max-w-xs opacity-90">
              Manage your shop, products & orders effortlessly with ArtAmour’s Seller Panel.
            </p>
          </div>
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="w-full md:w-1/2 p-10">

          <Link to="/" className="flex items-center gap-2 text-Brown hover:text-Gold">
            <ArrowLeft size={20} /> Back to Home
          </Link>

          <h2 className="text-3xl font-bold text-Brown mt-4 mb-6">Seller Login</h2>

          <form onSubmit={handleLogin} className="space-y-5">

            <div className="flex flex-col">
              <label className="text-sm text-Brown mb-1">Email Address</label>
              <input
                name="email"
                type="email"
                className="border bg-Cream border-Brown/40 rounded-lg px-4 py-3 focus:ring-2 focus:ring-Gold outline-none"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-Brown mb-1">Password</label>
              <input
                name="password"
                type="password"
                className="border bg-Cream border-Brown/40 rounded-lg px-4 py-3 focus:ring-2 focus:ring-Gold outline-none"
                required
              />
            </div>

            <button
              className="w-full bg-Brown hover:bg-Gold hover:text-Brown text-white py-3 rounded-lg text-lg font-semibold transition"
            >
              Login
            </button>

            <p className="text-sm text-center text-Brown">
              New Seller?{" "}
              <Link to="/seller/signup" className="text-Gold font-semibold hover:underline">
                Create an account
              </Link>
            </p>
          </form>

        </div>

      </div>
    </div>
  );
};

export default SellerLogin;



