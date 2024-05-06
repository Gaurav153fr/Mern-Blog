import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate(-1); // Navigate back by one step in the history stack
  };

  return (
    <div className=" w-full m-auto p-5">
      <div className="w-full flex justify-center">
      <h2 className=" text-center bg-emerald-200 py-2  rounded-md w-60">Login</h2>
      </div>
      <form onSubmit={handleSubmit} className="  flex flex-col justify-center m-auto border py-5 border-t-0">
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
        <div className=" p-2 align-middle m-auto w-60">
        <button
          type="submit"
          disabled={isLoading}
          className="py-2 bg-black text-white rounded-lg w-52 px-5 "
        >
          {isLoading ? "Signing Up..." : "Submit"}
        </button>
        </div>
        {error && <div className="error-msg">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
