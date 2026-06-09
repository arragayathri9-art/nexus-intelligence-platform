import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {

  const {
    signup,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      // CREATE ACCOUNT
      await signup(
        formData.email,
        formData.password
      );

      // LOGOUT IMMEDIATELY
      await logout();

      toast.success(
        "Account Created Successfully. Please Login."
      );

      // REDIRECT TO LOGIN
      navigate("/login");

    } catch (error) {

      if (error.code === "auth/email-already-in-use") {
        toast.error("Account already exists");
      }
      else if (error.code === "auth/weak-password") {
        toast.error("Password must be at least 6 characters");
      }
      else {
        toast.error("Signup failed");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center cyber-grid relative overflow-hidden">

      <div className="particles"></div>

      <motion.form
        onSubmit={handleSignup}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass neon-border w-[90%] md:w-[420px] p-10 rounded-3xl"
      >

        <h1 className="text-4xl font-bold text-center glow-text mb-8">
          CREATE ACCOUNT
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="w-full mb-5 p-4 rounded-xl bg-black/30 border border-cyan-400 outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="w-full mb-5 p-4 rounded-xl bg-black/30 border border-cyan-400 outline-none"
        />

        <button
          disabled={loading}
          className="w-full p-4 rounded-xl bg-cyan-400 text-black font-bold hover:scale-105 duration-300"
        >
          {loading ? "Creating..." : "Signup"}
        </button>

        <p className="mt-5 text-center">
          Already have account?
          <Link
            to="/login"
            className="text-cyan-400 ml-2"
          >
            Login
          </Link>
        </p>

      </motion.form>
    </div>
  );
};

export default Signup;