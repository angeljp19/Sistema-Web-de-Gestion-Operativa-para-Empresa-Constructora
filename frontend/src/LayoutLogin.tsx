import bgImage from "./assets/fotoCuyuni.png";
import { Outlet } from "react-router-dom";

export function LayoutLogin() {
  return (
    <div
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
      className="flex h-screen w-screen p-2"
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
        "
      >
        {/* highlight líquido */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/30 via-transparent to-transparent opacity-60 animate-pulse pointer-events-none" />
        <Outlet />
      </div>
    </div>
  );
}
