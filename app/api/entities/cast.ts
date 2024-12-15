export interface CastMember {
    adult: boolean; // Défaut : true
    gender: number; // Défaut : 0
    id: number; // Défaut : 0
    known_for_department: string; // Département pour lequel il/elle est connu(e)
    name: string; // Nom de l'acteur/l'actrice
    original_name: string; // Nom original
    popularity: number; // Popularité (nombre décimal), Défaut : 0
    profile_path: string | null; // Chemin de l'image du profil
    character: string; // Rôle du personnage joué
    credit_id: string; // ID de crédit
    order: number; // Ordre des crédits, Défaut : 0
  }