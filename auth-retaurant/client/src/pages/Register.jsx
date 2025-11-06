import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        full_name: form.full_name,
        email: form.email,
        username: form.username,
        password: form.password,
        confirm_password: form.confirmPassword
      });
      
      toast.success(res.data.message || "Registered successfully!");
      navigate('/'); // Redirect to login page instead of dashboard
      
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-[420px]">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["full_name", "email", "username", "password", "confirmPassword"].map((field) => (
            <div key={field}>
              <input
                type={field.includes("password") ? "password" : "text"}
                name={field}
                placeholder={field.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()}
                value={form[field]}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-linear-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-purple-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}