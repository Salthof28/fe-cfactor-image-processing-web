import { DropFile } from "@/components/home/DropFile";
import { bricolageGrotest, dmSans } from "@/lib/font";

export default function Home() {
  return (
    <div>
      <main className={`max-md:pt-[2em] z-10 bg-white flex justify-center min-h-screen`}>
        <div className={`max-w-360 flex flex-col px-[clamp(0.6em,calc(var(--prefcalc)*4),4em)] py-[2em] w-full text-black ${dmSans.className}`}>
          <h4 className={`text-[2em] ${bricolageGrotest.className}`}>Compress Images Online</h4>
          <p>Reduce the size of image</p>
          <DropFile/>
        </div>
      </main>
    </div>
  );
}
