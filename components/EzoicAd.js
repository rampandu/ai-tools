// components/EzoicAd.js
import { useEffect, useId } from 'react';

export default function EzoicAd({ style = {}, className = '' }) {
  const id = useId();

  useEffect(() => {
    if (typeof window === 'undefined' || !window.ezstandalone) return;
    try {
      window.ezstandalone.cmd.push(function () {
        window.ezstandalone.showAds({});
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('[EzoicAd] showAds error', e?.message || e);
    }
  }, [id]);

  if (process.env.NODE_ENV !== 'production') {
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
          margin: '18px 0',
          ...style,
        }}
      >
        <small>Ezoic ad placeholder</small>
      </div>
    );
  }

  return <div className={className} style={{ margin: '18px 0', ...style }} />;
}
