import { agbalumo } from "@/lib/font"

export function Navbar() {
    return(
        <header className={` bg-white/80 backdrop-blur flex justify-center items-center `}>
            <div className={`flex flex-row justify-between items-center py-[1em] text-[#F2FEDC] text-[clamp(0.8em,calc(var(--prefcalc)*1.2),1.2em)] max-w-360 w-full z-12 px-[clamp(0.6em,calc(var(--prefcalc)*4),4em)]`}>
                <div className="h-[clamp(2em,calc(var(--prefcalc)*4),4em)]">
                    <img src={`/logo.png`} className={`w-full h-full`} />
                </div>
                <p className={`text-black ${agbalumo.className} font-bold text-[clamp(1.2em,calc(var(--prefcalc)*2),2em)]`}>CIMB </p>
            </div>
        </header>
    )
}