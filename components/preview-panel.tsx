"use client"

import type React from "react"
import type { Platform, ChatType, Participant, Message, DeviceType } from "./chat-mockup-generator"
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
import { IPhoneStatusBar, AndroidStatusBar } from "./status-bars"

interface PreviewPanelProps {
  platform: Platform
  chatType: ChatType
  groupChatName: string
  groupChatImage: string | null
  participants: Participant[]
  messages: Message[]
  isExporting: boolean
  exportDeviceType: DeviceType | null
  previewRef: React.RefObject<HTMLDivElement | null>
}

export function PreviewPanel({
  platform,
  chatType,
  groupChatName,
  groupChatImage,
  participants,
  messages,
  isExporting,
  exportDeviceType,
  previewRef
}: PreviewPanelProps) {
  const previewProps = { chatType, groupChatName, groupChatImage, participants, messages }

  // Determine if platform has dark theme
  const isDarkPlatform = ["tinder", "x", "tiktok", "snapchat"].includes(platform)

  return (
    <div className="flex-1 bg-muted/30 flex items-center justify-center p-8">
      <div
        ref={previewRef}
        className={isExporting
          ? "w-[375px] flex flex-col"
          : "w-[375px] h-[700px] rounded-3xl overflow-hidden shadow-2xl border border-border"
        }
      >
        {/* Status bar - separate section at top during export */}
        {isExporting && exportDeviceType === "iphone" && (
          <IPhoneStatusBar isDark={isDarkPlatform} />
        )}
        {isExporting && exportDeviceType === "android" && (
          <AndroidStatusBar isDark={isDarkPlatform} />
        )}

        {/* Platform previews */}
        <div className={isExporting ? "h-[700px] overflow-hidden" : "h-full"}>
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
    </div>
  )
}
