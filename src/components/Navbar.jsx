export default function Navbar({ user, activeView, onNavigate }) {
  const navItems = [
    { id: "events", label: "Inicio" },
    { id: "profile", label: "Perfil" },
    { id: "rewards", label: "Recompensas" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <button
          className="flex items-center gap-2 rounded-2xl text-left focus:outline-none focus:ring-2 focus:ring-bcp-sky"
          onClick={() => onNavigate("events")}
          aria-label="Ir al inicio"
        >
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-bcp-navy text-lg font-black text-white shadow-soft">
            B
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-black leading-4 text-bcp-navy">BCP</span>
            <span className="block text-xs font-semibold text-slate-500">Voluntariado</span>
          </span>
        </button>

        <div className="hidden rounded-full bg-slate-100 p-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                activeView === item.id
                  ? "bg-bcp-navy text-white shadow-card"
                  : "text-slate-600 hover:text-bcp-navy"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded-full bg-orange-50 px-3 py-2 text-sm font-black text-bcp-orange ring-1 ring-orange-100 sm:px-4">
            {user.points.toLocaleString("es-PE")} pts
          </div>
          <div className="hidden text-right lg:block">
            <p className="text-sm font-black leading-4 text-slate-950">{user.name}</p>
            <p className="text-xs font-bold text-slate-500">{user.level}</p>
          </div>
          <button
            onClick={() => onNavigate("profile")}
            className="rounded-full focus:outline-none focus:ring-2 focus:ring-bcp-sky"
            aria-label="Ir al perfil"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="h-11 w-11 rounded-full border-2 border-white object-cover shadow-card"
            />
          </button>
        </div>
      </nav>

      <div className="mx-auto flex max-w-7xl gap-2 px-4 pb-3 md:hidden">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex-1 rounded-2xl px-3 py-2 text-sm font-bold ${
              activeView === item.id ? "bg-bcp-navy text-white" : "bg-white text-slate-600"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}
