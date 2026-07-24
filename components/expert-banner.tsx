import Image from 'next/image'
import type { Lang } from '@/lib/games'
import { getExpertCopy } from '@/lib/expert'

interface ExpertBannerProps {
  lang: Lang
  /** Compact strip under short sections; full card under long articles */
  variant?: 'full' | 'compact'
}

export function ExpertBanner({ lang, variant = 'full' }: ExpertBannerProps) {
  const e = getExpertCopy(lang)
  const isCompact = variant === 'compact'

  return (
    <aside
      className={`expert-banner${isCompact ? ' expert-banner--compact' : ''}`}
      aria-label={`${e.eyebrow} ${e.name}`}
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="expert-banner__media">
        <div className="expert-banner__avatar">
          <Image
            src={e.avatar}
            alt={e.name}
            width={isCompact ? 72 : 112}
            height={isCompact ? 72 : 112}
            sizes={isCompact ? '72px' : '112px'}
            itemProp="image"
          />
        </div>
      </div>

      <div className="expert-banner__body">
        <p className="expert-banner__eyebrow">{e.eyebrow}</p>
        <h3 className="expert-banner__name" itemProp="name">
          {e.name}
        </h3>
        <p className="expert-banner__role" itemProp="jobTitle">
          {e.title}
        </p>
        <p className="expert-banner__cred" itemProp="hasCredential">
          {e.credentials}
        </p>

        {!isCompact && (
          <>
            <p className="expert-banner__bio" itemProp="description">
              {e.bio}
            </p>

            <div className="expert-banner__cols">
              <div>
                <p className="expert-banner__label">{e.experienceLabel}</p>
                <ul className="expert-banner__list">
                  {e.experience.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="expert-banner__label">{e.focusLabel}</p>
                <ul className="expert-banner__focus">
                  {e.focus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {isCompact && (
          <p className="expert-banner__bio expert-banner__bio--short" itemProp="description">
            {e.bio.length > 220 ? `${e.bio.slice(0, 217).trim()}…` : e.bio}
          </p>
        )}

        <p className="expert-banner__legal">{e.legal}</p>
      </div>
    </aside>
  )
}
