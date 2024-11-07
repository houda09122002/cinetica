// app/login/page.tsx
'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { user } from '../../repository/user';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (username === user.username && password === "votre_mot_de_passe") {  // Remplacez par le mot de passe correct
            setIsLogged(true);
            setError('');
        } else {
            setError("Nom d'utilisateur ou mot de passe incorrect.");
        }
    };

    if (isLogged) {
        return <div>Main application content</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Card className="p-8 shadow-lg rounded-lg w-full max-w-md bg-white dark:bg-gray-800">
                <h2 className="text-center text-2xl font-semibold mb-6">Supflix</h2>
                <Input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mb-4"
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-4"
                />
                <Button onClick={handleLogin} className="w-full bg-purple-600 text-white">
                    Se connecter
                </Button>
                {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            </Card>
        </div>
    );
}
