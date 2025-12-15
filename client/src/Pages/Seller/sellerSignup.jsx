import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { sellerSignup } from "../../Api/sellerApi";


// IMPORT IMAGE DIRECTLY
import AuthBg from "../../assets/data";

const SellerSignup = () => {
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.target).entries());

    try {
      await sellerSignup(payload);
      alert("Seller account created successfully!");
      navigate("/seller/login");

    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#EFDFBD] flex items-center justify-center p-6">

      {/* OUTER CONTAINER */}
      <div className="max-w-6xl w-full flex bg-white shadow-2xl rounded-2xl overflow-hidden border border-[#C6A664]">

        {/* LEFT IMAGE PANEL */}
        <div
          className="hidden md:flex w-1/2 bg-cover bg-center p-10 text-white items-end"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${AuthBg})`,
          }}
        >
          <div className="backdrop-blur-sm p-6 rounded-xl">
            <h1 className="text-4xl font-bold text-[#EAD5AE] drop-shadow-lg">Become A Seller</h1>
            <p className="text-sm text-gray-200 mt-3 max-w-xs">
              Sell your artwork, manage your shop, and reach thousands of customers on ArtAmour.
            </p>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="w-full md:w-1/2 p-10">

          <Link to="/" className="flex items-center gap-2 text-[#4E342E] hover:text-[#9A665B]">
            <ArrowLeft size={20} /> Back to Home
          </Link>

          <h2 className="text-3xl font-bold mt-4 mb-8 text-[#4E342E]">Create Your Seller Account</h2>

          {/* FORM CARD */}
          <div className="p-6 bg-[#FAF5EB] rounded-xl shadow-inner border border-[#E2B787]">
            <form onSubmit={handleSignup} className="space-y-4">

              <div className="form-group">
                <label className="label">Full Name</label>
                <input name="name" required className="input-box" />
              </div>

              <div className="form-group">
                <label className="label">Email Address</label>
                <input type="email" name="email" required className="input-box" />
              </div>

              <div className="form-group">
                <label className="label">Password</label>
                <input type="password" name="password" required className="input-box" />
              </div>

              <div className="form-group">
                <label className="label">Phone Number</label>
                <input name="phone" required className="input-box" />
              </div>

              <div className="form-group">
                <label className="label">Shop Name</label>
                <input name="shopName" required className="input-box" />
              </div>

              <div className="form-group">
                <label className="label">Shop Address (optional)</label>
                <input name="shopAddress" className="input-box" />
              </div>

              <div className="form-group">
                <label className="label">GST Number (optional)</label>
                <input name="gstNumber" className="input-box" />
              </div>

              {/* BUTTON */}
              <button className="w-full bg-[#4E342E] text-white py-3 rounded-lg hover:bg-[#9A665B] transition font-semibold shadow-md">
                Create Account
              </button>

              <p className="text-sm text-center mt-2 text-[#4E342E]">
                Already a seller?{" "}
                <Link to="/seller/login" className="text-[#9A665B] font-medium hover:underline">
                  Login here
                </Link>
              </p>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SellerSignup;



