import bgImage from "./assets/fotoCuyuni.png";
import { Outlet } from "react-router-dom";
import { Nav } from "./components/navbar";

export function LayoutPage() {
  return (
    <div
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
      className="min-h-dvh h-dvh w-screen flex flex-col lg:max-h-dvh items-center p-2"
    >
      <div
        className="
          flex flex-col w-full h-full rounded-2xl
          bg-black/30
          backdrop-blur-md
          border border-white/20
          shadow-2xl
          relative
          overflow-hidden
          p-2
          lg:px-4
        "
      >
        {/* highlight líquido */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/30 via-transparent to-transparent opacity-60 animate-pulse pointer-events-none" />
        <Nav />
        <Outlet />
      </div>
    </div>
  );
}
