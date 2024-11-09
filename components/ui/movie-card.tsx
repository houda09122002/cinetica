export function MovieCard() {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="aspect-[2/3] relative bg-gray-200">
        {/* Image du film/série */}
        <img
          src="placeholder.jpg"
          alt="Movie title"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">Titre du film</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">2024</span>
          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
            8.5 ★
          </span>
        </div>
      </div>
    </div>
  );
}
