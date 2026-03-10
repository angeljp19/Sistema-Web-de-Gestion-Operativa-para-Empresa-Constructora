import { Link } from "react-router";
import { useMemo, useRef, useState } from "react";

type CarouselItem = {
  id: string;
  title: string;
  icon: any;
  link: string;
};

type CardPosition = "active" | "inactive";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function CarouselCard({
  title,
  icon,
  position,
  link,
}: {
  title: string;
  icon: any;
  position: CardPosition;
  link: string;
}) {
  const isActive = position === "active";

  return (
    <Link
      to={link}
      className={cn(
        "group relative flex h-[150px] w-[150px] lg:h-[200px] lg:w-[200px] shrink-0 items-end rounded-2xl p-3 lg:p-6 text-left",
        "transition-all duration-300 ease-out",
        "focus:outline-none",
        "hover:scale-[1.03] hover:ring-2 hover:ring-yellow-300/50",
        isActive
          ? "bg-yellow-300 shadow-lg"
          : "bg-white shadow-md ring-1 ring-black/5 hover:shadow-lg",
      )}
    >
      <div className="flex h-full flex-col justify-between">
        <div
          className={cn(
            "size-13 rounded-xl flex justify-center items-center",
            isActive ? "bg-white" : "bg-amber-300",
          )}
        >
          {icon({ className: cn("h-6 w-6 text-black") })}
        </div>

        <div
          className={cn(
            "text-sm font-semibold flex flex-col",
            isActive ? "text-black" : "text-black/90",
          )}
        >
          <h3>{title}</h3>
          <div
            className={cn(
              "mt-2 h-1 rounded-full transition-all duration-300",
              isActive ? "w-16 bg-black" : "w-12 bg-yellow-300",
            )}
          />
        </div>
      </div>
    </Link>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function nearestIndexFromScroll(params: {
  scrollLeft: number;
  itemStride: number; // card width + gap
  count: number;
}) {
  const raw = Math.round(params.scrollLeft / params.itemStride);
  return clamp(raw, 0, Math.max(0, params.count - 1));
}

export function QuoteCarousel({
  items,
  initialActiveIndex = 1,
}: {
  items: CarouselItem[];
  initialActiveIndex?: number;
}) {
  const GAP = 24; // gap-6
  const CARD_W_MOBILE = 150;
  const CARD_W_DESKTOP = 200;

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(() =>
    clamp(initialActiveIndex, 0, Math.max(0, items.length - 1)),
  );

  const stride = useMemo(() => {
    // We can’t read actual widths reliably without measuring; use breakpoint-based stride.
    // Since Tailwind uses 150px mobile, 200px desktop, keep both and choose at runtime via matchMedia.
    const isDesktop =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(min-width: 1024px)").matches;
    const w = isDesktop ? CARD_W_DESKTOP : CARD_W_MOBILE;
    return w + GAP;
  }, []);

  const scrollToIndex = (idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * stride, behavior: "smooth" });
  };

  const canPrev = activeIndex > 0;
  const canNext = activeIndex < items.length - 1;

  return (
    <div className="flex items-center gap-4">
      {/* Prev (desktop only) */}
      <button
        type="button"
        onClick={() => {
          if (!canPrev) return;
          const next = activeIndex - 1;
          setActiveIndex(next);
          scrollToIndex(next);
        }}
        disabled={!canPrev}
        className={cn(
          "hidden lg:grid h-10 w-10 place-items-center rounded-full ring-1 ring-black/10",
          "transition hover:bg-black/5 disabled:opacity-40 disabled:hover:bg-transparent",
        )}
        aria-label="Anterior"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Touch/scroll viewport */}
      <div className="w-full lg:w-11/12">
        <div
          ref={scrollerRef}
          className={cn(
            "flex gap-6 py-2",
            "overflow-x-auto overscroll-x-contain",
            "scroll-smooth",
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            "snap-x snap-mandatory",
            "touch-pan-x",
          )}
          onScroll={(e) => {
            const el = e.currentTarget;
            const idx = nearestIndexFromScroll({
              scrollLeft: el.scrollLeft,
              itemStride: stride,
              count: items.length,
            });
            setActiveIndex(idx);
          }}
          onPointerDown={() => {
           
          }}
        >
          {items.map((it, idx) => (
            <div key={it.id} className="snap-start">
              <CarouselCard
                icon={it.icon}
                title={it.title}
                position={idx === activeIndex ? "active" : "inactive"}
                link={it.link}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Next (desktop only) */}
      <button
        type="button"
        onClick={() => {
          if (!canNext) return;
          const next = activeIndex + 1;
          setActiveIndex(next);
          scrollToIndex(next);
        }}
        disabled={!canNext}
        className={cn(
          "hidden lg:grid h-10 w-10 place-items-center rounded-full ring-1 ring-black/10",
          "transition hover:bg-black/5 disabled:opacity-40 disabled:hover:bg-transparent",
        )}
        aria-label="Siguiente"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}