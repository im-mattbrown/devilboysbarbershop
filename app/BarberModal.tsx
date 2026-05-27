"use client";

import { useEffect, useRef, useState } from "react";

interface Service {
  name: string;
  time: string;
  price: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  instagram: string;
  instagramUrl: string;
  bookingUrl: string;
  description: string;
  videoSrc: string;
  services: Service[];
}

export function BarberModal({ isOpen, onClose, name, instagram, instagramUrl, bookingUrl, description, videoSrc, services }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isOpen) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#111",
          width: "100%",
          maxWidth: 720,
          maxHeight: isMobile ? "100vh" : "90vh",
          overflowY: "auto",
          padding: isMobile ? "24px 20px" : "40px",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            display: "block",
            marginLeft: "auto",
            background: "none",
            border: "none",
            color: "#888",
            fontSize: "1.5rem",
            cursor: "pointer",
            lineHeight: 1,
            marginBottom: "32px",
            padding: 0,
          }}
        >
          ✕
        </button>

        {/* Top row — video + name */}
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "flex-start", gap: isMobile ? "24px" : "32px", marginBottom: isMobile ? "32px" : "48px" }}>
          <div style={{ flexShrink: isMobile ? 0 : 0, width: isMobile ? "100%" : 180, overflow: "hidden", background: "#000" }}>
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              style={{ width: "100%", height: "auto", display: "block" }}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: isMobile ? 0 : "8px", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap", width: "100%", justifyContent: isMobile ? "space-between" : "flex-start" }}>
              <h2
                style={{
                  fontFamily: "var(--font-questrial), sans-serif",
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  fontWeight: 400,
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                {name}
              </h2>
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-questrial), sans-serif",
                  fontSize: "0.875rem",
                  letterSpacing: "0.1em",
                  color: "#fff",
                  border: "1px solid #fff",
                  padding: "12px 28px",
                  textDecoration: "none",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#fff";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#000";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                }}
              >
                Book Now
              </a>
            </div>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontFamily: "var(--font-questrial), sans-serif",
                fontSize: "0.95rem",
                color: "#aaa",
                textDecoration: "none",
                letterSpacing: "0.03em",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#aaa"; }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ display: "inline-block", verticalAlign: "middle", marginRight: "8px", flexShrink: 0 }}
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              {instagram}
            </a>
            <p
              style={{
                fontFamily: "var(--font-questrial), sans-serif",
                fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
                color: "#888",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {description}
            </p>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-questrial), sans-serif",
              fontSize: "0.75rem",
              fontWeight: 400,
              color: "#888",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            Services
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {services.map((s, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  fontFamily: "var(--font-questrial), sans-serif",
                  fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                  color: "#fff",
                  padding: "14px 0",
                  borderBottom: "1px solid #222",
                }}
              >
                <span style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
                  <span>{s.name}</span>
                  <span style={{ color: "#aaa" }}>{s.time}</span>
                </span>
                <span style={{ color: "#aaa" }}>{s.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
