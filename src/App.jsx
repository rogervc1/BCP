import { useState } from "react";
import { events, rewards, user } from "./data/mockData";
import Navbar from "./components/Navbar";
import EventFeed from "./components/EventFeed";
import RewardsMarketplace from "./components/RewardsMarketplace";
import ProfileHeader from "./components/ProfileHeader";
import ValidationModal from "./components/ValidationModal";

export default function App() {
  const [activeView, setActiveView] = useState("events");
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="min-h-screen bcp-gradient">
      <Navbar user={user} activeView={activeView} onNavigate={setActiveView} />

      <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {activeView === "events" && (
          <EventFeed user={user} events={events} onParticipate={setSelectedEvent} />
        )}
        {activeView === "rewards" && <RewardsMarketplace rewards={rewards} />}
        {activeView === "profile" && <ProfileHeader user={user} />}
      </main>

      {selectedEvent && (
        <ValidationModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}
