import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      login(data.user, data.token);
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.error ||
        "Invalid email or password. Please verify and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Blur Background Circles */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="w-full max-w-md bg-[#090f1e]/85 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8 relative group">

        {/* Glow border overlay hover effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl blur opacity-15 group-hover:opacity-25 transition duration-500 -z-10"></div>

        {/* LOGO BRANDING */}
        <div className="mb-8 text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xl mx-auto shadow-lg shadow-blue-500/25">
            S
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-wide font-outfit mt-3">
              SmartStore <span className="text-blue-400">AI</span>
            </h1>
            <p className="text-gray-500 text-xs mt-1">
              AI-driven E-commerce Inventory & Content Engine
            </p>
          </div>
        </div>

        {/* ERROR PANEL */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl mb-6 flex items-center gap-2 animate-scale-up">
            <span>⚠️</span> <span className="font-semibold">{error}</span>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Business Email
            </label>
            <input
              type="email"
              placeholder="e.g. admin@smartstore.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#0a1224] border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-xs text-blue-400 hover:text-blue-300">Forgot?</a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#0a1224] border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="glow-btn w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3.5 rounded-xl font-bold transition shadow-lg shadow-blue-500/10 hover:shadow-indigo-500/20 disabled:opacity-50 text-sm flex items-center justify-center gap-2"
          >
            {loading && <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>}
            {loading ? "Authenticating Session..." : "Secure Sign In"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-gray-500 text-xs text-center mt-6">
          New to the platform?{" "}
          <Link
            to="/signup"
            className="text-blue-400 font-bold hover:text-blue-300 transition"
          >
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
