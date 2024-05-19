"use client";
import InputPage from "@/components/Input";
import Image from "next/image";
import React, { useCallback, useState } from "react";
export default function AuthPage() {
  const [mail, setmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const toggleVariant = useCallback(() => {
    setVariant((currentvariant) =>
      currentvariant === "login" ? "register" : "login"
    );
  }, []);
  return (
    <div className=" relative h-full w-full bg-[url('/images/org-hero.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image
            src={"/images/logo-2.jpg"}
            alt="logo"
            width={100}
            height={100}
          />
        </nav>
        <div className="flex justify-center">
          <div className=" bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-4xl text-white font-semibold mb-8">
              {variant === "login" ? "Sign In" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <InputPage
                  label="username"
                  onChange={(e: any) => setName(e.target.value)}
                  value={name}
                  id="Email"
                />
              )}
              <InputPage
                label="Email"
                type="email"
                onChange={(e: any) => setmail(e.target.value)}
                value={mail}
                id="Email"
              />
              <InputPage
                label="Password"
                type="password"
                onChange={(e: any) => setPassword(e.target.value)}
                value={password}
                id="Password"
              />
            </div>
            <button
              className=" 
               bg-green-600 py-3
                text-white
                 rounded-md 
                 w-full 
                 mt-10
                 hover:bg-green-700
                 transition

               "
            >
              {variant==="login"? "login" : "Sign up"}

            </button>
            <p className=" text-neutral-500 mt-12">
              {variant==="login"? "Don't have an account?":"Already have an account?"}

              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
               {variant==='login'? "Create an account" : "Login"}

              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
