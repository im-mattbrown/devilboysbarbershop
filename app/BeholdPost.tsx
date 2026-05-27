"use client";

import { useEffect, useState } from "react";

interface BeholdPostData {
  permalink: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  caption?: string;
}

interface Props {
  feedId: string;
  index?: number; // 0 = latest, 1 = second most recent, etc.
}

export function BeholdPost({ feedId, index = 0 }: Props) {
  const [post, setPost] = useState<BeholdPostData | null>(null);

  useEffect(() => {
    fetch(`/api/behold-post?feedId=${feedId}&index=${index}`)
      .then(r => r.json())
      .then((data: BeholdPostData) => {
        if (data?.permalink) setPost(data);
      })
      .catch(() => {});
  }, [feedId, index]);

  if (!post) return <div style={{ width: "100%", height: "100%", background: "#111" }} />;

  const imgSrc = post.mediaType === "VIDEO" ? post.thumbnailUrl ?? post.mediaUrl : post.mediaUrl;

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
