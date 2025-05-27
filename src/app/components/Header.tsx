import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold tracking-tight">Sistema de Alertas</h1>
          </div>

          <nav className="space-x-6 hidden md:flex">
            <Link href="#sos" className="hover:text-yellow-300 transition-colors">
              SOS
            </Link>
            <Link href="#popup" className="hover:text-yellow-300 transition-colors">
              Popup
            </Link>
            <Link href="#integrantes" className="hover:text-yellow-300 transition-colors">
              Integrantes
            </Link>
          </nav>

        </div>
      </div>
    </header>
  );
}
