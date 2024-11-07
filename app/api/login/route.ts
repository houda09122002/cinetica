import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { user } from '@/repository/user';

export async function POST(request: Request) {
  const { username, password } = await request.json(); // Récupérer les données du formulaire

  // Vérifier si le nom d'utilisateur existe
  if (username !== user.username) {
    return NextResponse.json({ error: "Nom d'utilisateur incorrect" }, { status: 400 });
  }

  // Afficher le mot de passe entré par l'utilisateur
  console.log("Mot de passe entré par l'utilisateur:", password);

  // Hacher le mot de passe entré par l'utilisateur pour l'afficher
  const hashedPassword = await bcrypt.hash(password, 10);
  //console.log("Mot de passe haché (crypté) de l'utilisateur:", hashedPassword);

  // Comparer le mot de passe haché avec celui stocké dans user.ts
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 400 });
  }

  // Si le mot de passe est correct
  console.log('Mot de passe validé pour l\'utilisateur:', username);

  // Réponse de succès (connexion réussie)
  return NextResponse.json({ message: 'Connexion réussie' });
}
