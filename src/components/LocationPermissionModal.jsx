import { useState } from "react";

export default function LocationPermissionModal({ onAllow, onClose }) {
  const [status, setStatus] = useState("idle");

  const requestLocation = () => {
    if (!("geolocation" in navigator)) {
      setStatus("unsupported");
      return;
    }

    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      () => {
        // MVP: registramos la region local del usuario como Puno para personalizar el feed.
        onAllow("Puno");
      },
      () => {
        setStatus("denied");
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 },
    );
  };

  return (
    <div className="fixed inset-0 z-[60] grid place-items-end bg-slate-950/55 p-0 backdrop-blur-sm sm:place-items-center sm:p-4">
      <section className="w-full max-w-md rounded-t-[2rem] bg-white p-6 shadow-soft sm:rounded-[2rem]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-bcp-navy to-bcp-sky text-white shadow-card">
              <LocationIcon />
            </span>
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-bcp-orange">
                Ubicacion
              </p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">
                Encuentra eventos cerca de ti
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-xl font-bold text-slate-500 transition hover:bg-slate-200"
            aria-label="Cerrar solicitud de ubicacion"
          >
            x
          </button>
        </div>

        <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
          Permite el acceso a tu ubicacion para mostrar primero oportunidades de voluntariado en tu
          region. {/* En tu caso registraremos <strong>Puno</strong> y filtraremos el feed automaticamente. */}
        </p>

        {status === "denied" && (
          <p className="mt-4 rounded-2xl bg-orange-50 p-3 text-sm font-bold text-bcp-orange">
            No pudimos acceder a tu ubicacion. Puedes cerrar esta ventana y seguir explorando.
          </p>
        )}
        {status === "unsupported" && (
          <p className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm font-bold text-slate-600">
            Tu navegador no permite solicitar ubicacion desde esta pagina.
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-2xl px-5 py-3 text-sm font-black text-slate-500 transition hover:bg-slate-100"
          >
            Ahora no
          </button>
          <button
            onClick={requestLocation}
            disabled={status === "loading"}
            className="rounded-2xl bg-bcp-orange px-6 py-3 text-sm font-black text-white shadow-card transition hover:bg-orange-600 disabled:cursor-wait disabled:opacity-70"
          >
            {status === "loading" ? "Solicitando..." : "Permitir ubicacion"}
          </button>
        </div>
      </section>
    </div>
  );
}

function LocationIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="10" r="2.5" fill="currentColor" />
    </svg>
  );
}
