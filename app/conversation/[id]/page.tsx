'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

const APP_SCHEME = 'animalbond';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=animalbond.club';

export default function ConversationRedirectPage() {
  const params = useParams();
  const id = params?.id as string;
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    if (!id) return;
    const ua = navigator.userAgent || '';
    const mobile = /Android|iPhone|iPad|iPod/i.test(ua);
    setIsMobile(mobile);

    if (mobile) {
      window.location.href = `${APP_SCHEME}://conversation/${id}`;
      setTimeout(() => setAttempted(true), 2000);
    } else {
      setAttempted(true);
    }
  }, [id]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#FFF9F9',
      fontFamily: '-apple-system, Segoe UI, sans-serif',
      padding: '24px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🐾</div>
      <h1 style={{ color: '#FF6B6B', fontSize: 28, margin: '0 0 8px', fontWeight: 700 }}>
        AnimalBond
      </h1>

      {!attempted && isMobile && (
        <p style={{ color: '#888', fontSize: 16, marginTop: 16 }}>
          {t('conv_loading')}
        </p>
      )}

      {attempted && isMobile && (
        <div style={{ maxWidth: 480, marginTop: 16 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>💬</div>
          <h2 style={{ color: '#333', fontSize: 22, margin: '0 0 12px' }}>
            {t('conv_mobile_title')}
          </h2>
          <p style={{ color: '#555', fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
            {t('conv_mobile_body')}
            <br /><br />
            <strong>{t('conv_no_app')}</strong>
          </p>
          <a
            href={`${APP_SCHEME}://conversation/${id}`}
            style={{
              display: 'inline-block',
              background: '#FF6B6B',
              color: '#fff',
              padding: '14px 28px',
              borderRadius: 12,
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 16,
              marginBottom: 16,
            }}
          >
            {t('conv_open_btn')}
          </a>
          <br />
          <a
            href={PLAY_STORE_URL}
            style={{
              display: 'inline-block',
              background: '#fff',
              color: '#FF6B6B',
              padding: '12px 24px',
              borderRadius: 12,
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 14,
              border: '2px solid #FF6B6B',
            }}
          >
            {t('conv_play_btn')}
          </a>
        </div>
      )}

      {attempted && !isMobile && (
        <div style={{ maxWidth: 480, marginTop: 16 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📱</div>
          <h2 style={{ color: '#333', fontSize: 22, margin: '0 0 12px' }}>
            {t('conv_desktop_title')}
          </h2>
          <p style={{ color: '#555', fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
            {t('conv_desktop_body')}
            <br /><br />
            {t('conv_desktop_body2')}
          </p>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#FF6B6B',
              color: '#fff',
              padding: '14px 28px',
              borderRadius: 12,
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            {t('conv_play_btn')}
          </a>
          <p style={{ color: '#aaa', fontSize: 13, marginTop: 32 }}>
            {t('conv_ios_soon')}
          </p>
        </div>
      )}

      <p style={{ color: '#bbb', fontSize: 12, marginTop: 48 }}>
        <a href="https://animalbond.club" style={{ color: '#bbb', textDecoration: 'underline' }}>
          animalbond.club
        </a>
      </p>
    </div>
  );
}
