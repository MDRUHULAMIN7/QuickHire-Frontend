import type { Metadata } from 'next';

export function buildMeta(title: string, description?: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}
