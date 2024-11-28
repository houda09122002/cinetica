import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt"; // Typage pour le token
import { Session } from "next-auth"; // Typage pour la session
import { users } from "@/repository/user"; // Chemin vers les utilisateurs simulés
import bcrypt from "bcrypt";

// Définir un type pour l'utilisateur
interface User {
  id: string;
  name: string;
  apiKey: string;
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials): Promise<User | null> {
        console.log("Tentative d'authentification avec :", credentials);

        if (!credentials || !credentials.username || !credentials.password) {
          console.error("Identifiants incomplets :", credentials);
          return null;
        }

        // Recherche de l'utilisateur dans la base simulée
        const foundUser = users.find(user => user.username === credentials.username);
        console.log("Utilisateur trouvé :", foundUser);

        if (!foundUser) {
          console.error("Utilisateur introuvable :", credentials.username);
          return null;
        }

        console.log("Mot de passe saisi :", credentials.password);
        console.log("Mot de passe hashé dans la base :", foundUser.password);

        // Convertir `$2y$` en `$2b$` si nécessaire
        const hashToCompare = foundUser.password.startsWith("$2y$")
          ? foundUser.password.replace("$2y$", "$2b$")
          : foundUser.password;

        console.log("Hash à comparer (après conversion) :", hashToCompare);

        // Vérification du mot de passe
        const isPasswordValid = await bcrypt.compare(credentials.password, hashToCompare);
        console.log("Résultat de la vérification du mot de passe :", isPasswordValid);

        if (isPasswordValid) {
          console.log("Authentification réussie pour :", foundUser.username);

          // Renvoyer la clé API TMDB (depuis un fichier .env ou une autre source)
          return {
            id: foundUser.id.toString(),
            name: foundUser.username,
            apiKey: process.env.TMDB_API_KEY || foundUser.apiKey, // Clé API TMDB
          };
        } else {
          console.error("Mot de passe incorrect pour :", foundUser.username);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // Page de connexion
    error: "/login", // Désactiver la redirection en cas d'erreur
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      console.log("JWT callback - Avant enrichissement :", token, user);
      if (user) {
        token.id = user.id;
        token.apiKey = user.apiKey; // Ajouter la clé API TMDB au token
      }
      console.log("JWT callback - Après enrichissement :", token);
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("Session callback - Avant enrichissement :", session);
      session.user = {
        ...session.user,
        id: token.id,
        apiKey: token.apiKey, // Ajouter la clé API TMDB à la session
      };
      console.log("Session callback - Après enrichissement :", session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "secret", // Assure-toi de définir NEXTAUTH_SECRET dans un fichier .env
};

export default authOptions;
