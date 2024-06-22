import { FaLocationArrow } from 'react-icons/fa';
import { Toaster } from 'sonner';

const MagicButton = () => {
  return (
    <div>
      <Toaster richColors closeButton />
      <div className="w-full flex justify-between mb-4">
        <div className="flex flex-col gap-2"></div>
      </div>
      <div className="mt-4 mb-6">
        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-8 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 gap-4">
          Get in touch <FaLocationArrow />
        </button>
      </div>
    </div>
  );
};

export default MagicButton;
