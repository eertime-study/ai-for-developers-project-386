import { Link } from 'react-router-dom'
import { ChevronRight, Clock, CalendarRange } from 'lucide-react'
import type { components } from '@/api/schema'

type EventType = components['schemas']['EventType']

export function EventTypeCard({ eventType }: { eventType: EventType }) {
  return (
    <Link
      to={`/event-types/${encodeURIComponent(eventType.id)}`}
      className="group flex items-center gap-4 rounded-lg border border-border bg-background p-4 transition hover:border-foreground/30 hover:shadow-sm"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        <CalendarRange className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-base font-medium text-foreground">{eventType.title}</div>
        {eventType.description ? (
          <div className="line-clamp-2 text-sm text-muted-foreground">{eventType.description}</div>
        ) : null}
      </div>
      <div className="hidden shrink-0 items-center gap-1.5 text-sm text-muted-foreground sm:flex">
        <Clock className="h-4 w-4" />
        <span>{eventType.durationInMinutes} мин</span>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-foreground" />
    </Link>
  )
}
