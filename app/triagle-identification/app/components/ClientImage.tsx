'use client';

import { useState, useEffect } from "react";

interface ClientImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  "aria-hidden"?: boolean;
}

export default function ClientImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  "aria-hidden": ariaHidden,
}: ClientImageProps) {
  const [ImageComponent, setImageComponent] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Dynamically import Next.js Image component only on client
    import("next/image").then((mod) => {
      setImageComponent(() => mod.default);
      setIsClient(true);
    });
  }, []);

  // Show nothing during SSR to completely avoid hydration mismatch
  if (!isClient || !ImageComponent) {
    return null;
  }

  return (
    <ImageComponent
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      aria-hidden={ariaHidden}
    />
  );
} 