import { Agbalumo } from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";

export const agbalumo = Agbalumo({
    subsets: ['latin'],
    weight: ['400']
})

export const dmSans: NextFont = DM_Sans({
    subsets: ["latin"],
    style: ["normal", "italic"],
    weight: ["300", "500", "600", "700", "800"]
})

export const bricolageGrotest: NextFont = Bricolage_Grotesque({
    subsets: ["latin"],
    weight: ["700"]
})