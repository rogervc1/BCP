import { MEDALS } from "../data/mockData";
import GamifiedMetricsBoard from "./GamifiedMetricsBoard";

export default function ProfileHeader({ user, categorias = [] }) {
  const volunteerHours = user.stats.find(s => s.label === "Horas voluntarias")?.numericValue || 0;
  
  // Encontrar la medalla actual
  const currentMedal = [...MEDALS].reverse().find(m => volunteerHours >= m.minHours) || MEDALS[0];
  
  // Calcular progreso al siguiente nivel
  let progress = 100;
  let remainingHours = 0;
  if (currentMedal.nextMedal) {
    const range = currentMedal.targetHours - currentMedal.minHours;
    const currentInRange = volunteerHours - currentMedal.minHours;
    progress = Math.min(Math.round((currentInRange / range) * 100), 100);
    remainingHours = currentMedal.targetHours - volunteerHours;
  }

  const horas = volunteerHours;
  const eventosValidados = Number.parseInt(user.stats[1]?.value, 10) || 0;
  const puntos = Number.parseInt(String(user.stats[2]?.value).replace(/\D/g, ""), 10) || 0;

  return (
    <section className="overflow-hidden rounded-[1.75rem] bg-white/80 shadow-card ring-1 ring-white/80 backdrop-blur-xl">
      <div className="relative min-h-44 bg-[linear-gradient(135deg,#002A8D_0%,#0050C8_48%,#00B3FF_100%)] p-4 sm:p-6">
        <div className="ml-auto max-w-[42rem]">
          <GamifiedMetricsBoard
            horas={horas}
            eventosValidados={eventosValidados}
            puntos={puntos}
            categorias={categorias}
          />
        </div>
      </div>

      <div className="relative z-10 -mt-12 px-4 pb-5 sm:-mt-14 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-card sm:h-28 sm:w-28"
            />
            <div>
              <h1 className="text-2xl font-black text-slate-950 sm:text-3xl">{user.name}</h1>
              <p className="mt-1 text-sm font-black text-bcp-navy">{user.career}</p>
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

        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-2xl bg-orange-50 p-4">
            <p className="text-sm font-black text-bcp-orange">Nivel de perfil</p>
            <p className="mt-1 text-lg font-black text-slate-950">{currentMedal.label}</p>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
              <div className="h-full rounded-full bg-bcp-orange" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-xs font-bold text-slate-500">
              {currentMedal.nextMedal 
                ? `Te faltan ${remainingHours} horas de participación para alcanzar el rango ${currentMedal.nextMedal}`
                : "¡Felicidades! Has alcanzado el nivel máximo."}
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
