import React from 'react';
import { PageRoute } from '../types';
import { CalendarCheck, Phone } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  page?: PageRoute;
}

export interface HeroTrustItem {
  value: string;
  label: string;
}

export interface PageHeroProps {
  breadcrumbs?: BreadcrumbItem[];
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  onNavigate: (page: PageRoute, hash?: string) => void;
  primaryCta?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryCta?: {
    label: string;
    onClick?: () => void;
    href?: string;
    icon?: React.ReactNode;
  };
  trustItems?: HeroTrustItem[];
  media?: {
    image: string;
    alt: string;
    badge?: string;
    floatCard?: {
      title: string;
      subtitle: string;
      icon?: React.ReactNode;
    };
  };
  compact?: boolean;
}

export const PageHero: React.FC<PageHeroProps> = ({
  breadcrumbs,
  eyebrow,
  title,
  lead,
  onNavigate,
  primaryCta,
  secondaryCta,
  trustItems,
  media,
  compact = false,
}) => {
  const handleNavClick = (e: React.MouseEvent, page?: PageRoute) => {
    e.preventDefault();
    if (page) {
      onNavigate(page);
    }
  };

  return (
    <section className={`hero unified-hero ${compact ? 'unified-hero--compact' : ''} ${media ? 'unified-hero--split' : 'unified-hero--single'}`}>
      <div className={`wrap ${media ? 'hero-grid' : 'hero-single-wrap'}`}>
        <div className="hero-content">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <ol
                itemScope
                itemType="https://schema.org/BreadcrumbList"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '.55em',
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                }}
              >
                {breadcrumbs.map((bc, idx) => {
                  const isLast = idx === breadcrumbs.length - 1;
                  return (
                    <li
                      key={idx}
                      itemProp="itemListElement"
                      itemScope
                      itemType="https://schema.org/ListItem"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '.55em' }}
                    >
                      {bc.page && !isLast ? (
                        <a
                          href={bc.page === 'home' ? '/' : `/${bc.page}`}
                          itemProp="item"
                          onClick={(e) => handleNavClick(e, bc.page)}
                        >
                          <span itemProp="name">{bc.label}</span>
                        </a>
                      ) : (
                        <span itemProp="name" aria-current={isLast ? 'page' : undefined} className="bc-current">
                          {bc.label}
                        </span>
                      )}
                      <meta itemProp="position" content={String(idx + 1)} />
                      {!isLast && <span className="bc-sep" aria-hidden="true">/</span>}
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}

          <div className="eyebrow-wrap">
            <span className="eyebrow">{eyebrow}</span>
          </div>

          <h1 className="display hero-h1">{title}</h1>

          <p className="lead hero-lead">{lead}</p>

          {(primaryCta || secondaryCta) && (
            <div className="hero-cta">
              {primaryCta && (
                <button
                  type="button"
                  className="btn btn-salmon"
                  onClick={primaryCta.onClick}
                >
                  {primaryCta.icon || <CalendarCheck className="w-4 h-4" />}
                  {primaryCta.label}
                </button>
              )}

              {secondaryCta && (
                secondaryCta.href ? (
                  <a
                    className="btn btn-ghost"
                    href={secondaryCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {secondaryCta.icon || <Phone className="w-4 h-4" />}
                    {secondaryCta.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={secondaryCta.onClick}
                  >
                    {secondaryCta.icon}
                    {secondaryCta.label}
                  </button>
                )
              )}
            </div>
          )}

          {trustItems && trustItems.length > 0 && (
            <div className="hero-trust">
              {trustItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <div className="div" aria-hidden="true" />}
                  <div className="ht">
                    <b>{item.value}</b>
                    <span>{item.label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {media && (
          <div className="hero-media">
            <div className="fig">
              <img src={media.image} alt={media.alt} loading="eager" />
            </div>
            {media.badge && <div className="hero-badge">{media.badge}</div>}
            {media.floatCard && (
              <div className="float-card">
                {media.floatCard.icon && (
                  <div className="fc-ic">{media.floatCard.icon}</div>
                )}
                <div>
                  <b>{media.floatCard.title}</b>
                  <span>{media.floatCard.subtitle}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
