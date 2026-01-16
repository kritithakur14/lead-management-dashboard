import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const admin_email = "admin@yahoo.com";
const admin_password = "admin123";

// eslint-disable-next-line react/prop-types
export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === admin_email && password === admin_password) {
      localStorage.setItem("isLoggedIn", "true");
      onLogin();
      navigate("/leads");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-[450px] flex flex-col items-center px-6">
        <h1 className="font-meow text-[#9c0235] text-[45px] font-bold mb-8 text-center">
          Lead Management Dashboard
        </h1>

        <form
          className="w-full flex flex-col gap-[15px] shadow-md p-6 rounded-xl bg-white"
          onSubmit={handleLogin}
        >
          <h1 className="font-sans text-[25px] text-center text-[#022a66] font-semibold">
            Login
          </h1>

          {error && <p className="text-red-600 text-center text-sm">{error}</p>}

          <div className="w-full flex flex-col gap-[6px]">
            <label htmlFor="email" className="text-[16px] text-[#08568a]">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full h-[40px] border-[2px] border-[#91b6b6] rounded-lg text-[15px] px-[15px] bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#9ac7d6]"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col gap-[6px] relative">
            <label htmlFor="password" className="text-[16px] text-[#08568a]">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              id="password"
              className="w-full h-[40px] border-[2px] border-[#91b6b6] rounded-lg text-[15px] px-[15px] bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#9ac7d6]"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {!show ? (
              <IoMdEye
                className="w-[20px] h-[20px] absolute right-3 bottom-[10px] cursor-pointer text-[#08568a]"
                onClick={() => setShow(true)}
              />
            ) : (
              <IoMdEyeOff
                className="w-[20px] h-[20px] absolute right-3 bottom-[10px] cursor-pointer text-[#08568a]"
                onClick={() => setShow(false)}
              />
            )}
          </div>

          <button
            type="submit"
            className="mt-4 px-8 py-2 bg-[#0a2b47] rounded-lg text-white text-[16px] hover:bg-[#13204b] transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
