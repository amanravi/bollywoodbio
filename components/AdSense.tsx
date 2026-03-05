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
  const [isVisible, setIsVisible] = useState(false) // Start hidden
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
      
      // Show container only if ad has loaded
      if (hasIframe || hasHeight) {
        setIsVisible(true)
      }
    }

    // Check multiple times to catch slow-loading ads
    const timers = [
      setTimeout(checkAd, 1000),
      setTimeout(checkAd, 2000),
      setTimeout(checkAd, 3000),
      setTimeout(checkAd, 5000),
    ]

    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [])

  if (!ADSENSE_ENABLED || !ADSENSE_PUBLISHER_ID) {
    return null
  }

  const containerClass = `${styles.adContainer} ${styles[adFormat]} ${className || ''}`

  return (
    <div 
      ref={adRef} 
      className={containerClass} 
      style={{ 
        display: isVisible ? 'block' : 'none',
        margin: isVisible ? undefined : 0,
        height: isVisible ? undefined : 0,
        minHeight: isVisible ? undefined : 0
      }}
    >
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
