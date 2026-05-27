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

  // Scrub the base video based on cursor angle
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      const container = containerRef.current;
      if (!video || !container || video.readyState < 2) return;

      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      // 0° = directly above, increases clockwise
      const angle = Math.atan2(dx, -dy);
      const angleDeg = ((angle * 180) / Math.PI + 360) % 360;

      // Map 0–360° → startTime to startTime+8 seconds
      video.currentTime = startTime + (angleDeg / 360) * 8;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [startTime]);

  // Play/pause the hover video when inCenter changes
  useEffect(() => {
    const hv = hoverVideoRef.current;
    if (!hv) return;
    if (inCenter) {
      hv.currentTime = 0;
      hv.play().catch(() => {});
    } else {
      hv.pause();
    }
  }, [inCenter]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverSrc) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const inBox = Math.abs(e.clientX - cx) <= 25 && Math.abs(e.clientY - cy) <= 25;
    setInCenter(inBox);
  }, [hoverSrc]);

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
      {/* Base scrub video */}
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
        }}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Hover video — crossfades in over the scrub video */}
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
            opacity: inCenter ? 1 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        >
          <source src={hoverSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
