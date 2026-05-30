'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import { useLanguage } from '@/context/LanguageContext';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=animalbond.club';
const DEEP_LINK_BASE = 'animalbond://auth/callback';

type Status = 'processing' | 'success' | 'error';

export default function AuthCallbackPage() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>('processing');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile
    const ua = navigator.userAgent || '';
    const mobile = /Android|iPhone|iPad|iPod/i.test(ua);
    setIsMobile(mobile);

    // Exchange code if present (for web-based confirmations like reset password)
    const processAuth = async () => {
      try {
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code') || url.hash.match(/code=([^&]+)/)?.[1];
        const access_token = url.hash.match(/access_token=([^&]+)/)?.[1];
        const refresh_token = url.hash.match(/refresh_token=([^&]+)/)?.[1];

        if (mobile) {
          // Pe mobile, încearcă să deschidă app-ul prin deep link
          const deepLink = `${DEEP_LINK_BASE}${window.location.search}${window.location.hash}`;
          window.location.href = deepLink;
          // Fallback: dacă nu se deschide app-ul în 2s, mergem la Play Store
          setTimeout(() => {
            setStatus('success');
          }, 2000);
          return;
        }

        // Pe desktop — exchange code și arată mesaj
        if (code) {
          const supabase = createClient();
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            console.error('Exchange error:', error);
            setStatus('error');
            return;
          }
        } else if (access_token && refresh_token) {
          const supabase = createClient();
          const { error } = await supabase.auth.setSession({ access_token, refresh_token });
          if (error) {
            setStatus('error');
            return;
          }
        }
        setStatus('success');
      } catch (err) {
        console.error('Auth callback error:', err);
        setStatus('error');
      }
    };

    processAuth();
  }, []);

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

      {status === 'processing' && (
        <>
          <p style={{ color: '#888', fontSize: 16, marginTop: 16 }}>
            {t('ac_signing_in')}
          </p>
          <div style={{
            marginTop: 16,
            width: 40,
            height: 40,
            border: '4px solid #FFE0E0',
            borderTop: '4px solid #FF6B6B',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </>
      )}

      {status === 'success' && (
        <div style={{ maxWidth: 480, marginTop: 16 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>✅</div>
          <h2 style={{ color: '#333', fontSize: 22, margin: '0 0 12px' }}>
            {isMobile ? t('ac_account_confirmed') : t('ac_auth_success')}
          </h2>

          {isMobile ? (
            <>
              <p style={{ color: '#555', fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
                {t('ac_open_app_mobile')}
                <br /><br />
                <strong>{t('ac_no_app')}</strong> {t('ac_download_free')}
              </p>
              <a
                href={PLAY_STORE_URL}
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
                📥 {t('ac_download_play')}
              </a>
            </>
          ) : (
            <>
              <p style={{ color: '#555', fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
                <strong>📱 {t('ac_is_mobile_app')}</strong>
                <br /><br />
                {t('ac_continue_desktop')}
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
                📥 {t('ac_download_play')}
              </a>
              <p style={{ color: '#aaa', fontSize: 13, marginTop: 32 }}>
                {t('ac_ios_soon')} 🍎
              </p>
            </>
          )}
        </div>
      )}

      {status === 'error' && (
        <div style={{ maxWidth: 480, marginTop: 16 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>⚠️</div>
          <h2 style={{ color: '#333', fontSize: 22, margin: '0 0 12px' }}>
            {t('ac_error_title')}
          </h2>
          <p style={{ color: '#555', fontSize: 15, lineHeight: 1.6 }}>
            {t('ac_error_msg')}
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
