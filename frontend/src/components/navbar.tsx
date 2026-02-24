import { Popover } from "flowbite-react";;
import { HiUser, HiCog } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"


export function Nav() {
  const user = sessionStorage.getItem("user");
  const userObj = JSON.parse(user as string);
  const navigate = useNavigate()

  const popoverContent = (
    <div className="w-64 p-3">
      <div className="mb-2 flex items-center justify-between"></div>
      <p className="text-base font-semibold leading-none text-gray-900 ">
        {userObj.nombre} {userObj.apellido}
      </p>
      <p className="mb-3 text-sm font-normal">{userObj.email}</p>
      <p className="mb-4 text-sm">{userObj.nombre}</p>
      <div className="flex justify-center">
        <button
          onClick={() => {
            sessionStorage.clear();
            navigate("/login");
          }}
          type="button"
          className="rounded-lg bg-blue-700 px-3 py-1.5 text-xs outline-none font-medium text-white hover:bg-blue-800  "
        >
          Cerrar sesion
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="w-full "
    >
      <div className="w-full flex flex-col md:flex-row items-center md:justify-between px-4 gap-2">
        <div className="w-full flex items-center justify-between ">
          <img className="w-1/8 cursor-pointer" onClick={() => {navigate("/cuyuniApp/mainPanel")}} src={logo} alt="logo" />


          <div className="hidden w-1/2 md:flex "></div>

          <div className="flex gap-4">
            <Popover content={popoverContent} placement="left">
              <HiUser className="w-6 h-6 text-white  cursor-pointer" />
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
