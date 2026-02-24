import { LoginAuth } from "../api/login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorModal } from "../components/errorModal";
import CuyuniLogo from "../assets/logoCuyuni 1.png"

import Logo from "../assets/logo.png";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  const handleSummit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await LoginAuth(email, password);
      navigate("/cuyuniApp/mainPanel");
    } catch (err) {
      setOpenModal(!openModal);
      setMensaje((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen w-screen  flex flex-col lg:flex-row justify-center items-center">
      <div className="w-1/2 h-full rounded-l-4xl shadow-[-5px_5px_5px_rgba(0,0,0,0.6)] hidden lg:flex justify-center items-center">
        <img src={CuyuniLogo} className="h-2/3" alt="logoCuyuni" />
      </div>
      <div className="bg-gray-600 p-8 rounded-t-[100px] lg:rounded-t-none lg:rounded-r-4xl h-full w-full lg:w-1/2 flex flex-col items-center">
        <div className="flex w-full justify-center lg:justify-end">
          <img className="w-1/3" src={Logo} alt="logo" />
        </div>

        <div className="flex w-full h-full flex-col items-center justify-around py-10">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-2 text-yellow-300">
              ¡Hola de nuevo!
            </h2>
          </div>
          <div className="flex flex-col w-full h-full items-center justify-center space-y-10">
            <h3 className="text-yellow-300 font-semibold text-2xl">
              Iniciar Sesion
            </h3>
            <form
              onSubmit={handleSummit}
              className="w-full lg:w-1/2 flex flex-col justify-center"
            >
              <div className="mb-4 ">
                <input
                  placeholder="cuyuni@gmail.com"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none"
                  required
                />
              </div>

              <div className="mb-6 flex flex-col items-end">
                <input
                  placeholder="Contraseña"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none"
                  required
                />
                <span
                  onClick={() => navigate("/login/recuperarContrasena")}
                  className="text-yellow-300 hover:text-yellow-400 cursor-pointer"
                >
                  Olvidaste tu Contraseña?
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 rounded-full transition duration-150 cursor-pointer ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-yellow-400 text-white hover:bg-yellow-500"
                }`}
              >
                {isLoading ? "Cargando..." : "Iniciar Sesión"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ErrorModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        mensaje={mensaje}
      />
    </div>
  );
}
