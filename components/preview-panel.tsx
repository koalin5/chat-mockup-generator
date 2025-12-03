"use client"

import type React from "react"
import type { Platform, ChatType, Participant, Message } from "./chat-mockup-generator"
import { TinderPreview } from "./previews/tinder-preview"
import { WhatsAppPreview } from "./previews/whatsapp-preview"
import { TelegramPreview } from "./previews/telegram-preview"
import { SignalPreview } from "./previews/signal-preview"
import { SlackPreview } from "./previews/slack-preview"
import { XPreview } from "./previews/x-preview"
import { SnapchatPreview } from "./previews/snapchat-preview"
import { RedditPreview } from "./previews/reddit-preview"
import { TikTokPreview } from "./previews/tiktok-preview"
import { WeChatPreview } from "./previews/wechat-preview"
import { MessengerPreview } from "./previews/messenger-preview"
import { InstagramPreview } from "./previews/instagram-preview"
import { TeamsPreview } from "./previews/teams-preview"
import { IMessagePreview } from "./previews/imessage-preview"

interface PreviewPanelProps {
  platform: Platform
  chatType: ChatType
  participants: Participant[]
  messages: Message[]
  previewRef: React.RefObject<HTMLDivElement | null>
}

export function PreviewPanel({ platform, chatType, participants, messages, previewRef }: PreviewPanelProps) {
  const previewProps = { chatType, participants, messages }

  return (
    <div className="flex-1 bg-muted/30 flex items-center justify-center p-8">
      <div ref={previewRef} className="w-[375px] h-[700px] rounded-3xl overflow-hidden shadow-2xl border border-border">
        {platform === "tinder" && <TinderPreview {...previewProps} />}
        {platform === "whatsapp" && <WhatsAppPreview {...previewProps} />}
        {platform === "telegram" && <TelegramPreview {...previewProps} />}
        {platform === "signal" && <SignalPreview {...previewProps} />}
        {platform === "slack" && <SlackPreview {...previewProps} />}
        {platform === "x" && <XPreview {...previewProps} />}
        {platform === "snapchat" && <SnapchatPreview {...previewProps} />}
        {platform === "reddit" && <RedditPreview {...previewProps} />}
        {platform === "tiktok" && <TikTokPreview {...previewProps} />}
        {platform === "wechat" && <WeChatPreview {...previewProps} />}
        {platform === "messenger" && <MessengerPreview {...previewProps} />}
        {platform === "instagram" && <InstagramPreview {...previewProps} />}
        {platform === "teams" && <TeamsPreview {...previewProps} />}
        {platform === "imessage" && <IMessagePreview {...previewProps} />}
      </div>
    </div>
  )
}
