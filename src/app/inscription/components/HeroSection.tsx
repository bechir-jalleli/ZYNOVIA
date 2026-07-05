import React, { useState, useEffect } from 'react';
import { User, LayoutGrid, Code2, FileText, ShieldCheck, Users } from 'lucide-react';
import DownloadModal from './DownloadModal';

const badgesData = [
  { title: 'Ingénieurs\nspécialisés IA', Icon: User, color: '#27397F' },
  { title: '80%\nPratique', Icon: LayoutGrid, color: '#3FA9DF' },
  { title: 'Python &\nMachine Learning', Icon: Code2, color: '#4490C7' },
  { title: 'Projets\nconcrets', Icon: FileText, color: '#0091E6' },
  { title: 'Certification\nincluse', Icon: ShieldCheck, color: '#3FA9DF' },
  { title: 'Groupes\nlimités', Icon: Users, color: '#27397F' },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      className="bg-transparent text-slate-900 dark:text-white"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '128px 0 48px',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background blobs */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}
      >
        <div
          style={{
            position: 'absolute',
            top: -160,
            right: -160,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 30% 30%, rgba(63,169,223,0.14), rgba(39,57,127,0.06) 55%, transparent 75%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: -200,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(63,169,223,0.08), transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1,
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'grid',
            gap: 48,
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 32,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h1
                className="hero-title text-[#0A004B] dark:text-white"
                style={{
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                  margin: 0,
                }}
              >
                Préparez votre enfant <br />
                aux métiers de demain <br />
                grâce à l'
                <span
                  style={{
                    background: 'linear-gradient(90deg, #27397F, #3FA9DF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Intelligence Artificielle
                </span>
              </h1>

              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p className="text-[#1e293b] dark:text-slate-200" style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
                  Les métiers évoluent. Les compétences aussi.
                </p>
                <p
                  className="text-[#475569] dark:text-slate-300"
                  style={{
                    fontSize: 16,
                    maxWidth: 640,
                    lineHeight: 1.6,
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  Chez ZYNOVIA, votre enfant apprend à utiliser l'IA pour créer, programmer,
                  résoudre des problèmes et réaliser des projets inspirés du monde professionnel.
                </p>
              </div>
            </div>

            {/* Badges */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: 16,
                width: '100%',
                marginTop: 8,
              }}
              className="hero-badges"
            >
              {badgesData.map((badge, idx) => {
                const IconEl = badge.Icon;
                return (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: 8,
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                      transition: `opacity 0.5s ease ${idx * 0.08}s, transform 0.5s ease ${idx * 0.08}s`,
                    }}
                  >
                    <div
                      className="bg-[#f8fafc] dark:bg-white/5 border border-[#f1f5f9] dark:border-white/10 text-slate-700 dark:text-slate-300"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                        color: badge.color,
                      }}
                    >
                      <IconEl size={22} strokeWidth={2} />
                    </div>
                    <span
                      className="text-[#334155] dark:text-slate-300"
                      style={{
                        fontWeight: 700,
                        fontSize: 11,
                        whiteSpace: 'pre-line',
                        lineHeight: 1.3,
                      }}
                    >
                      {badge.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap' }}>
              <button
                style={{
                  padding: '14px 32px',
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#fff',
                  background: 'linear-gradient(90deg, #27397F, #3FA9DF)',
                  border: 'none',
                  borderRadius: 12,
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(39,57,127,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Inscrire mon enfant
              </button>
              <button
                onClick={() => setDownloadModalOpen(true)}
                className="text-[#334155] dark:text-slate-200 bg-white dark:bg-white/5 border border-[#e2e8f0] dark:border-white/10"
                style={{
                  padding: '14px 32px',
                  fontSize: 15,
                  fontWeight: 600,
                  borderRadius: 12,
                  cursor: 'pointer',
                  transition: 'background 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Télécharger le programme
              </button>
            </div>
          </div>

          {/* Right column: image + founder card, full-bleed on large screens */}
          <div className="hero-image-col" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div
              className="hero-image-card"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 560,
                aspectRatio: '4 / 3',
                borderRadius: 32,
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                border: '1px solid #f1f5f9',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'scale(1)' : 'scale(0.96)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
              }}
            >
              <img
                src='/images/nos-formation/hero.png'
                alt="Préparation à l'Intelligence Artificielle"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15,23,42,0.6), transparent 60%)',
                  zIndex: 1,
                }}
              />

              {/* Left-edge fade, only shown on large screens where text and image sit on the same line */}
              <div className="hero-image-fade" aria-hidden="true" />

              {/* Founder card */}
              <div
                className="bg-white/95 dark:bg-slate-900/95 border border-[#f1f5f9] dark:border-white/10"
                style={{
                  position: 'relative',
                  zIndex: 2,
                  margin: 16,
                  padding: 16,
                  borderRadius: 16,
                  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: 64,
                    height: 64,
                    borderRadius: 12,
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '1px solid #e2e8f0',
                    background: '#f1f5f9',
                  }}
                >
                  <img
                    src='/images/nos-formation/wafanajahi.jpeg'
                    alt="Wafa NAJAHI"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top',
                      transform: 'scale(1.25)',
                    }}
                  />
                </div>
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <h4
                    className="text-[#0A004B] dark:text-white"
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      lineHeight: 1.3,
                      margin: 0,
                    }}
                  >
                    Un mot de la fondatrice
                  </h4>
                  <p
                    className="text-[#3FA9DF] dark:text-cyan-400"
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      marginTop: 2,
                      lineHeight: 1.4,
                      margin: '2px 0 0',
                    }}
                  >
                    Je suis Wafa NAJAHI, Cofondatrice et Directrice de ZYNOVIA Academy.
                  </p>
                  <p
                    className="text-[#475569] dark:text-slate-300"
                    style={{
                      fontSize: 11,
                      marginTop: 4,
                      lineHeight: 1.5,
                      fontWeight: 500,
                    }}
                  >
                    Notre mission est simple&nbsp;: donner aux jeunes les clés pour comprendre,
                    créer et maîtriser l'IA, grâce à une pédagogie pratique et des projets concrets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        :root {
          --fade-color: #ffffff;
          --fade-color-85: rgba(255, 255, 255, 0.85);
          --fade-color-30: rgba(255, 255, 255, 0.3);
        }
        .dark {
          --fade-color: #02051a;
          --fade-color-85: rgba(2, 5, 26, 0.85);
          --fade-color-30: rgba(2, 5, 26, 0.3);
        }
        .hero-title {
          font-size: clamp(24px, 3vw, 40px) !important;
        }
        .hero-grid { grid-template-columns: 1fr; }
        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 7fr 5fr; }
        }
        .hero-grid > div:first-child { align-items: center; text-align: center; }
        @media (min-width: 1024px) {
          .hero-grid > div:first-child { align-items: flex-start; text-align: left; }
        }
        @media (max-width: 639px) {
          .hero-badges { grid-template-columns: repeat(3, 1fr) !important; }
          .hero-image-col {
            width: 100%;
            padding: 0 4px;
          }
          .hero-image-card {
            max-width: 100% !important;
            width: 100% !important;
            aspect-ratio: 3 / 2 !important;
            max-height: 280px !important;
            border-radius: 20px !important;
          }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .hero-image-card {
            max-width: 480px !important;
            aspect-ratio: 4 / 3 !important;
          }
        }

        /* Left-edge fade is invisible by default (mobile / stacked layout) */
        .hero-image-fade {
          display: none;
        }

        /* Only when text and image sit on the same line (large screens):
           make the image bleed to the section edge and blur/fade its left side
           so it blends into the text column, matching the reference layout. */
        @media (min-width: 1024px) {
          .hero-image-col {
            justify-content: flex-end !important;
            margin-top: 40px;
            margin-right: 24px;
          }
          .hero-image-card {
            max-width: none !important;
            width: calc(100% + 140px) !important;
            margin-right: -96px;
            border-radius: 32px 0 0 32px !important;
            border-right: none !important;
            box-shadow: -25px 25px 50px -20px rgba(0,0,0,0.2) !important;
          }
          .hero-image-fade {
            display: block;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 180px;
            z-index: 1;
            pointer-events: none;
            background: linear-gradient(to right, var(--fade-color) 0%, var(--fade-color-85) 25%, var(--fade-color-30) 60%, transparent 100%);
            backdrop-filter: blur(6px);
            -webkit-mask-image: linear-gradient(to right, black 0%, black 40%, transparent 100%);
            mask-image: linear-gradient(to right, black 0%, black 40%, transparent 100%);
          }
        }
      `}</style>
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        pdfUrl="/uploads/programmes/5c9f9a33-5820-4582-a189-e4d76b84dd55.pdf"
      />
    </section>
  );
}