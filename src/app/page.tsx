import { DropFile } from "@/components/home/DropFile";
import { Footer } from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import { bricolageGrotest, dmSans } from "@/lib/font";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className={`max-md:pt-[2em] z-10 bg-linear-to-br from-slate-50 via-white to-violet-200 flex justify-center min-h-screen`}>
        <div className={`max-w-360 flex flex-col px-[clamp(0.6em,calc(var(--prefcalc)*4),4em)] py-[clamp(0.4em,calc(var(--prefcalc)*2),2em)] w-full text-black ${dmSans.className}`}>
          <h4 className={`text-[clamp(1.2em,calc(var(--prefcalc)*2),2em)] ${bricolageGrotest.className}`}>Compress Image</h4>
          <p className={`text-[clamp(0.8em,calc(var(--prefcalc)*1),1em)]`}>Reduce the size of image</p>
          <DropFile/>
          <section className={`bg-white/50 rounded-lg`}>
            <h2 className="text-center text-[clamp(0.8em,calc(var(--prefcalc)*1.5),1.5em)] font-bold text-slate-900">How It Works</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600 text-[clamp(0.8em,calc(var(--prefcalc)*1),1em)]"> Upload an image, let the server process it in the background, then download the optimized result.</p>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-[clamp(0.8em,calc(var(--prefcalc)*1),1em)]">
                <div className="text-4xl">📤</div>
                <h3 className="mt-5 text-[1.2em] font-semibold text-slate-900">1. Upload an Image</h3>
                <p className="mt-2 leading-6 text-slate-600">Drag and drop an image or click the upload area to select one from yourdevice.</p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-4xl">⏳</div>
                <h3 className="mt-5 text-[1.2em] font-semibold text-slate-900">2. Wait for Processing</h3>
                <p className="mt-2 leading-6 text-slate-600"> The image is processed asynchronously in the background. You can monitor its status in real time.</p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-4xl">📥</div>
                <h3 className="mt-5 text-[1.2em] font-semibold text-slate-900">3. Download the Result</h3>
                <p className="mt-2 leading-6 text-slate-600">Once processing is complete, download the optimized WebP image.</p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-4xl">🗑️</div>
                <h3 className="mt-5 text-[1.2em] font-semibold text-slate-900">4. Automatic Cleanup</h3>
                <p className="mt-2 leading-6 text-slate-600">Uploaded and processed files are automatically deleted after the configured retention period.</p>
              </article>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
