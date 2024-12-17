'use client';

import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const MiniProvider = dynamic(
  () => import('@lib/shared/MiniProvider').then(mod => ({ default: mod.MiniProvider })),
  { ssr: false }
);

export function Providers(props: { children: ReactNode, cookies: string | null }) {
  return (
    <MiniProvider cookies={props.cookies}>
        {props.children}
    </MiniProvider>
  );
}

