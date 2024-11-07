// app/layout.tsx

import { SidebarProvider } from "@/components/ui/sidebar"; // Assurez-vous que SidebarProvider est correctement importé
import { Button } from "@/components/ui/button"; // Importation des boutons Shadcn
import { Sidebar } from "@/components/ui/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-8 bg-gray-50">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar sur la gauche */}
            <div className="w-full md:w-64 bg-gray-800 text-white p-4">
              {/* Bouton Discover */}
              <Button variant="default" className="mb-6 w-full">
                Discover
              </Button>

              {/* Movie */}
              <h3 className="text-lg font-semibold mb-4">Movie</h3>
              <Button variant="outline" className="mb-2 w-full">
                Now Playing
              </Button>
              <Button variant="outline" className="mb-2 w-full">
                Popular
              </Button>
              <Button variant="outline" className="mb-2 w-full">
                Top Rated
              </Button>

              {/* TV Show */}
              <h3 className="text-lg font-semibold mt-6 mb-4">TV Show</h3>
              <Button variant="outline" className="mb-2 w-full">
                On The Air
              </Button>
              <Button variant="outline" className="mb-2 w-full">
                Popular
              </Button>
              <Button variant="outline" className="mb-2 w-full">
                Top Rated
              </Button>
            </div>

            {/* Contenu principal */}
            <div className="flex-1 bg-white p-6">
              <h2 className="text-2xl font-bold mb-6">En cours de développement...</h2>
              {children}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
