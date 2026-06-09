import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useAuth();

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

const handleLogin = async (e) => {

  e.preventDefault();

  try {

    setLoading(true);

    await login(
      formData.email,
      formData.password
    );

    toast.success("Login Successful");

    navigate("/dashboard");

  } catch (error) {

    // ACCOUNT DOES NOT EXIST
    if (
      error.code === "auth/user-not-found"
    ) {
      toast.error("Create an account first");
    }

    // WRONG PASSWORD
    else if (
      error.code === "auth/wrong-password" ||
      error.code === "auth/invalid-credential"
    ) {
      toast.error("Wrong credentials");
    }

    else {
      toast.error("Login failed");
    }

  } finally {

    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center cyber-grid relative overflow-hidden">

      <div className="particles"></div>

      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass neon-border w-[90%] md:w-[420px] p-10 rounded-3xl"
      >
        <h1 className="text-4xl font-bold text-center glow-text mb-8">
          NEXUS LOGIN
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full mb-5 p-4 rounded-xl bg-black/30 border border-cyan-400 outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full mb-5 p-4 rounded-xl bg-black/30 border border-cyan-400 outline-none"
        />

        <button
          disabled={loading}
          className="w-full p-4 rounded-xl bg-cyan-400 text-black font-bold hover:scale-105 duration-300"
        >
          {loading ? "Authenticating..." : "Login"}
        </button>

        <p className="mt-5 text-center">
          No account?
          <Link
            to="/signup"
            className="text-cyan-400 ml-2"
          >
            Signup
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;