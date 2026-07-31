import { siteConfig } from '@/config/siteConfig'

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${siteConfig.url}${item.href}` } : {}),
    })),
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-[0.72rem] uppercase tracking-[0.06em] text-jsc-muted">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-jsc-line">/</span>}
            {item.href ? (
              <a href={item.href} className="hover:text-jsc-ink transition-colors no-underline">
                {item.label}
              </a>
            ) : (
              <span className="text-jsc-ink">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
