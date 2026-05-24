export default function UserProfile({ user }) {
  return (
    <section className="rounded-[2rem] bg-white p-5 shadow-soft ring-1 ring-slate-200/70">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="h-16 w-16 rounded-2xl object-cover shadow-card"
        />
        <div>
          <h2 className="text-xl font-black text-slate-950">{user.name}</h2>
          <p className="text-sm font-bold text-bcp-navy">{user.role}</p>
        </div>
      </div>

      <div className="mt-5 rounded-[1.5rem] bg-bcp-navy p-5 text-white">
        <p className="text-sm font-bold text-blue-100">Nivel de perfil</p>
        <h3 className="mt-1 text-2xl font-black">{user.level}</h3>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/15">
          <div className="h-full rounded-full bg-bcp-orange" style={{ width: `${user.nextLevelProgress}%` }} />
        </div>
        <p className="mt-2 text-xs font-bold text-blue-100">
          {user.nextLevelProgress}% para el siguiente nivel
        </p>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {user.stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-slate-50 p-3 text-center">
            <p className="text-lg font-black text-bcp-navy">{stat.value}</p>
            <p className="mt-1 text-[11px] font-bold leading-4 text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-black uppercase tracking-wide text-slate-400">
          Historial de eventos
        </h3>
        <div className="mt-3 space-y-2">
          {user.history.map((item) => (
            <div key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-black uppercase tracking-wide text-slate-400">
          Habilidades desarrolladas
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {user.skills.map((skill) => (
            <span key={skill} className="rounded-full bg-orange-50 px-3 py-2 text-xs font-black text-bcp-orange">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <button
        disabled
        className="mt-6 w-full cursor-not-allowed rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-400"
      >
        Conectar con otros voluntarios (Próximamente)
      </button>
    </section>
  );
}
