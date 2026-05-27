"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface Props {
  src: string;
  startTime?: number;
  hoverSrc?: string;
}

export function VideoScrubber({ src, startTime = 1, hoverSrc }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inCenter, setInCenter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Desktop: scrub base video on mouse move
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      const container = containerRef.current;
      if (!video || !container || video.readyState < 2) return;

      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const angle = Math.atan2(dx, -dy);
      const angleDeg = ((angle * 180) / Math.PI + 360) % 360;

      video.currentTime = startTime + (angleDeg / 360) * 8;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, startTime]);

  // Desktop: play/pause hover video when cursor enters center
  useEffect(() => {
    if (isMobile) return;
    const hv = hoverVideoRef.current;
    if (!hv) return;
    if (inCenter) {
      hv.currentTime = 0;
      hv.play().catch(() => {});
    } else {
      hv.pause();
    }
  }, [isMobile, inCenter]);

  // Mobile: autoplay hoverSrc video when scrolled into view
  useEffect(() => {
    if (!isMobile || !hoverSrc) return;
    const hv = hoverVideoRef.current;
    const container = containerRef.current;
    if (!hv || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hv.play().catch(() => {});
        } else {
          hv.pause();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [isMobile, hoverSrc]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !hoverSrc) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const inBox = Math.abs(e.clientX - cx) <= 25 && Math.abs(e.clientY - cy) <= 25;
    setInCenter(inBox);
  }, [isMobile, hoverSrc]);

  const handleMouseLeave = useCallback(() => {
    setInCenter(false);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ position: "absolute", inset: 0 }}
    >
      {/* Base scrub video — hidden on mobile */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "106%",
          height: "106%",
          transform: "translate(-50%, -50%)",
          objectFit: "cover",
          display: "block",
          opacity: isMobile ? 0 : 1,
        }}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Hover video — desktop: crossfades in on center hover; mobile: always visible, plays on scroll into view */}
      {hoverSrc && (
        <video
          ref={hoverVideoRef}
          muted
          playsInline
          loop
          preload="auto"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "106%",
            height: "106%",
            transform: "translate(-50%, -50%)",
            objectFit: "cover",
            opacity: isMobile ? 1 : inCenter ? 1 : 0,
            transition: isMobile ? "none" : "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        >
          <source src={hoverSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
