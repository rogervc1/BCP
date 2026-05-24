export default function RewardCard({ reward }) {
  return (
    <article className="rounded-[1.5rem] bg-white p-5 shadow-card ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-bcp-navy text-xl font-black text-white">
          {reward.partner.charAt(0)}
        </div>
        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-bcp-navy">
          {reward.badge}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-sm font-black text-bcp-orange">{reward.partner}</p>
        <h3 className="mt-1 text-xl font-black text-slate-950">{reward.title}</h3>
        <p className="mt-3 text-sm font-semibold text-slate-500">
          Canje disponible para voluntarios con participaciones validadas.
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-lg font-black text-bcp-navy">{reward.points} pts</span>
        <button className="rounded-2xl bg-bcp-orange px-5 py-3 text-sm font-black text-white shadow-card transition hover:bg-orange-600">
          Canjear
        </button>
      </div>
    </article>
  );
}
