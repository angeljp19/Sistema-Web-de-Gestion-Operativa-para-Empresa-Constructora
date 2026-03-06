
import { Outlet } from "react-router-dom";

export function LayoutLogin() {
  return (
    <div
      className="flex h-screen w-screen"
    >

        <Outlet />
      </div>

  );
}
