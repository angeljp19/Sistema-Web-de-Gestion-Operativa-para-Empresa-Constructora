// LayoutPage.tsx
import { Outlet } from "react-router-dom";
import { Nav } from "./components/navbar";

export function LayoutPage() {
  return (
    <div className="h-dvh w-screen flex flex-col bg-gray-100 overflow-hidden">
      <div className="shrink-0 w-full">
        <Nav />
      </div>

      {/* ÚNICA zona scroll de la app (debajo del Nav) */}
      <main className="flex-1 min-h-0 w-full p-1 overflow-y-auto">
        <div
          className="
            flex flex-col w-full h-full min-h-0 rounded-2xl
            relative overflow-hidden
            p-2 lg:px-1
          "
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
}