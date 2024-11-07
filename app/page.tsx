// app/login/page.tsx

"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { user } from '../repository/user';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        // Remplacez par la logique de validation des identifiants
        if (username === user.username && password === "votre_mot_de_passe") {
            setError('');
            // Rediriger ou changer l'état de connexion
        } else {
            setError("Nom d'utilisateur ou mot de passe incorrect.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="flex w-full max-w-4xl rounded-lg overflow-hidden shadow-lg">
                
                {/* Section de gauche */}
                <div className="flex-1 p-8 bg-black text-white flex flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-2">Welcome to</h1>
                    <h2 className="text-6xl font-bold text-purple-500 mb-8">Cinetica</h2>
                    
                    <Card className="bg-transparent">
                        <h3 className="text-2xl font-semibold mb-4">Login</h3>
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
                
                {/* Section de droite (Image) */}
                <div className="hidden md:block w-1/2">
                    <img
                        src="../public/clapperboard.jpeg"  // Remplacez par le chemin réel de votre image
                        alt="Cinema Clapperboard"
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
}
