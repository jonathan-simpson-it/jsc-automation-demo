export interface Stat {
  label: string;
  count: number;
  tone?: "default" | "wax" | "pine" | "oxblood";
}

export function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <dl className="stat-strip" role="list">
      {stats.map((s) => (
        <div key={s.label} className={`stat stat--${s.tone ?? "default"}`}>
          <dd className="stat-num">{s.count}</dd>
          <dt className="stat-label">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}
