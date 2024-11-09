import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { user } from '@/repository/user';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username !== user.username) {
    return NextResponse.json({ error: "Nom d'utilisateur incorrect" }, { status: 400 });
  }

 // console.log("Mot de passe entré:", password);
 // console.log("Hash stocké dans user.ts:", user.password);
  
  try {
    const modifiedHash = user.password.replace('$2y$', '$2b$');
    console.log("Hash modifié:", modifiedHash);
    
    const match = await bcrypt.compare(password, modifiedHash);
    console.log("Résultat de la comparaison:", match);

    if (!match) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 400 });
    }

    return NextResponse.json({ message: 'Connexion réussie' });
    
  } catch (error) {
    console.error("Erreur lors de la comparaison:", error);
    return NextResponse.json({ error: "Erreur lors de la vérification du mot de passe" }, { status: 500 });
  }
}
