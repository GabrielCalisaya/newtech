import { useEffect, lazy, Suspense } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import logoUrl from "../../img/newtech-logo-c.png";
import HomePage from "./pages/HomePage";
import WheelPage from "./pages/WheelPage";
import TriviaPage from "./pages/TriviaPage";
import "./logo.css";

const ThreeDPage = lazy(() => import("./pages/ThreeDPage"));

function PageReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo?.(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="site-shell min-h-screen">
      <PageReset />
      <header className="demo-header">
        <div className="demo-container experience-header-inner flex items-center justify-between gap-4 py-4 md:py-5">
          <Link
            to="/"
            className="brand-link"
            aria-label="New Tech Experiencias, inicio"
          >
            <span className="brand-symbol" aria-hidden="true">
              <img className="brand-logo" src={logoUrl} alt="" />
            </span>
            <span className="brand-name" aria-hidden="true">
              <strong>
                <span>New</span> Tech
              </strong>
              <small>EXPERIENCIAS</small>
            </span>
          </Link>
          <nav className="header-nav" aria-label="Muestras">
            <NavLink to="/ruleta">Ruleta</NavLink>
            <NavLink to="/trivia">Trivia</NavLink>
            <NavLink to="/3d">3D</NavLink>
          </nav>
          <a className="back-site hidden sm:inline-flex" href="/">
            Volver al sitio <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>
      <main id="contenido" className="min-h-[calc(100vh-190px)]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ruleta" element={<WheelPage />} />
          <Route path="/trivia" element={<TriviaPage />} />
          <Route
            path="/3d"
            element={
              <Suspense
                fallback={
                  <div className="demo-container py-24 text-white/70">
                    Cargando objeto 3D…
                  </div>
                }
              >
                <ThreeDPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <section className="demo-container py-24">
                <p className="eyebrow">404 / Muestra no encontrada</p>
                <h1 className="display-title mt-4">Esta ruta no existe.</h1>
                <Link className="button-primary mt-8 inline-flex" to="/">
                  Ver experiencias <span aria-hidden="true">↗</span>
                </Link>
              </section>
            }
          />
        </Routes>
      </main>
      <footer className="demo-footer">
        <div className="demo-container flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p>New Tech · Experiencias digitales para eventos</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/">Todas las muestras</Link>
            <a href="/#contacto">Consultar un proyecto ↗</a>
            <a href="/">Sitio principal ↗</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
