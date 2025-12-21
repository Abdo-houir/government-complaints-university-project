"use client";

import { Image, ImageProps, Skeleton, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchImage } from "./setup/api";

type Props = {
  endpoint: string;
  h: number | string;
  w: number | string;
  alt?: string;
  imageProps?: ImageProps;
};

export default function ImageFetcher({ endpoint, alt = "Image", h, w, imageProps }: Props) {
  const [src, setSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    fetchImage(endpoint)
      .then(url => {
        if (mounted) {
          setSrc(url);
          setError(null);
        }
      })
      .catch(err => {
        if (mounted) {
          console.error("Image fetch failed", err);
          setError("Failed to load image");
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [endpoint]);

  if (loading) return <Skeleton w={w} h={h} />;
  if (error) return <Text c="red">{error}</Text>;

  return (
    <Image
      src={src || ""}
      alt={alt}
      w={w}
      width={w}
      h={h}
      height={h}
      {...imageProps}
    />
  );
}
