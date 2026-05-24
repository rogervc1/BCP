export default function EventCard({ event, onParticipate }) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] bg-white shadow-card ring-1 ring-slate-200/80 transition hover:shadow-soft">
      <div className="grid gap-0 md:grid-cols-[260px_1fr]">
        <div className="relative h-56 overflow-hidden md:h-full">
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-bcp-navy backdrop-blur">
            {event.category}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-bcp-navy text-base font-black text-white">
                  {event.organization.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-950">{event.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    {event.organization}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-fit rounded-2xl bg-bcp-orange px-4 py-2 text-sm font-black text-white shadow-card">
              +{event.points} pts
            </div>
          </div>

          <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
            Participa en esta iniciativa, registra tu evidencia y fortalece tu perfil de impacto
            con habilidades verificables.
          </p>

          <div className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
            <MetaItem label="Region" value={event.region} />
            <MetaItem label="Fecha" value={event.date} />
            <MetaItem label="Modalidad" value={event.modality} />
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => onParticipate(event)}
              className="rounded-2xl bg-bcp-navy px-5 py-3 text-sm font-black text-white shadow-card transition hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-bcp-sky focus:ring-offset-2 sm:flex-1"
            >
              Validar evidencia
            </button>
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-bcp-orange px-5 py-3 text-center text-sm font-black text-bcp-orange transition hover:bg-orange-50 sm:flex-1"
            >
              Inscribirme al evento
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function MetaItem({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 font-bold text-slate-700">{value}</p>
    </div>
  );
}
