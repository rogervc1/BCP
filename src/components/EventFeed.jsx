import { useEffect, useMemo, useState } from "react";
import EventCard from "./EventCard";

const defaultFilters = {
  query: "",
  region: "Todas",
  dateGroup: "Todas",
  modality: "Todas",
};

export default function EventFeed({ user, events, regions, preferredRegion, onParticipate }) {
  const [filters, setFilters] = useState(defaultFilters);

  const dates = ["Todas", "Hoy", "Esta semana", "Proximos 15 dias", "Este mes"];
  const modalities = ["Todas", "Virtual", "Presencial", "Mixta"];

  useEffect(() => {
    if (!preferredRegion || !regions.includes(preferredRegion)) {
      return;
    }

    setFilters((current) => ({ ...current, region: preferredRegion }));
  }, [preferredRegion, regions]);

  const filteredEvents = useMemo(() => {
    const query = filters.query.trim().toLowerCase();

    return events.filter((event) => {
      const matchesQuery =
        !query ||
        [event.title, event.organization, event.category, event.location]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesRegion = filters.region === "Todas" || event.region === filters.region;
      const matchesDate = filters.dateGroup === "Todas" || event.dateGroup === filters.dateGroup;
      const matchesModality = filters.modality === "Todas" || event.modality === filters.modality;

      return matchesQuery && matchesRegion && matchesDate && matchesModality;
    });
  }, [events, filters]);

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const resetFilters = () => setFilters(defaultFilters);

  return (
    <div className="space-y-5">
      <ProfileSnapshot user={user} />

      <section className="rounded-[1.75rem] bg-white p-4 shadow-card ring-1 ring-slate-200/80 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-bcp-orange">
              Feed de eventos
            </p>
            <h2 className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">
              Oportunidades para generar impacto
            </h2>
            <p className="mt-2 text-sm font-semibold text-slate-500">
              Filtra por region, fecha y modalidad. Luego valida tu participacion para recibir puntos.
            </p>
          </div>

          <span className="inline-flex w-fit rounded-full bg-bcp-navy px-4 py-2 text-sm font-black text-white">
            {filteredEvents.length} de {events.length} eventos
          </span>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-400">
              Buscar
            </span>
            <input
              value={filters.query}
              onChange={(event) => updateFilter("query", event.target.value)}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-bcp-sky focus:bg-white focus:ring-2 focus:ring-bcp-sky/20"
              placeholder="Causa, distrito u organizacion"
            />
          </label>

          <FilterSelect
            label="Region"
            value={filters.region}
            options={regions}
            onChange={(value) => updateFilter("region", value)}
          />
          <FilterSelect
            label="Fecha"
            value={filters.dateGroup}
            options={dates}
            onChange={(value) => updateFilter("dateGroup", value)}
          />
          <FilterSelect
            label="Modalidad"
            value={filters.modality}
            options={modalities}
            onChange={(value) => updateFilter("modality", value)}
          />

          <button
            onClick={resetFilters}
            className="h-12 rounded-2xl border border-slate-200 px-4 text-sm font-black text-slate-600 transition hover:border-bcp-navy hover:text-bcp-navy lg:self-end"
          >
            Limpiar
          </button>
        </div>
      </section>

      <section className="space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} onParticipate={onParticipate} />
          ))
        ) : (
          <div className="rounded-[1.75rem] bg-white p-8 text-center shadow-card ring-1 ring-slate-200/80">
            <p className="text-lg font-black text-slate-950">No hay eventos con esos filtros</p>
            <p className="mt-2 text-sm font-semibold text-slate-500">
              Prueba con otra region, fecha o modalidad.
            </p>
            <button
              onClick={resetFilters}
              className="mt-5 rounded-2xl bg-bcp-navy px-5 py-3 text-sm font-black text-white"
            >
              Ver todos los eventos
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function ProfileSnapshot({ user }) {
  return (
    <section className="rounded-[1.75rem] bg-white p-4 shadow-card ring-1 ring-slate-200/80 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-14 w-14 rounded-full object-cover ring-4 ring-slate-100"
          />
          <div>
            <p className="text-sm font-bold text-slate-500">Resumen de impacto</p>
            <h1 className="text-xl font-black text-slate-950">{user.name}</h1>
            <p className="text-sm font-semibold text-bcp-navy">{user.level}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:min-w-80">
          <div className="rounded-2xl bg-orange-50 px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-bcp-orange">
              Puntos BCP
            </p>
            <p className="text-xl font-black text-slate-950">
              {user.points.toLocaleString("es-PE")}
            </p>
          </div>
          <div className="rounded-2xl bg-sky-50 px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-bcp-navy">
              Progreso 20%
            </p>
            <p className="text-xl font-black text-slate-950">{user.nextLevelProgress}%</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-black text-slate-700 outline-none transition focus:border-bcp-sky focus:bg-white focus:ring-2 focus:ring-bcp-sky/20"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
