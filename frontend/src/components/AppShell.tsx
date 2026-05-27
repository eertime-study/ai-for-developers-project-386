import { Link } from 'react-router-dom'
import { CalendarDays } from 'lucide-react'
import type { ReactNode } from 'react'

export function AppShell({
  children,
  ownerTimeZone,
}: {
  children: ReactNode
  ownerTimeZone?: string
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-8">
      <header className="mb-6 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 text-foreground">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <CalendarDays className="h-5 w-5" />
          </span>
          <span className="text-2xl font-semibold tracking-tight">Call Calendar</span>
        </Link>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
        <span>© Call Calendar</span>
        {ownerTimeZone ? (
          <span>Все время указано в часовом поясе владельца: {ownerTimeZone}</span>
        ) : null}
      </footer>
    </div>
  )
}
