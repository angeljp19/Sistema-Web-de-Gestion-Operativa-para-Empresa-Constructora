// pageHeader.tsx
interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-start gap-4 px-5 py-5 sm:px-6">
        <div className="mt-1 h-10 w-1 rounded-full bg-yellow-400" />

        <div className="min-w-0">
          <h1 className="text-lg lg:text-2xl font-extrabold tracking-tight text-gray-900">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}