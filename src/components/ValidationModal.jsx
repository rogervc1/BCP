export default function ValidationModal({ event, onClose }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-slate-950/55 p-0 backdrop-blur-sm sm:place-items-center sm:p-4">
      <section className="w-full max-w-xl rounded-t-[2rem] bg-white p-6 shadow-soft sm:rounded-[2rem] sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-bcp-orange">
              Validacion de participacion
            </p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">{event.title}</h2>
            <p className="mt-2 text-sm font-semibold text-slate-500">
              Sube tu certificado, constancia o foto para iniciar la revision y ganar {event.points} puntos.
            </p>
          </div>
          <button
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-xl font-bold text-slate-500 hover:bg-slate-200"
            aria-label="Cerrar modal"
          >
            x
          </button>
        </div>

        <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed border-bcp-sky/60 bg-sky-50/60 px-6 py-10 text-center transition hover:bg-sky-50">
          <input type="file" className="sr-only" />
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-3xl shadow-card">
            ^
          </span>
          <span className="mt-4 text-lg font-black text-bcp-navy">
            Arrastra tu archivo aqui
          </span>
          <span className="mt-1 text-sm font-semibold text-slate-500">
            o haz clic para seleccionar una constancia, imagen o PDF
          </span>
        </label>

        <p className="mt-4 rounded-2xl bg-sky-50 p-4 text-sm font-semibold leading-6 text-slate-600 ring-1 ring-bcp-sky/20">
          Al enviarla, tu participacion pasara a proceso de revision. Si la entidad no emite
          certificado, un asesor revisara tu foto en 24h.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-2xl px-5 py-3 text-sm font-black text-slate-500 hover:bg-slate-100"
          >
            Cancelar
          </button>
          <button
            onClick={onClose}
            className="rounded-2xl bg-bcp-orange px-6 py-3 text-sm font-black text-white shadow-card transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-bcp-orange focus:ring-offset-2"
          >
            Enviar validacion
          </button>
        </div>
      </section>
    </div>
  );
}
