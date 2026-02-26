// components/AdSlot.js
import { useEffect } from 'react';

export default function AdSlot({
  adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT,
  adSlot = '',
  style = {},
  className = '',
  responsive = true
}) {
  const enabled =
    process.env.NEXT_PUBLIC_ENABLE_ADSENSE === 'true' && !!adClient && !!adSlot;

  // Warn in dev if adSlot is missing
  if (process.env.NODE_ENV !== 'production' && !adSlot) {
    console.warn('[AdSlot] adSlot prop is required');
  }

  useEffect(() => {
    if (!enabled) return;

    // Push without checking window.adsbygoogle first — the || [] pattern
    // acts as a command queue and works before the script has loaded.
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('adsbygoogle push error', e?.message || e);
    }
  }, [enabled, adSlot]); // adSlot ensures re-push if slot changes

  if (!enabled) {
    // In production, render nothing — don't expose a visible placeholder
    if (process.env.NODE_ENV === 'production') return null;

    // In development, show a visual stand-in so layout is visible
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