export default function GamifiedMetricsBoard({
  horas = 0,
  eventosValidados = 0,
  puntos = 0,
  categorias = [],
}) {
  return (
    <div className="grid max-w-full grid-cols-4 gap-3 sm:flex sm:flex-wrap sm:justify-end sm:gap-4">
      <TimeInvestedBadge horas={horas} />
      <StreakBadge eventosValidados={eventosValidados} />
      <PointsBadge puntos={puntos} />
      <CategoricalBadges categorias={categorias} />
    </div>
  );
}

function TimeInvestedBadge({ horas }) {
  const tier = getHoursTier(horas);

  return (
    <AchievementShell
      value={`${horas}h`}
      tooltip={`${tier.title}. ${tier.tooltip}`}
      className={`${tier.bg} ${tier.ring} ${tier.locked ? "opacity-70 grayscale" : ""}`}
      labelClassName={tier.label}
      shape="circle"
    >
        <MedalIcon tier={tier.key} />
    </AchievementShell>
  );
}

function StreakBadge({ eventosValidados }) {
  const streak = getStreakTier(eventosValidados);

  return (
    <AchievementShell
      value={eventosValidados}
      tooltip={`Racha de Impacto. ${streak.tooltip}`}
      className={`${streak.bg} ${streak.ring}`}
      labelClassName={streak.label}
      shape="hex"
    >
        <FireIcon intensity={streak.intensity} />
    </AchievementShell>
  );
}

function PointsBadge({ puntos }) {
  return (
    <AchievementShell
      value={formatPoints(puntos)}
      tooltip={`Puntos BCP. Acumulaste ${puntos.toLocaleString("es-PE")} puntos por participaciones.`}
      className="from-bcp-navy/25 via-bcp-sky/20 to-white/20 ring-bcp-sky/40"
      labelClassName="bg-bcp-navy text-white ring-bcp-sky/40"
      shape="circle"
    >
        <TrophyIcon />
    </AchievementShell>
  );
}

function CategoricalBadges({ categorias }) {
  const badges = [
    /* {
      match: "Medio Ambiente",
      title: "Guardian Verde",
      tooltip: "Obtenido por participar en iniciativas de medio ambiente.",
      className: "from-emerald-400/25 via-bcp-sky/15 to-white/20 ring-emerald-200/70",
      labelClassName: "bg-bcp-navy text-white ring-emerald-200/70",
      icon: <LeafIcon />,
      value: "Eco",
    },
    {
      match: "Liderazgo",
      title: "Voz del Barrio",
      tooltip: "Obtenido por demostrar liderazgo y comunicacion comunitaria.",
      className: "from-bcp-navy/30 via-bcp-sky/20 to-white/20 ring-bcp-sky/50",
      labelClassName: "bg-bcp-navy text-white ring-bcp-sky/50",
      icon: <MegaphoneIcon />,
      value: "Voz",
    },
    {
      match: "Social",
      title: "Mentor Comunitario",
      tooltip: "Obtenido por apoyar causas sociales y acompanamiento comunitario.",
      className: "from-bcp-orange/30 via-white/20 to-bcp-sky/15 ring-orange-200/80",
      labelClassName: "bg-bcp-orange text-white ring-orange-100",
      icon: <HandsIcon />,
      value: "Soc",
    }, */
  ];

  return badges
    .filter((badge) => categorias.includes(badge.match))
    .map((badge) => (
      <AchievementShell
        key={badge.title}
        value={badge.value}
        tooltip={`${badge.title}. ${badge.tooltip}`}
        className={badge.className}
        labelClassName={badge.labelClassName}
        shape="hex"
      >
          {badge.icon}
      </AchievementShell>
    ));
}

function AchievementShell({
  value,
  tooltip,
  className,
  labelClassName = "bg-bcp-navy text-white ring-bcp-sky/40",
  shape = "circle",
  children,
}) {
  const shapeClass =
    shape === "hex"
      ? "[clip-path:polygon(25%_4%,75%_4%,100%_50%,75%_96%,25%_96%,0_50%)]"
      : "rounded-full";

  return (
    <Tooltip text={tooltip}>
      <button
        type="button"
        className="group/badge relative grid w-16 place-items-center pb-3 focus:outline-none sm:w-20"
        aria-label={tooltip}
      >
        <span
          className={`grid h-14 w-14 place-items-center bg-gradient-to-br shadow-[0_14px_28px_rgba(0,42,141,0.24),inset_0_2px_10px_rgba(255,255,255,0.34)] ring-2 backdrop-blur-md transition group-hover/badge:-translate-y-1 group-hover/badge:scale-105 sm:h-16 sm:w-16 ${shapeClass} ${className}`}
        >
          {children}
        </span>
        <span
          className={`absolute bottom-0 rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide shadow-card ring-2 ${labelClassName}`}
        >
          {value}
        </span>
      </button>
    </Tooltip>
  );
}

function Tooltip({ text, children }) {
  return (
    <div className="group relative">
      {children}
      <div className="pointer-events-none absolute right-0 top-full z-50 mt-2 w-56 translate-y-1 rounded-2xl bg-slate-950 px-3 py-2 text-xs font-semibold leading-5 text-white opacity-0 shadow-soft transition group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
        {text}
      </div>
    </div>
  );
}

function formatPoints(puntos) {
  if (puntos >= 1000) {
    return `${(puntos / 1000).toFixed(1).replace(".0", "")}k`;
  }

  return puntos;
}

function getHoursTier(horas) {
  if (horas >= 50) {
    return {
      key: "gold",
      title: "Heroe Local",
      tooltip: "Obtenido por completar 50 horas de servicio a la comunidad.",
      bg: "from-amber-100 via-yellow-50 to-white",
      ring: "ring-amber-200",
      text: "text-amber-700",
      label: "bg-bcp-orange text-white ring-orange-100",
    };
  }

  if (horas >= 30) {
    return {
      key: "silver",
      title: "Agente de Cambio",
      tooltip: "Obtenido por completar 30 horas de servicio a la comunidad.",
      bg: "from-bcp-sky/25 via-white/20 to-bcp-navy/20",
      ring: "ring-bcp-sky/40",
      text: "text-slate-700",
      label: "bg-bcp-navy text-white ring-bcp-sky/40",
    };
  }

  if (horas >= 10) {
    return {
      key: "bronze",
      title: "Iniciador Civico",
      tooltip: "Obtenido por completar 10 horas de servicio a la comunidad.",
      bg: "from-bcp-orange/30 via-white/20 to-bcp-sky/15",
      ring: "ring-orange-200/80",
      text: "text-bcp-orange",
      label: "bg-bcp-orange text-white ring-orange-100",
    };
  }

  return {
    key: "locked",
    title: "Insignia bloqueada",
    tooltip: "Completa 10 horas de servicio para desbloquear Iniciador Civico.",
    bg: "from-bcp-navy/15 to-white/20",
    ring: "ring-bcp-sky/30",
    text: "text-slate-500",
    label: "bg-bcp-navy/80 text-white ring-bcp-sky/30",
    locked: true,
  };
}

function getStreakTier(eventosValidados) {
  if (eventosValidados >= 15) {
    return {
      intensity: "max",
      tooltip: "Racha legendaria: 15 o mas eventos validados.",
      bg: "from-bcp-orange/40 via-white/20 to-bcp-navy/20",
      ring: "ring-orange-200",
      text: "text-red-700",
      label: "bg-bcp-orange text-white ring-orange-100",
    };
  }

  if (eventosValidados >= 10) {
    return {
      intensity: "high",
      tooltip: "Racha avanzada: 10 eventos validados.",
      bg: "from-bcp-orange/35 via-white/20 to-bcp-sky/15",
      ring: "ring-orange-200/80",
      text: "text-bcp-orange",
      label: "bg-bcp-orange text-white ring-orange-100",
    };
  }

  if (eventosValidados >= 5) {
    return {
      intensity: "mid",
      tooltip: "Racha activa: 5 eventos validados o mas.",
      bg: "from-bcp-orange/25 via-white/20 to-bcp-sky/20",
      ring: "ring-orange-100",
      text: "text-bcp-orange",
      label: "bg-bcp-orange text-white ring-orange-100",
    };
  }

  return {
    intensity: "low",
    tooltip: "Valida 5 eventos para encender tu racha de impacto.",
    bg: "from-bcp-navy/15 to-white/20",
    ring: "ring-bcp-sky/30",
    text: "text-slate-600",
    label: "bg-bcp-navy/80 text-white ring-bcp-sky/30",
  };
}

function MedalIcon({ tier }) {
  const fill = {
    locked: ["#CBD5E1", "#F8FAFC"],
    bronze: ["#C76A2B", "#FFF7ED"],
    silver: ["#94A3B8", "#F8FAFC"],
    gold: ["#F59E0B", "#FEF3C7"],
  }[tier];

  return (
    <svg className="h-10 w-10 shrink-0 drop-shadow-md sm:h-11 sm:w-11" viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id={`medal-${tier}`} x1="10" x2="38" y1="8" y2="42">
          <stop stopColor={fill[0]} />
          <stop offset="1" stopColor={fill[1]} />
        </linearGradient>
      </defs>
      <path d="M16 4h6l2 9h-8L16 4Zm10 0h6l-1 9h-7l2-9Z" fill="#002A8D" />
      <circle cx="24" cy="28" r="14" fill={`url(#medal-${tier})`} stroke="white" strokeWidth="3" />
      <path d="M24 18l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z" fill="rgba(255,255,255,0.75)" />
    </svg>
  );
}

function FireIcon({ intensity }) {
  const color = intensity === "max" ? "#DC2626" : intensity === "low" ? "#94A3B8" : "#FF7800";

  return (
    <svg className="h-10 w-10 shrink-0 drop-shadow-md sm:h-11 sm:w-11" viewBox="0 0 48 48" aria-hidden="true">
      <path
        d="M25 4c2 8 10 10 10 22 0 10-7 17-16 17C11 43 5 37 5 29c0-7 4-13 10-17-1 6 2 9 5 11 4-5 2-12 5-19Z"
        fill={color}
      />
      <path
        d="M24 25c2 4 6 5 6 10 0 4-3 8-8 8s-8-3-8-8c0-4 2-7 6-10 0 4 2 6 4 7 1-2 0-4 0-7Z"
        fill="#FEF3C7"
      />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg className="h-10 w-10 shrink-0 drop-shadow-md sm:h-11 sm:w-11" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M14 8h20v10c0 8-4 14-10 14s-10-6-10-14V8Z" fill="#FF7800" />
      <path d="M12 12H6c0 8 4 13 10 14M36 12h6c0 8-4 13-10 14" fill="none" stroke="#002A8D" strokeWidth="4" />
      <path d="M20 32h8v7h7v5H13v-5h7v-7Z" fill="#002A8D" />
      <path d="M24 13l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1 2-4Z" fill="#FFF7ED" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg className="h-10 w-10 shrink-0 rounded-full bg-white/25 p-2 shadow-sm backdrop-blur-sm" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 4C10 4 5 8 5 15c0 3 2 5 5 5 7 0 10-8 10-16Z" fill="#059669" />
      <path d="M5 20c3-6 7-9 13-12" stroke="#ECFDF5" strokeWidth="2" fill="none" />
    </svg>
  );
}

function MegaphoneIcon() {
  return (
    <svg className="h-10 w-10 shrink-0 rounded-full bg-white/25 p-2 shadow-sm backdrop-blur-sm" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 10v5h4l8 4V6l-8 4H4Z" fill="#002A8D" />
      <path d="M18 9c2 1 2 5 0 6" stroke="#00B3FF" strokeWidth="2" fill="none" />
    </svg>
  );
}

function HandsIcon() {
  return (
    <svg className="h-10 w-10 shrink-0 rounded-full bg-white/25 p-2 shadow-sm backdrop-blur-sm" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 12h4l2 2 4-4 3 3-7 7-6-3H3v-5h4Z" fill="#FF7800" />
      <path d="M6 9l4-4 4 4-4 4-4-4Z" fill="#F97316" opacity="0.65" />
    </svg>
  );
}
