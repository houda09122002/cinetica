"use client";

import { useLogin } from "../hooks/useLogin";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import Image from "next/image";

export default function LoginPage() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    isLoading,
    handleLogin,
  } = useLogin();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="flex w-full max-w-3xl rounded-lg overflow-hidden shadow-lg">
        {/* Section de connexion */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-black text-white">
          <h1 className="text-4xl font-bold mb-2">Welcome to</h1>
          <h2 className="text-6xl font-bold text-purple-500 mb-8">Cinetica</h2>

          <Card className="bg-transparent p-4 border-none">
            <h3 className="text-2xl font-semibold mb-4 text-white">Login</h3>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-4 bg-gray-800 text-white"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 bg-gray-800 text-white"
            />
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white"
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          </Card>
        </div>

        {/* Section image */}
        <div className="hidden md:flex w-1/2 bg-white items-center justify-center">
          <Image
            src="/clapperboard.jpeg"
            alt="Cinema Clapperboard"
            width={500}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
