import type { User as TelegramUser } from '@telegram-apps/sdk';
import type { FrameContext } from '@farcaster/frame-sdk';

export type MiniUser = TelegramUser | FrameContext;
