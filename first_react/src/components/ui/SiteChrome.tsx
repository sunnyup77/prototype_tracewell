export function TopNav() {
  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="/" className="flex items-center gap-3">
          <span className="grid h-4 w-4 grid-cols-2 grid-rows-2 overflow-hidden">
            <span className="bg-primary" />
            <span />
            <span />
            <span className="bg-primary" />
          </span>
          <span className="font-display text-xl tracking-tight">Tracewell</span>
        </a>
        <div className="hidden gap-8 md:flex">
          {["Method", "Evidence", "Coverage", "Security"].map((l) => (
            <span key={l} className="label-mono text-foreground/70">
              {l}
            </span>
          ))}
        </div>
        <span className="label-mono text-primary">Request access</span>
      </nav>
    </header>
  );
}

export function ClosingSection() {
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <h2 className="display-lg max-w-2xl">Observe what the web would rather you didn't.</h2>
        <form
          className="mt-10 flex max-w-lg flex-col gap-3 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Business email"
            className="flex-1 border border-input bg-glass px-4 py-3 font-mono text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
          <button
            type="submit"
            className="border border-primary bg-primary px-6 py-3 font-mono text-xs tracking-[0.2em] text-primary-foreground uppercase transition-opacity hover:opacity-85"
          >
            Request access
          </button>
        </form>
        <div className="mt-20 flex flex-wrap justify-between gap-6 border-t border-border pt-8">
          <span className="label-mono">Tracewell · digital observation</span>
          <span className="label-mono">Every claim retained with its source</span>
        </div>
      </div>
    </footer>
  );
}
