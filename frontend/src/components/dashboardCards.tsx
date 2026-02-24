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
      className={`
        group cursor-pointer
        relative overflow-hidden
        rounded-2xl p-6 h-40
        flex flex-col justify-between
        transition-all duration-300 ease-out
        backdrop-blur-xl
        border
        shadow-xl

        ${
          active
            ? `
              bg-yellow-400/25
              border-yellow-400/50
              shadow-yellow-400/30
            `
            : `
              bg-yellow-300/40
              border-yellow-400/30
              hover:bg-yellow-400/25
              hover:border-yellow-400/50
            `
        }
      `}
    >
      <div
        className={`
          pointer-events-none absolute inset-0
          bg-linear-to-br from-white/30 via-white/10 to-transparent
          opacity-50
        `}
      />

      <div
        className={`
          relative z-10
          w-12 h-12 rounded-xl flex items-center justify-center
          transition-all duration-300
          ${
            active
              ? "bg-yellow-400 text-black shadow-md"
              : "bg-white/20 text-white group-hover:bg-yellow-400 group-hover:text-black"
          }
        `}
      >
        <Icon size={24} />
      </div>

      <h3
        className={`
          relative z-10
          text-lg font-semibold
          transition-colors
          ${
            active
              ? "text-yellow-300"
              : "text-white group-hover:text-yellow-300"
          }
        `}
      >
        {title}
      </h3>
    </Link>
  );
}
