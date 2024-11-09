'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation'; 


export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLogged, setIsLogged] = useState(false); 

    const handleLogin = async () => {
      setError('');
    
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), 
      });
    
      const data = await response.json();
    
      if (response.ok) {
        setIsLogged(true); 
        router.push('/main'); 
      } else {
        setIsLogged(false); 
        setError(data.error);  // Affichage de l'erreur
      }
    };

    if (isLogged) {
      // Si l'utilisateur est connecté, afficher le contenu principal de l'application
      return (
        <div className="flex justify-center items-center h-full">
          <h1 className="text-4xl font-bold text-gray-700">En cours de développement…</h1>
        </div>
      );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="flex w-full max-w-3xl rounded-lg overflow-hidden shadow-lg">
                
                {/* Section de gauche (fond noir) */}
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
                            className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                        >
                            Login
                        </Button>
                        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                    </Card>
                </div>
                
                {/* Section de droite (image de clap cinéma) */}
                <div className="hidden md:flex w-1/2 bg-white items-center justify-center">
                    <img
                        src="/clapperboard.jpeg"
                        alt="Cinema Clapperboard"
                        className="object-contain w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
}
