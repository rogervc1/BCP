export default function EventCard({
  event,
  onParticipate,
  status = "default",
  onShare,
}) {
  const needsValidation = status === "needsValidation";
  const isInReview = status === "inReview";
  const isValidated = status === "validated";

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

            <div className="w-fit rounded-2xl bg-bcp-orange px-4 py-2 text-sm font-black text-white shadow-card">
              +{event.points} pts
            </div>
          </div>

          <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
            Participa en esta iniciativa, valida tu participacion y fortalece tu perfil de impacto
            con habilidades verificables.
          </p>

          <div className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
            <MetaItem label="Region" value={event.region} />
            <MetaItem label="Fecha" value={event.date} />
            <MetaItem label="Modalidad" value={event.modality} />
          </div>

          <EventActions
            event={event}
            needsValidation={needsValidation}
            isInReview={isInReview}
            isValidated={isValidated}
            onParticipate={onParticipate}
            onShare={onShare}
          />
        </div>
      </div>
    </article>
  );
}

function EventActions({
  event,
  needsValidation,
  isInReview,
  isValidated,
  onParticipate,
  onShare,
}) {
  if (isValidated) {
    return (
      <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
        <StatusTimeline activeStep={3} />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black text-emerald-700">Participacion validada</p>
            <p className="mt-1 text-xs font-bold text-emerald-700/75">
              Logro desbloqueado. Tus puntos ya fueron sumados.
            </p>
          </div>
          <button
            onClick={() => onShare?.(event)}
            className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-black text-emerald-700 shadow-sm transition hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
            aria-label={`Compartir logro de ${event.title}`}
          >
            Compartir
          </button>
        </div>
      </div>
    );
  }

  if (isInReview) {
    return (
      <div className="mt-5 rounded-2xl border border-bcp-sky/30 bg-sky-50 p-4">
        <StatusTimeline activeStep={2} />
        <p className="text-sm font-black text-bcp-navy">En proceso de revision</p>
        <p className="mt-1 text-xs font-bold text-slate-600">
          Ya recibimos tu constancia. El equipo la revisara antes de liberar tus puntos.
        </p>
      </div>
    );
  }

  if (needsValidation) {
    return (
      <div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50 p-4">
        <StatusTimeline activeStep={1} />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black text-bcp-orange">Validacion pendiente</p>
            <p className="mt-1 text-xs font-bold text-slate-600">
              Sube una constancia o foto para iniciar la revision de tu participacion.
            </p>
          </div>
          <button
            onClick={() => onParticipate?.(event)}
            className="rounded-2xl bg-bcp-orange px-5 py-3 text-sm font-black text-white shadow-card transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-bcp-orange focus:ring-offset-2"
          >
            Validar participacion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
      <button
        onClick={() => onParticipate?.(event)}
        className="rounded-2xl bg-bcp-navy px-5 py-3 text-sm font-black text-white shadow-card transition hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-bcp-sky focus:ring-offset-2 sm:flex-1"
      >
        Validar participacion
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
  );
}

function StatusTimeline({ activeStep }) {
  const steps = ["Pendiente", "En revision", "Validado"];

  return (
    <div className="mb-4">
      <div className="grid grid-cols-3">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === activeStep;
          const isDone = stepNumber < activeStep;
          const isComplete = isDone || isActive;

          return (
            <div key={step} className="relative flex flex-col items-center gap-2">
              {index > 0 && (
                <span
                  className={`absolute right-1/2 top-3 h-1 w-full -translate-y-1/2 ${
                    stepNumber <= activeStep ? "bg-bcp-sky" : "bg-slate-200"
                  }`}
                />
              )}
              <span
                className={`relative z-10 grid h-6 w-6 place-items-center rounded-full text-[10px] font-black ring-4 ring-white ${
                  isComplete ? "bg-bcp-navy text-white" : "bg-white text-slate-400"
                }`}
              >
                {isDone ? "OK" : stepNumber}
              </span>
              <span
                className={`text-center text-[11px] font-black uppercase tracking-wide ${
                  isActive
                    ? "text-bcp-navy"
                    : isDone
                      ? "text-bcp-sky"
                      : "text-slate-400"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
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
