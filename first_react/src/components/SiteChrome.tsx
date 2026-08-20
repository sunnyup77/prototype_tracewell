import { Link } from "@tanstack/react-router";

export function TopNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-white/5 text-sm font-mono tracking-widest text-muted-foreground uppercase">
      <div className="flex items-center gap-2 text-primary font-bold">
        <div className="w-4 h-4 bg-primary rounded-sm" />
        <span className="text-white normal-case font-serif text-xl tracking-normal">Tracewell</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="hover:text-primary transition-colors">Method</Link>
        <Link to="/" className="hover:text-primary transition-colors">Evidence</Link>
        <Link to="/" className="hover:text-primary transition-colors">Coverage</Link>
        <Link to="/" className="hover:text-primary transition-colors">Security</Link>
      </div>
      <div>
        <button className="text-primary hover:text-primary/80 transition-colors">Request Access</button>
      </div>
    </nav>
  );
}

export function ClosingSection() {
  return (
    <footer className="py-24 text-center border-t border-white/5 mt-32 text-muted-foreground text-sm font-mono relative z-10 bg-background">
      Observation Terminated.
    </footer>
  );
}
