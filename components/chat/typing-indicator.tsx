export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md bg-card px-4 py-3 shadow-sm">
        <span className="sr-only">MEESHO सहायक is typing</span>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-muted-foreground/60"
            style={{ animation: 'bob 1.2s infinite', animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
    </div>
  )
}
