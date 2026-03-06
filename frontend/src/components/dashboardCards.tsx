// dashboardCard.tsx
import { Link } from "react-router";

interface DashboardCardProps {
  title: string;
  icon: React.ComponentType<{ size: number }>;
  active?: boolean;
  link: string;
}

export function DashboardCard({
  title,
  icon: Icon,
  active = false,
  link,
}: DashboardCardProps) {
  return (
    <Link
      to={link}
      className={[
        "group relative flex h-36 w-full flex-col justify-between rounded-2xl border bg-white p-5",
        "shadow-sm transition",
        "focus:outline-none focus:ring-4 focus:ring-yellow-200",
        active
          ? "border-yellow-400 ring-4 ring-yellow-100"
          : "border-gray-200 hover:border-yellow-400 hover:shadow-md",
      ].join(" ")}
    >
      {/* Icon */}
      <div
        className={[
          "flex h-12 w-12 items-center justify-center rounded-xl transition",
          active
            ? "bg-yellow-400 text-white"
            : "bg-yellow-100 text-yellow-500 group-hover:bg-yellow-400 group-hover:text-white",
        ].join(" ")}
      >
        <Icon size={22} />
      </div>

      {/* Title */}
      <div className="min-w-0">
        <h3
          className={[
            "truncate text-base font-extrabold tracking-tight transition",
            active ? "text-gray-900" : "text-gray-900 group-hover:text-gray-900",
          ].join(" ")}
        >
          {title}
        </h3>

        <div className="mt-1 h-1 w-10 rounded-full bg-gray-100 transition group-hover:bg-yellow-200" />
      </div>

      {/* Subtle corner accent */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-yellow-100/60 blur-2xl transition group-hover:bg-yellow-200/70" />
    </Link>
  );
}