'use client'

import { useEffect, useRef, useState } from 'react'
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
  const [isVisible, setIsVisible] = useState(true)
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if ad has loaded after a delay
    const checkAd = () => {
      if (!adRef.current) return

      const adElement = adRef.current.querySelector('.adsbygoogle') as HTMLElement
      if (!adElement) return

      // Check if ad has content (iframe means ad loaded successfully)
      const hasIframe = adElement.querySelector('iframe') !== null
      const hasHeight = adElement.offsetHeight > 0
      
      // If no ad content after 4 seconds, hide the container
      if (!hasIframe && !hasHeight) {
        setIsVisible(false)
      }
    }

    // Check multiple times to catch slow-loading ads
    const timers = [
      setTimeout(checkAd, 2000),
      setTimeout(checkAd, 4000),
      setTimeout(checkAd, 6000),
    ]

    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [])

  if (!ADSENSE_ENABLED || !ADSENSE_PUBLISHER_ID) {
    return null
  }

  if (!isVisible) {
    return null
  }

  const containerClass = `${styles.adContainer} ${styles[adFormat]} ${className || ''}`

  return (
    <div ref={adRef} className={containerClass}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: 0 }}
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
