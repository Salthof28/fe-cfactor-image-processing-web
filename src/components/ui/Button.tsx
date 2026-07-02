import { dmSans } from "@/lib/font";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
    colourBg?: string,
    colourtext?: string,
    roundedSize?: string
    children: ReactNode,
}
export function Button ({ children, colourBg = "bg-pink-500", colourtext = "text-white", className="", roundedSize="rounded-md", type="button", ...props}: props) {
    return (
        <button type={type} className={`p-[0.4em] ${colourBg} ${roundedSize} ${colourtext} ${className} ${dmSans.className}`} {...props}>
            {children}
        </button>
    )
}