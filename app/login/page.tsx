"use client";

import HiperiaLogo from "../../public/hiperia_logo.svg";
import Background from "../../public/loginBackground.png";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";

export default function Login() {
  const user = useRef("");
  const password = useRef("");

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: Event) => {
    event.preventDefault();
    setIsLoading(true);
    const result = await signIn("credentials", {
      username: user.current,
      password: password.current,
      redirect: true,
      callbackUrl: "/home",
    });
  };

  const backgroundImage = Background.src;

  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(\"${backgroundImage}\")`,
      }}
    >
      <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <img src={HiperiaLogo.src} width="150" alt="" />
            <h1 className="mt-2 text-2xl">Fantasy</h1>
          </div>
          <form onSubmit={onSubmit}>
            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="text"
                name="name"
                placeholder="Usuario"
                onChange={(e) => (user.current = e.target.value)}
              />
            </div>

            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="Password"
                name="name"
                placeholder="******"
                onChange={(e) => (password.current = e.target.value)}
              />
            </div>
            <div className="mt-8 flex justify-center text-lg text-black">
              <button
                //onClick={onSubmit}
                type="submit"
                className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                disabled={isLoading}
              >
                {isLoading ? "Cargando" : "Entrar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
