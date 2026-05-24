import { useMemo, useState } from "react";
import ImpactHistoryItem from "./ImpactHistoryItem";

export default function ImpactProfile({ events, impactHistory, onUploadEvidence }) {
  const [shareEvent, setShareEvent] = useState(null);
  const [filter, setFilter] = useState("all");

  const historyEvents = useMemo(
    () =>
      impactHistory
        .map((item) => {
          const event = events.find((candidate) => candidate.id === item.eventId);
          return event ? { ...event, impactStatus: item.status } : null;
        })
        .filter(Boolean),
    [events, impactHistory],
  );

  const filteredEvents = useMemo(() => {
    if (filter === "all") return historyEvents;
    return historyEvents.filter((event) => event.impactStatus === filter);
  }, [historyEvents, filter]);

  const validatedCount = historyEvents.filter((event) => event.impactStatus === "validated").length;
  const reviewCount = historyEvents.filter((event) => event.impactStatus === "inReview").length;
  const pendingCount = historyEvents.filter(
    (event) => event.impactStatus === "needsValidation",
  ).length;

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 p-5 shadow-soft backdrop-blur-xl sm:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <p className="text-sm font-black uppercase tracking-wide text-bcp-orange">
                Historial cívico
              </p>
              {filter !== "all" && (
                <button
                  onClick={() => setFilter("all")}
                  className="rounded-full bg-slate-200 px-3 py-1 text-[10px] font-black uppercase text-slate-600 transition hover:bg-slate-300"
                >
                  Ver todos ×
                </button>
              )}
            </div>
            <h2 className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">
              Logros y participaciones
            </h2>
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-500">
              Usa los indicadores para filtrar tus eventos por su estado de validación.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:min-w-[400px]">
            <SummaryPill
              label="Pendientes"
              value={pendingCount}
              tone="orange"
              active={filter === "needsValidation"}
              onClick={() => setFilter(filter === "needsValidation" ? "all" : "needsValidation")}
            />
            <SummaryPill
              label="En revisión"
              value={reviewCount}
              tone="sky"
              active={filter === "inReview"}
              onClick={() => setFilter(filter === "inReview" ? "all" : "inReview")}
            />
            <SummaryPill
              label="Validadas"
              value={validatedCount}
              tone="green"
              active={filter === "validated"}
              onClick={() => setFilter(filter === "validated" ? "all" : "validated")}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <ImpactHistoryItem
              key={`${event.id}-${event.impactStatus}`}
              event={event}
              status={event.impactStatus}
              onValidate={onUploadEvidence}
              onShare={setShareEvent}
            />
          ))
        ) : (
          <div className="rounded-[2rem] bg-white/50 py-12 text-center ring-1 ring-slate-200/50">
            <p className="text-sm font-bold text-slate-400">No hay eventos en esta categoría</p>
            <button
              onClick={() => setFilter("all")}
              className="mt-3 text-sm font-black text-bcp-navy underline underline-offset-4"
            >
              Mostrar todo el historial
            </button>
          </div>
        )}
      </section>

      {shareEvent && <ShareSheet event={shareEvent} onClose={() => setShareEvent(null)} />}
    </div>
  );
}

function SummaryPill({ label, value, tone, active, onClick }) {
  const tones = {
    orange: {
      active: "bg-orange-500 text-white ring-orange-600 shadow-card",
      inactive: "from-orange-50 to-white text-bcp-orange ring-orange-100 hover:bg-orange-100",
    },
    sky: {
      active: "bg-bcp-navy text-white ring-blue-900 shadow-card",
      inactive: "from-sky-50 to-white text-bcp-navy ring-sky-100 hover:bg-sky-100",
    },
    green: {
      active: "bg-emerald-600 text-white ring-emerald-700 shadow-card",
      inactive: "from-emerald-50 to-white text-emerald-700 ring-emerald-100 hover:bg-emerald-100",
    },
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border-none transition-all p-3 text-center ring-1 focus:outline-none ${
        active ? tones[tone].active : `bg-gradient-to-br ${tones[tone].inactive}`
      }`}
    >
      <p className="text-xl font-black">{value}</p>
      <p className="mt-1 text-[11px] font-black uppercase tracking-wide">{label}</p>
    </button>
  );
}

function ShareSheet({ event, onClose }) {
  const linkedInPost = `Hoy sume ${event.points} puntos de impacto participando en "${event.title}" con ${event.organization}. Esta experiencia fortalecio mi liderazgo social y compromiso civico.`;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-slate-950/55 backdrop-blur-sm">
      <button className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Cerrar" />
      <section className="relative w-full rounded-t-[2rem] bg-white p-6 shadow-soft sm:mx-auto sm:mb-6 sm:max-w-xl sm:rounded-[2rem]">
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-slate-200" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-bcp-orange">
              Compartir logro
            </p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">{event.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-xl font-bold text-slate-500 hover:bg-slate-200"
            aria-label="Cerrar menu de compartir"
          >
            x
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-700 hover:bg-slate-50">
            Instagram
          </button>
          <button className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-700 hover:bg-slate-50">
            Facebook
          </button>
        </div>

        <button className="mt-3 w-full rounded-2xl bg-bcp-navy px-5 py-4 text-sm font-black text-white shadow-card transition hover:bg-blue-900">
          Compartir en LinkedIn
        </button>

        <div className="mt-4 rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-wide text-slate-400">
            Post automatico simulado
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{linkedInPost}</p>
        </div>
      </section>
    </div>
  );
}
