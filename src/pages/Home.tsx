import { Spotlight } from '../components/ui/Spotlight';
import { TextGenerateEffect } from '../components/ui/TextGenerateEffect';
import MagicButton from '../components/ui/MagicButton';

const Home = () => {
  return (
    <main>
      {/* Iluminación estética — FIRMA INMUTABLE */}
      <div className="pb-20 pt-36">
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight
          className="left-80 top-28 h-[80vh] w-[50vw]"
          fill="blue"
        />
      </div>

      {/* Grid de fondo — FIRMA INMUTABLE */}
      <div className="absolute h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.1] bg-grid-black-100/[0.2] top-0 left-0 flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      {/* Contenido central */}
      <div className="flex justify-center relative z-10">
        <div className="max-w-[80vw] md:max-w-screen-2xl lg:max-w-[60vw] flex flex-col items-center text-center">

          {/* Firma / Identificación */}
          <h2 className="uppercase tracking-widest text-xs text-blue-100 max-w-80">
            Alegoría DEI — Spiritus Vivens 🌿 v9.0.0
          </h2>

          {/* Umbral conceptual — NO SE TOCA */}
          <TextGenerateEffect
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
            words="La Intersección entre el Dogma y la Tecnología"
          />

          {/* Marco interpretativo */}
          <p className="mt-6 text-sm md:text-lg lg:text-2xl text-white-100 max-w-3xl">
            Alegoría DEI es un sistema simbólico en desarrollo, donde doctrina,
            estructura y tecnología convergen bajo reglas explícitas para
            explorar significado en entornos digitales.
          </p>

          {/* Estado del proyecto */}
          <div className="mt-16 max-w-2xl">
            <h3 className="text-blue-100 font-semibold mb-3">
              Estado actual del sistema
            </h3>
            <p className="text-sm text-gray-400">
              El sistema completo aún no está desplegado. Este entorno representa
              una primera capa funcional donde se ponen a prueba la
              infraestructura base, el lenguaje visual y la coherencia
              arquitectónica del proyecto.
            </p>
          </div>

          {/* Demostración implícita */}
          <div className="mt-12 max-w-2xl">
            <h3 className="text-blue-100 font-semibold mb-3">
              Lo que este entorno ya demuestra
            </h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Renderizado estable y reproducible</li>
              <li>• Arquitectura visual coherente bajo restricción</li>
              <li>• Capacidad para sostener sistemas simbólicos</li>
              <li>• Infraestructura preparada para mayor complejidad</li>
            </ul>
          </div>

          {/* Nota de apoyo / patrocinio */}
          <div className="mt-16 max-w-2xl">
            <p className="text-xs text-gray-500">
              Alegoría DEI es un proyecto independiente en desarrollo continuo.
              El apoyo recibido se destina a investigación, tiempo de trabajo y
              acceso a herramientas avanzadas de análisis y creación asistida
              por inteligencia artificial.
            </p>
          </div>

          {/* Acción — MISMO COMPONENTE, NUEVA LECTURA */}
          <div className="mt-12">
            <MagicButton
              title="Acompañar el desarrollo"
              icon={<span>🌿</span>}
              position="right"
            />
          </div>

        </div>
      </div>
    </main>
  );
};

export default Home;
