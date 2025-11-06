import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ usernameOrEmail: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      const { user, token } = res.data; // make sure backend sends these

      // ✅ Save user info in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      toast.success(res.data.message || "Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-[420px]">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Welcome Back 👋</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="usernameOrEmail"
          placeholder="Username or Email"
          value={form.usernameOrEmail}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition"
        >
          Login
        </button>
      </form>

      <p className="text-center mt-4 text-gray-600">
        Don’t have an account?{" "}
        <Link to="/register" className="text-indigo-600 font-medium hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
