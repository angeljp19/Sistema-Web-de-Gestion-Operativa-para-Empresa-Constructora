import { LoginAuth } from "../api/login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorModal } from "../components/errorModal";
import bgImage from "../assets/fotoCuyuni.png";


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
      await LoginAuth(email, password);
      navigate("/cuyuniApp/mainPanel");
    } catch (err) {
      setOpenModal(!openModal);
      setMensaje((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white lg:flex">
      {/* Left image panel (desktop) */}
      <section className="relative hidden lg:block lg:w-1/2">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/25 to-black/10" />

       

        {/* Bottom-left text */}
        <div className="absolute bottom-10 left-8 max-w-md text-white">
          <h2 className="text-3xl font-extrabold leading-tight">
            Construyendo el futuro,
            <br />
            bloque a bloque.
          </h2>
          <p className="mt-3 text-xs text-white/85">
            Gestión integral de proyectos y materiales para la excelencia en la
            construcción.
          </p>
        </div>
      </section>

      {/* Right panel */}
      <section className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2 lg:px-12">
        <div className="w-full max-w-sm">
          {/* Brand row */}
          <div className="mb-10 flex items-center gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold tracking-wide text-gray-800">
                CONSTRUCTORA
              </span>
              <span className="text-lg font-extrabold tracking-wide text-yellow-400">
                CUYUNI
              </span>
            </div>
          </div>

          {/* Copy */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">
              ¡Hola de nuevo!
            </h1>
            <p className="mt-2 text-xs text-gray-500">
              Ingresa tus credenciales para acceder al panel.
            </p>
          </div>

          {/* Form (NO card wrapper) */}
          <form onSubmit={handleSummit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-gray-600"
              >
                Correo Electrónico
              </label>

              <div className="mt-2 flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 shadow-sm focus-within:border-yellow-400 focus-within:ring-4 focus-within:ring-yellow-100">
                {/* mail icon */}
                <svg
                  className="h-4 w-4 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 6.5h16v11H4v-11Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m5.5 7.5 6.5 5 6.5-5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                </svg>

                <input
                  placeholder="cuyuni@gmail.com"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-600"
              >
                Contraseña
              </label>

              <div className="mt-2 flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 shadow-sm focus-within:border-yellow-400 focus-within:ring-4 focus-within:ring-yellow-100">
                {/* lock icon */}
                <svg
                  className="h-4 w-4 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M7.5 11V8.5a4.5 4.5 0 0 1 9 0V11"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6.5 11h11v8h-11v-8Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                </svg>

                <input
                  placeholder="Contraseña"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="mt-2 flex justify-end">
                <span
                  onClick={() => navigate("/login/recuperarContrasena")}
                  className="cursor-pointer text-xs font-semibold text-yellow-400 hover:text-yellow-500"
                >
                  ¿Olvidaste tu contraseña?
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full rounded-md py-2 text-sm font-semibold shadow-sm transition active:scale-[0.99] ${
                isLoading
                  ? "cursor-not-allowed bg-gray-300 text-white"
                  : "bg-yellow-400 text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-200"
              }`}
            >
              {isLoading ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </form>
        </div>
      </section>

      <ErrorModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        mensaje={mensaje}
      />
    </div>
  );
}