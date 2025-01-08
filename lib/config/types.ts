import type { User as TelegramUser } from '@telegram-apps/sdk';
import type { Context } from '@farcaster/frame-sdk';

export type MiniUser = TelegramUser | Context.FrameContext;
