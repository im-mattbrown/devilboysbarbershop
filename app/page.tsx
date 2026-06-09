"use client";

import { useRef, useEffect, useState } from "react";
import { VideoScrubber } from "./VideoScrubber";
import { BarberModal } from "./BarberModal";
import { BeholdPost } from "./BeholdPost";


function HeroSection() {
  const placeholderRef = useRef<HTMLVideoElement>(null);
  const mainRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const handleCanPlay = () => {
      main.style.opacity = "1";
      if (placeholderRef.current) {
        placeholderRef.current.style.opacity = "0";
      }
    };

    main.addEventListener("canplaythrough", handleCanPlay);
    return () => main.removeEventListener("canplaythrough", handleCanPlay);
  }, []);

  return (
    <section className="hero-section">
      {/* Placeholder — plays immediately from local file */}
      <video
        ref={placeholderRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 200,
          height: "auto",
          transition: "opacity 0.6s ease",
        }}
      >
        <source src="/vidoes/poleNew.mp4" type="video/mp4" />
      </video>

      {/* Main hero — fades in once buffered */}
      <video
        ref={mainRef}
        autoPlay
        muted
        loop
        playsInline
        className="hero-video-main"
        style={{
          opacity: 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <source
          src="https://matte-cdn.b-cdn.net/DB_Hero.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
        }}
      />

      {/* Logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/panama.png"
        alt="Devil Boys Barbershop"
        style={{
          position: "absolute",
          top: 32,
          left: 32,
          width: 120,
          height: 120,
          objectFit: "contain",
          animation: "fadeIn 1.2s ease forwards",
          zIndex: 10,
        }}
      />

      {/* Text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-questrial), sans-serif",
            fontSize: "clamp(2rem, 5vw, 5rem)",
            fontWeight: 400,
            color: "#fff",
            letterSpacing: "0.02em",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          Sacramento&apos;s Best Barbershop
        </h1>
        <p
          style={{
            fontFamily: "var(--font-questrial), sans-serif",
            fontSize: "clamp(1rem, 2.5vw, 1.75rem)",
            fontWeight: 400,
            color: "#e5e5e5",
            letterSpacing: "0.08em",
          }}
        >
          Our Words, Not Theirs
        </p>
      </div>
    </section>
  );
}

const PANAMA_SERVICES = [
  { name: "Short Hair Color (Going Lighter)", time: "3HR", price: "$160" },
  { name: "Short Hair Color (Going Darker)", time: "2HR", price: "$80" },
  { name: "Short Hair Relaxer", time: "2HR", price: "$70" },
  { name: "Bald Head (Straght Razor)", time: "1HR", price: "$60" },
  { name: "Barber Haircut", time: "30MIN", price: "$30" },
  { name: "Haircut / Beard", time: "45MIN", price: "$75" },
  { name: "Long Haircut", time: "2HR", price: "$80" },
  { name: "Face Shave (Straight Razor)", time: "30MIN", price: "$70" },
];

const NANDO_SERVICES = [
  { name: "Haircut", time: "30MIN", price: "$40" },
  { name: "Beard", time: "15MIN", price: "$30" },
  { name: "Hearcut & Beard", time: "45MIN", price: "$50" },
  { name: "Kids Haircut", time: "30MIN", price: "$30" },
];

export default function Home() {
  const [activeModal, setActiveModal] = useState<"panama" | "nando" | null>(null);

  useEffect(() => {
    if (document.querySelector('script[src="https://w.behold.so/widget.js"]')) return;
    const s = document.createElement("script");
    s.type = "module";
    s.src = "https://w.behold.so/widget.js";
    document.head.append(s);
  }, []);

  return (
    <main>
      <HeroSection />

      {/* Video Grid Section — 2 rows × 3 square columns */}
      <section
        style={{
          width: "100%",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          background: "#000",
        }}
      >
        {/* Row 1 */}
        <div
          className="barber-row"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            width: "100%",
          }}
        >
          <div className="barber-card-video" style={{ aspectRatio: "1 / 1", overflow: "hidden", background: "#111", position: "relative" }}>
            <VideoScrubber
              src="https://matte-cdn.b-cdn.net/panama_Follow.mp4"
              hoverSrc="https://matte-cdn.b-cdn.net/panamaVideo.mp4"
            />
          </div>

          {/* Row 1, Card 2 — Panama Instagram */}
          <div
            className="barber-card-ig"
            style={{ aspectRatio: "1 / 1", background: "#000", overflow: "hidden" }}
            dangerouslySetInnerHTML={{
              __html: '<behold-widget feed-id="ctYE5eWhcTuLRNJAXEcz" style="display:block;width:100%;height:100%"></behold-widget>',
            }}
          />

          {/* Row 1, Card 3 — Panama */}
          <div
            className="barber-card-bio"
            style={{
              aspectRatio: "1 / 1",
              background: "#111",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "40px",
              gap: "20px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-questrial), sans-serif",
                fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                fontWeight: 400,
                color: "#fff",
                lineHeight: 1,
              }}
            >
              Panama
            </h2>
            <p
              style={{
                fontFamily: "var(--font-questrial), sans-serif",
                fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
                color: "#888",
                lineHeight: 1.6,
              }}
            >
              Panama, the owner of Devil Boys Barbershop has over a decade of haircutting experience. His specializations include: straigt razor, scissor work, mixed curl haircuts, long and short haricuts and hair coloring, specifically platinum blondes. He enjoys playing musical instruments and restoring old cars. Panama is always happy to help any client reach their heir goals.
            </p>
            <a
              href="https://panamjbarbering8699.setmore.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                alignSelf: "flex-start",
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
            <button
              onClick={() => setActiveModal("panama")}
              style={{
                display: "inline-block",
                alignSelf: "flex-start",
                fontFamily: "var(--font-questrial), sans-serif",
                fontSize: "0.875rem",
                letterSpacing: "0.1em",
                color: "#000",
                background: "#fff",
                border: "1px solid #fff",
                padding: "12px 28px",
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "#fff";
                (e.currentTarget as HTMLButtonElement).style.color = "#000";
              }}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Row 2 */}
        <div
          className="barber-row"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            width: "100%",
          }}
        >
          {/* Row 2, Card 1 — Nando */}
          <div
            className="barber-card-bio"
            style={{
              aspectRatio: "1 / 1",
              background: "#111",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "40px",
              gap: "20px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-questrial), sans-serif",
                fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                fontWeight: 400,
                color: "#fff",
                lineHeight: 1,
              }}
            >
              Nando
            </h2>
            <p
              style={{
                fontFamily: "var(--font-questrial), sans-serif",
                fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
                color: "#888",
                lineHeight: 1.6,
              }}
            >
              Fernando, licensed professional barber has been cutting hair for 10 years. He specializes in curly hair, Edgar haircuts, sharp lines and crisp fades. Very detail oriented, passionate about his craft and friendly. He enjoys going to the gym and playing sports. Fernando is ready to service anyone that comes his way!
            </p>
            <a
              href="https://booksy.com/en-us/1763695_nandoblendz_barber-shop_134653_sacramento#ba_s=seo"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                alignSelf: "flex-start",
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
            <button
              onClick={() => setActiveModal("nando")}
              style={{
                display: "inline-block",
                alignSelf: "flex-start",
                fontFamily: "var(--font-questrial), sans-serif",
                fontSize: "0.875rem",
                letterSpacing: "0.1em",
                color: "#000",
                background: "#fff",
                border: "1px solid #fff",
                padding: "12px 28px",
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "#fff";
                (e.currentTarget as HTMLButtonElement).style.color = "#000";
              }}
            >
              Learn More
            </button>
          </div>

          {/* Row 2, Card 2 — Nando Instagram (second most recent post) */}
          <div className="barber-card-ig" style={{ aspectRatio: "1 / 1", overflow: "hidden", background: "#111" }}>
            <BeholdPost feedId="ctYE5eWhcTuLRNJAXEcz" index={1} />
          </div>

          <div className="barber-card-video" style={{ aspectRatio: "1 / 1", overflow: "hidden", background: "#111", position: "relative" }}>
            <VideoScrubber
              src="https://matte-cdn.b-cdn.net/nando_follow.mp4"
              startTime={2}
              hoverSrc="https://matte-cdn.b-cdn.net/nandoVideo.mp4"
            />
          </div>
        </div>
      </section>

      {/* Location Section — 2/3 video + 1/3 map */}
      <section
        className="location-section"
        style={{
          width: "100%",
          display: "flex",
          background: "#000",
          padding: "0 20px 20px",
          gap: "20px",
          minHeight: "500px",
        }}
      >
        <div className="location-header">
          <span className="location-header__title">Location</span>
          <a
            className="location-header__btn"
            href="https://maps.google.com/?q=Devil+Boys+Barbershop,+1527+21st+Street,+Sacramento,+CA+95811"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions
          </a>
        </div>

        <div className="location-video" style={{ flex: "2", overflow: "hidden", background: "#111" }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          >
            <source
              src="https://matte-cdn.b-cdn.net/DB_Location.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="location-map" style={{ flex: "1", overflow: "hidden" }}>
          <iframe
            title="Devil Boys Barbershop Location"
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=Devil+Boys+Barbershop,+1527+21st+Street,+Sacramento,+CA+95811&output=embed"
          />
        </div>
      </section>

      <footer
        style={{
          width: "100%",
          background: "#000",
          borderTop: "1px solid #222",
          padding: "20px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontFamily: "var(--font-questrial), sans-serif", fontSize: "0.75rem", color: "#888", letterSpacing: "0.04em", display: "flex", alignItems: "center", gap: "8px" }}>
          Website Designed and Built by Matt Brown from{" "}
          <a href="https://monomstud.io" target="_blank" rel="noopener noreferrer" style={{ color: "#888", textDecoration: "underline" }}>
            monom studio
          </a>
          <a href="mailto:m@monomstud.io" style={{ color: "#888", display: "inline-flex", alignItems: "center" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <polyline points="2,4 12,13 22,4" />
            </svg>
          </a>
        </span>
        <span style={{ fontFamily: "var(--font-questrial), sans-serif", fontSize: "0.75rem", color: "#888", letterSpacing: "0.04em" }}>
          Videography by{" "}
          <a href="https://rocketboycreative.com" target="_blank" rel="noopener noreferrer" style={{ color: "#888", textDecoration: "underline" }}>
            Milo Mendoza
          </a>
        </span>
      </footer>

      <BarberModal
        isOpen={activeModal === "panama"}
        onClose={() => setActiveModal(null)}
        name="Panama"
        instagram="@panamaelbarbero"
        instagramUrl="https://www.instagram.com/panamaelbarbero/"
        bookingUrl="https://panamjbarbering8699.setmore.com/"
        description="Panama, the owner of Devil Boys Barbershop has over a decade of haircutting experience. His specializations include: straigt razor, scissor work, mixed curl haircuts, long and short haricuts and hair coloring, specifically platinum blondes. He enjoys playing musical instruments and restoring old cars. Panama is always happy to help any client reach their heir goals."
        videoSrc="https://matte-cdn.b-cdn.net/panamaVideo.mp4"
        services={PANAMA_SERVICES}
      />
      <BarberModal
        isOpen={activeModal === "nando"}
        onClose={() => setActiveModal(null)}
        name="Nando"
        instagram="@nando_blendz"
        instagramUrl="https://www.instagram.com/nando_blendz/"
        bookingUrl="https://booksy.com/en-us/1763695_nandoblendz_barber-shop_134653_sacramento#ba_s=seo"
        description=" Fernando, licensed professional barber has been cutting hair for 10 years. He specializes in curly hair, Edgar haircuts, sharp lines and crisp fades. Very detail oriented, passionate about his craft and friendly. He enjoys going to the gym and playing sports. Fernando is ready to service anyone that comes his way!"
        videoSrc="https://matte-cdn.b-cdn.net/nandoVideo.mp4"
        services={NANDO_SERVICES}
      />
    </main>
  );
}
