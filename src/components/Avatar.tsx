export function Avatar({
  name,
  size = 32,
  active = true,
}: {
  name: string;
  size?: number;
  active?: boolean;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <span
      className="avatar"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
      aria-hidden="true"
    >
      {initials}
      <span className={`avatar-dot${active ? " is-active" : ""}`} />
    </span>
  );
}
