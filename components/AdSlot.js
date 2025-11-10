// components/AdSlot.js
import { useEffect } from 'react';

export default function AdSlot({
  adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT,
  adSlot = '',
  style = {},
  className = '',
  responsive = true
}) {
  const enabled = process.env.NEXT_PUBLIC_ENABLE_ADSENSE === 'true' && !!adClient && !!adSlot;

  useEffect(() => {
    if (enabled && typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // non-fatal, just log
        // eslint-disable-next-line no-console
        console.warn('adsbygoogle push error', e?.message || e);
      }
    }
  }, [enabled]);

  if (!enabled) {
    return (
      <div
        className={className}
        style={{
          minHeight: 90,
          background: '#f3f4f6',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6b7280',
          ...style
        }}
      >
        <small>Ad placeholder</small>
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={responsive ? 'auto' : 'rectangle'}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
