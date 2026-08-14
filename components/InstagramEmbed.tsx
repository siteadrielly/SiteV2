"use client";

import { useEffect, useRef } from "react";

export default function InstagramEmbed() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const script = document.createElement("script");
            script.src = "https://www.instagram.com/embed.js";
            script.async = true;
            document.body.appendChild(script);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "400px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex justify-center px-4">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/draadrielyanute/?utm_source=ig_embed&utm_campaign=loading"
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: 3,
          boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
          margin: 1,
          maxWidth: 540,
          minWidth: 326,
          padding: 0,
          width: "99%",
        }}
      >
        <div style={{ padding: 16 }}>
          <a
            href="https://www.instagram.com/draadrielyanute/?utm_source=ig_embed&utm_campaign=loading"
            style={{ background: "#FFFFFF", lineHeight: 0, padding: 0, textAlign: "center", textDecoration: "none", width: "100%" }}
            target="_blank"
            rel="noreferrer"
          >
            Ver este perfil no Instagram
          </a>
        </div>
      </blockquote>
    </div>
  );
}
