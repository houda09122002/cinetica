import NextAuth from "next-auth"; // Import correct de NextAuth
import authOptions from "../../../lib/auth"; // Chemin vers ton fichier authOptions

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; // Expose les méthodes GET et POST

