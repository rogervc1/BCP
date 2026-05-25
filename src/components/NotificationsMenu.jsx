import { useMemo, useState } from "react";

export default function NotificationsMenu({ user, events = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = useMemo(() => buildNotifications(user, events), [user, events]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((current) => !current)}
        className="relative grid h-10 w-10 place-items-center rounded-full bg-white/80 text-bcp-navy shadow-card ring-1 ring-sky-100 transition hover:-translate-y-0.5 hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-bcp-sky sm:h-11 sm:w-11"
        aria-label="Ver notificaciones"
        aria-expanded={isOpen}
      >
        <BellIcon />
        {notifications.length > 0 && (
          <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-bcp-orange px-1 text-[10px] font-black text-white ring-2 ring-white">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/95 shadow-soft backdrop-blur-xl">
          <div className="bg-gradient-to-r from-bcp-navy to-bcp-sky px-4 py-3 text-white">
            <p className="text-sm font-black">Notificaciones</p>
            <p className="mt-0.5 text-xs font-semibold text-blue-100">
              Oportunidades elegidas para tu perfil civico.
            </p>
          </div>

          <div className="max-h-96 space-y-2 overflow-y-auto p-3">
            {notifications.map((item) => (
              <button
                key={item.id}
                onClick={() => setIsOpen(false)}
                className="w-full rounded-2xl bg-gradient-to-br from-slate-50 to-white p-3 text-left ring-1 ring-slate-100 transition hover:bg-sky-50 hover:ring-sky-100"
              >
                <div className="flex gap-3">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${item.iconBg}`}>
                    {item.icon}
                  </span>
                  <span>
                    <span className="block text-sm font-black text-slate-950">{item.title}</span>
                    <span className="mt-1 block text-xs font-semibold leading-5 text-slate-500">
                      {item.message}
                    </span>
                    <span className="mt-2 inline-flex rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-black text-bcp-orange">
                      {item.cta}
                    </span>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function buildNotifications(user, events) {
  const interests = inferInterests(user);
  const recommended = events
    .filter((event) => interests.includes(event.category) || event.region === "Puno")
    .slice(0, 2);
  const urgent = events.find((event) => event.dateGroup === "Esta semana") ?? events[0];
  const notifications = [];

  if (urgent) {
    notifications.push({
      id: `urgent-${urgent.id}`,
      title: "Queda 1 dia para un evento",
      message: `${urgent.title} esta por iniciar. Registrate para asegurar tu cupo.`,
      cta: "Registrate ya",
      icon: <ClockIcon />,
      iconBg: "bg-orange-50 text-bcp-orange",
    });
  }

  recommended.forEach((event) => {
    notifications.push({
      id: `recommended-${event.id}`,
      title: "Nuevo evento para ti",
      message: `${event.title} coincide con tus intereses en ${event.category}.`,
      cta: "Ver oportunidad",
      icon: event.category === "Medio Ambiente" ? <LeafIcon /> : <SparkIcon />,
      iconBg: event.category === "Medio Ambiente" ? "bg-emerald-50 text-emerald-700" : "bg-sky-50 text-bcp-navy",
    });
  });

  notifications.push({
    id: "profile-next-step",
    title: "Impulsa tu perfil civico",
    message: "Valida una participacion pendiente para acercarte a tu siguiente insignia.",
    cta: "Validar participacion",
    icon: <BadgeIcon />,
    iconBg: "bg-sky-50 text-bcp-navy",
  });

  return notifications.slice(0, 4);
}

function inferInterests(user) {
  const text = `${user.headline} ${user.skills.join(" ")}`.toLowerCase();
  const interests = new Set(["Medio Ambiente"]);

  if (text.includes("social") || text.includes("liderazgo")) {
    interests.add("Comunidad");
  }

  if (text.includes("formacion") || text.includes("comunicacion")) {
    interests.add("Educacion");
  }

  return [...interests];
}

function BellIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 10a6 6 0 1 0-12 0c0 7-3 7-3 8h18c0-1-3-1-3-8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 21h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 4C10 4 5 8 5 15c0 3 2 5 5 5 7 0 10-8 10-16Z" fill="currentColor" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l2.5 6L21 12l-6.5 3L12 21l-2.5-6L3 12l6.5-3L12 3Z" fill="currentColor" />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l3 6 6 1-4.5 4.5 1 6L12 17l-5.5 3.5 1-6L3 10l6-1 3-6Z" fill="currentColor" />
    </svg>
  );
}
