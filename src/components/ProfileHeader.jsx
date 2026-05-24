export default function ProfileHeader({ user }) {
  return (
    <section className="overflow-hidden rounded-[1.75rem] bg-white shadow-card ring-1 ring-slate-200/80">
      <div className="h-28 bg-[linear-gradient(135deg,#002A8D_0%,#0050C8_48%,#00B3FF_100%)] sm:h-36" />

      <div className="px-4 pb-5 sm:px-6">
        <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-card sm:h-28 sm:w-28"
            />
            <div className="pb-2">
              <h1 className="text-2xl font-black text-slate-950 sm:text-3xl">{user.name}</h1>
              <p className="mt-1 max-w-xl text-sm font-semibold text-slate-600">
                {user.headline}
              </p>
            </div>
          </div>

          <label className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-bcp-navy/15 bg-bcp-navy px-5 py-3 text-sm font-black text-white shadow-card transition hover:bg-blue-900">
            <input type="file" accept=".pdf,.doc,.docx" className="sr-only" />
            Subir CV
          </label>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {user.stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-slate-50 p-4">
              <p className="text-2xl font-black text-bcp-navy">{stat.value}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-2xl bg-orange-50 p-4">
            <p className="text-sm font-black text-bcp-orange">Nivel de perfil</p>
            <p className="mt-1 text-lg font-black text-slate-950">{user.level}</p>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
              <div className="h-full rounded-full bg-bcp-orange" style={{ width: `${user.nextLevelProgress}%` }} />
            </div>
            <p className="mt-2 text-xs font-bold text-slate-500">
              {user.nextLevelProgress}% para el siguiente nivel
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-black uppercase tracking-wide text-slate-400">
              Habilidades desarrolladas
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-white px-3 py-2 text-xs font-black text-bcp-navy shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
            <button
              disabled
              className="mt-4 w-full cursor-not-allowed rounded-2xl bg-slate-200 px-4 py-3 text-sm font-black text-slate-400 sm:w-auto"
            >
              Conectar con otros voluntarios (Proximamente)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
