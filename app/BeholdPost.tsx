"use client";

import { useEffect, useRef, useState } from "react";

interface BeholdPostData {
  permalink: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  caption?: string;
}

interface Props {
  feedId: string;
  index?: number;
}

export function BeholdPost({ feedId, index = 0 }: Props) {
  const [post, setPost] = useState<BeholdPostData | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/behold-post?feedId=${feedId}&index=${index}`)
      .then(r => r.json())
      .then((data: BeholdPostData) => {
        if (data?.permalink) setPost(data);
      })
      .catch(() => {});
  }, [feedId, index]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Mobile: autoplay on scroll into view
  useEffect(() => {
    if (!isMobile || post?.mediaType !== "VIDEO") return;
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [isMobile, post]);

  if (!post) return <div style={{ width: "100%", height: "100%", background: "#111" }} />;

  if (post.mediaType === "VIDEO") {
    return (
      <div
        ref={containerRef}
        onMouseEnter={() => { if (!isMobile) videoRef.current?.play().catch(() => {}); }}
        onMouseLeave={() => { if (!isMobile) videoRef.current?.pause(); }}
        style={{ position: "relative", width: "100%", height: "100%", background: "#000", overflow: "hidden" }}
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          poster={post.thumbnailUrl}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        >
          <source src={post.mediaUrl} type="video/mp4" />
        </video>
        <a
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ position: "absolute", inset: 0 }}
          aria-label={post.caption ?? "View on Instagram"}
        />
      </div>
    );
  }

  const imgSrc = post.mediaType === "CAROUSEL_ALBUM" ? (post.thumbnailUrl ?? post.mediaUrl) : post.mediaUrl;

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        alt={post.caption ?? "Instagram post"}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </a>
  );
}
