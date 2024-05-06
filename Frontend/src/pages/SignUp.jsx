import { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const { signup, isLoading, error } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(name, email, password);
    setIsComplete(true);
  };

  return (
    <div className=" w-full m-auto p-5">
      <div className="w-full flex justify-center">
      <h2 className=" text-center bg-emerald-200 py-2  rounded-md w-60">Register</h2>
      </div>
      <form onSubmit={handleSubmit} className="  flex flex-col justify-center m-auto border py-5 border-t-0">
      <div className=" p-2 align-middle m-auto w-60">
          <label htmlFor="name">Name:</label>
          <input
            className="px-5 py-2 rounded-lg m-auto w-52 bg-slate-200"
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="your name"
          />
        </div>
        <div className=" p-2 align-middle m-auto w-60">
          <label htmlFor="email">Email:</label>
          <input
            className="px-5 py-2 rounded-lg m-auto w-52 bg-slate-200"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className=" p-2 align-middle m-auto w-60">
          <label htmlFor="password">Password:</label>
          <input
            className="px-5 py-2 rounded-lg m-auto w-52 bg-slate-200"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button type="submit" disabled={isLoading}
          className="py-2 bg-black text-white rounded-lg w-full ">
          {isLoading ? "Signing Up..." : "Submit"}
        </button>
        {error && <div className="error-msg">{error}</div>}
        {!error && isComplete && (
          <Link to="/">Sign up Successfully go to home.</Link>
        )}
      </form>
    </div>
  );
};

export default SignUp;
