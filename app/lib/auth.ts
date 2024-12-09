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

        const foundUser = users.find(
          (user) => user.username === credentials.username
        );

        console.log("Utilisateur trouvé :", foundUser);

        if (!foundUser) {
          console.error("Utilisateur introuvable :", credentials.username);
          return null;
        }

        const hashToCompare = foundUser.password.startsWith("$2y$")
          ? foundUser.password.replace("$2y$", "$2b$")
          : foundUser.password;

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          hashToCompare
        );

        console.log(
          "Résultat de la vérification du mot de passe :",
          isPasswordValid
        );

        if (isPasswordValid) {
          console.log("Authentification réussie pour :", foundUser.username);

          return {
            id: foundUser.id.toString(),
            name: foundUser.username,
            apiKey: process.env.TMDB_API_KEY || foundUser.apiKey,
          };
        } else {
          console.error("Mot de passe incorrect pour :", foundUser.username);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      console.log("JWT callback - Avant enrichissement :", token, user);

      if (user) {
        token.id = user.id;
        token.apiKey = user.apiKey;
      } else {
        // Réinitialiser les données utilisateur après la déconnexion
        token.id = null;
        token.apiKey = null;
      }

      console.log("JWT callback - Après enrichissement :", token);
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("Session callback - Avant enrichissement :", session);

      if (token.id) {
        session.user = {
          ...session.user,
          id: token.id,
          apiKey: token.apiKey,
        };
      } else {
        session.user = null; // Réinitialiser la session
      }

      console.log("Session callback - Après enrichissement :", session);
      return session;
    },
  },
  events: {
    async signOut({ session }) {
      console.log("Déconnexion réussie pour :", session?.user?.name);
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "secret", // Vérifiez que cette variable est bien définie
};

export default authOptions;
