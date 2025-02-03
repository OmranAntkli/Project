import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../services/api";
import "../App.css";
import signupImage from "../assets/login.svg";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await signUpUser(username, email, password);
      if (data) {
        console.log("Sign up successful", data);
        navigate("/login");
      }
    } catch (err) {
      setError(err.message || "Sign up failed");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen bg-gray-100 p-0">
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 h-full">
        <img
          src={signupImage}
          alt="Sign Up"
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2 h-full flex flex-col justify-center">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Create a new account
        </h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Create an account
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        <p className="text-center mt-4 text-gray-600">
          You already have an account{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
