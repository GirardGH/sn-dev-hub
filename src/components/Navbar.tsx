export function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 mb-6">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <span className="text-xl font-bold text-indigo-600">SN Dev Hub</span>
        <div className="space-x-4">
          <a href="/clients" className="text-sm text-gray-700 hover:text-indigo-600">
            Clients
          </a>
          {/* Placeholder pour futur logout/login */}
        </div>
      </div>
    </nav>
  );
}
