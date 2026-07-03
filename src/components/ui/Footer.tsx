
export function Footer() {
    return (
        <footer className=" border-t border-slate-200 bg-white/80">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm  md:flex-row text-slate-900">
                <p>© 2026 Salman Althof</p>
                <p> Built with <span className="font-medium text-slate-700">Next.js, TypeScript, Tailwind CSS, TanStack Query, and React Dropzone</span></p>
            </div>
        </footer>
    )
}