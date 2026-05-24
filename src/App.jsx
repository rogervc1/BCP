import { useState } from "react";
import { events, impactHistory, regions, rewards, user } from "./data/mockData";
import Navbar from "./components/Navbar";
import EventFeed from "./components/EventFeed";
import RewardsMarketplace from "./components/RewardsMarketplace";
import ImpactProfile from "./components/ImpactProfile";
import ProfileHeader from "./components/ProfileHeader";
import ValidationModal from "./components/ValidationModal";

export default function App() {
  const [activeView, setActiveView] = useState("events");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [shareEvent, setShareEvent] = useState(null);
  const profileCategories = getProfileCategories(events, impactHistory, user);

  return (
    <div className="min-h-screen bcp-gradient">
      <Navbar user={user} activeView={activeView} onNavigate={setActiveView} />

      <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {activeView === "events" && (
          <EventFeed
            user={user}
            events={events}
            regions={regions}
            onParticipate={setSelectedEvent}
          />
        )}
        {activeView === "impact" && (
          <ImpactProfile
            events={events}
            impactHistory={impactHistory}
            onUploadEvidence={setSelectedEvent}
          />
        )}
        {activeView === "profile" && (
          <ProfileHeader user={user} categorias={profileCategories} />
        )}
        {activeView === "rewards" && <RewardsMarketplace rewards={rewards} />}
      </main>

      {selectedEvent && (
        <ValidationModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
      {shareEvent && <ShareSheet event={shareEvent} onClose={() => setShareEvent(null)} />}
    </div>
  );
}

function getProfileCategories(events, impactHistory, user) {
  const validatedCategories = impactHistory
    .filter((item) => item.status === "validated")
    .map((item) => events.find((event) => event.id === item.eventId)?.category)
    .filter(Boolean);
  const skillText = user.skills.join(" ").toLowerCase();
  const categories = new Set();

  if (validatedCategories.includes("Medio Ambiente")) {
    categories.add("Medio Ambiente");
  }

  if (skillText.includes("liderazgo")) {
    categories.add("Liderazgo");
  }

  if (user.headline.toLowerCase().includes("social") || validatedCategories.includes("Comunidad")) {
    categories.add("Social");
  }

  return [...categories];
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
