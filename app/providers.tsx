'use client';

import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const MiniProvider = dynamic(
  () => import('@/lib/providers/MiniProvider').then(mod => ({ default: mod.MiniProvider })),
  { ssr: false }
);

export function Providers(props: { children: ReactNode }) {
  return (
    <MiniProvider>
        {props.children}
    </MiniProvider>
  );
}

