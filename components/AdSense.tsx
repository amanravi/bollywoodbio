'use client'

import Script from 'next/script'
import { ADSENSE_PUBLISHER_ID, ADSENSE_ENABLED } from '@/lib/adsense-config'
import styles from './AdSense.module.css'

interface AdSenseProps {
  adSlot: string
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  className?: string
}

export default function AdSense({
  adSlot,
  adFormat = 'auto',
  className,
}: AdSenseProps) {
  if (!ADSENSE_ENABLED || !ADSENSE_PUBLISHER_ID) {
    return null
  }

  const containerClass = `${styles.adContainer} ${styles[adFormat]} ${className || ''}`

  return (
    <div className={containerClass}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
      <Script id={`adsense-${adSlot}`} strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </div>
  )
}
