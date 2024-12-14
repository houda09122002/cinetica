import React from "react";

declare namespace JSX {
  interface IntrinsicElements {
    div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    // Ajoutez d'autres éléments HTML ici si nécessaire
  }
}
