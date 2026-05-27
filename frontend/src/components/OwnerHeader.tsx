import { Clock } from 'lucide-react'
import type { components } from '@/api/schema'

type Owner = components['schemas']['Owner']

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function OwnerHeader({ owner, subtitle }: { owner: Owner; subtitle?: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-muted text-xl font-medium text-foreground">
        {initials(owner.name)}
      </div>
      <div className="min-w-0">
        <div className="truncate text-2xl font-semibold text-foreground">{owner.name}</div>
        {subtitle ? (
          <div className="truncate text-sm text-muted-foreground">{subtitle}</div>
        ) : null}
        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>Часовой пояс: {owner.timeZone}</span>
        </div>
      </div>
    </div>
  )
}
