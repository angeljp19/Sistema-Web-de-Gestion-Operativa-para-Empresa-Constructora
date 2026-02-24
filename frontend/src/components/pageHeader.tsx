interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="flex w-full rounded-2xl bg-black/30 shadow-[0_2px_5px_rgba(0,0,0,0.3)]">
      <div className="flex flex-col gap-1 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            {title}
          </h1>

          {subtitle && <p className="mt-1 text-sm text-blue-100">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
