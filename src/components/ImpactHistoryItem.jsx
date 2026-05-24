const statusConfig = {
  needsValidation: {
    activeStep: 1,
    label: "Validacion pendiente",
    description: "Sube una constancia o foto para iniciar la revision.",
    panel: "border-orange-100 bg-gradient-to-br from-orange-50 to-white",
    text: "text-bcp-orange",
  },
  inReview: {
    activeStep: 2,
    label: "En proceso de revision",
    description: "Ya recibimos tu constancia. Te avisaremos cuando este lista.",
    panel: "border-sky-100 bg-gradient-to-br from-sky-50 to-white",
    text: "text-bcp-navy",
  },
  validated: {
    activeStep: 3,
    label: "Participacion validada",
    description: "Logro desbloqueado. Tus puntos ya fueron sumados.",
    panel: "border-emerald-100 bg-gradient-to-br from-emerald-50 to-white",
    text: "text-emerald-700",
  },
};

export default function ImpactHistoryItem({ event, status, onValidate, onShare }) {
  const config = statusConfig[status] ?? statusConfig.needsValidation;
  const isValidated = status === "validated";
  const needsValidation = status === "needsValidation";

  return (
    <article
      className={`relative overflow-hidden rounded-[2rem] border p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft sm:p-6 ${config.panel}`}
    >
      {/* Puntos en la esquina superior derecha */}
      {isValidated && (
        <div className="absolute right-5 top-5 z-20">
          <span className="rounded-full bg-white px-3.5 py-2 text-sm font-black text-emerald-700 ring-1 ring-emerald-100 shadow-sm">
            +{event.points} pts
          </span>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Lado Izquierdo: Información del Evento */}
        <div className="flex flex-col justify-between min-w-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 pr-24 lg:pr-0">
              <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-black text-bcp-navy ring-1 ring-slate-200/70">
                {event.category}
              </span>
              <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-slate-500 ring-1 ring-slate-200/70">
                {event.date}
              </span>
            </div>

            <h3 className="mt-4 text-xl font-black text-slate-950 sm:text-2xl">{event.title}</h3>
            <p className="mt-1.5 text-sm font-semibold text-slate-500">
              {event.organization} · {event.location}
            </p>
          </div>

          <div className="mt-6">
            <p className={`text-sm font-black ${config.text}`}>{config.label}</p>
            <p className="mt-1 text-xs font-semibold text-slate-500">{config.description}</p>
          </div>
        </div>

        {/* Lado Derecho: Timeline y Botones (Alineados con los puntos) */}
        <div className="flex flex-col justify-between gap-6 pt-12 lg:pt-14">
          <StatusTimeline activeStep={config.activeStep} />

          <div className="flex justify-end">            {needsValidation && (
              <button
                onClick={() => onValidate?.(event)}
                className="w-full rounded-full bg-bcp-orange px-6 py-2.5 text-sm font-black text-white shadow-card transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-bcp-orange focus:ring-offset-2 sm:w-auto"
              >
                Validar participación
              </button>
            )}
            {isValidated && (
              <button
                onClick={() => onShare?.(event)}
                className="w-full rounded-full bg-bcp-navy px-6 py-2.5 text-sm font-black text-white shadow-card transition hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-bcp-sky focus:ring-offset-2 sm:w-auto"
              >
                Compartir
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
function StatusTimeline({ activeStep }) {
  const steps = ["Pendiente", "Revision", "Validado"];

  return (
    <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-white/80">
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
                    stepNumber <= activeStep
                      ? "bg-gradient-to-r from-bcp-sky to-bcp-navy"
                      : "bg-slate-200"
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
                className={`text-center text-[10px] font-black uppercase tracking-wide ${
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
