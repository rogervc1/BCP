import RewardCard from "./RewardCard";

export default function RewardsMarketplace({ rewards }) {
  const categories = [...new Set(rewards.map((reward) => reward.category))];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] bg-white p-6 shadow-soft sm:p-8">
        <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-bcp-orange/20" />
        <div className="absolute bottom-0 right-16 h-24 w-24 rounded-full bg-bcp-sky/20" />
        <div className="relative max-w-2xl">
          <p className="text-sm font-black uppercase tracking-wide text-bcp-orange">
            Marketplace de recompensas
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-bcp-navy sm:text-5xl">
            Impulsa tu formacion etica y profesional con tus puntos
          </h1>
          <p className="mt-4 text-sm font-semibold leading-6 text-slate-500 sm:text-base">
            Canjea cursos, beneficios profesionales y promociones de aliados para convertir tu
            impacto social en crecimiento personal.
          </p>
        </div>
      </section>

      {categories.map((category) => (
        <section key={category}>
          <h2 className="mb-4 text-2xl font-black text-slate-950">{category}</h2>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {rewards
              .filter((reward) => reward.category === category)
              .map((reward) => (
                <RewardCard key={reward.id} reward={reward} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
