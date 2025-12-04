# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application called "Scripted" that generates realistic chat mockups for various messaging platforms. Users can create fake conversations with customizable participants, messages, and timestamps, then export them as images with device status bars.

## Commands

### Development

```bash
npm run dev          # Start development server on localhost:3000
npm run build        # Build production bundle
npm start            # Start production server
npm run lint         # Run ESLint
```

## Architecture

### Core Components Structure

The application follows a two-panel layout:

1. **EditorPanel** (`components/editor-panel.tsx`) - Left sidebar containing:

   - Platform selector (14 platforms: iMessage, WhatsApp, Messenger, Instagram, Telegram, Signal, Slack, Teams, Snapchat, Tinder, X, Reddit, TikTok, WeChat)
   - Chat type selector (DM vs Group)
   - Participant management (avatars, names)
   - Message editor with drag-to-reorder, timestamp editing
   - Export functionality (iPhone/Android with status bars)

2. **PreviewPanel** (`components/preview-panel.tsx`) - Right side preview:

   - Fixed 375x700px phone mockup with rounded corners
   - Dynamically renders platform-specific UI
   - Used as source for html2canvas export

3. **Scripted** (`components/chat-mockup-generator.tsx`) - Root component:
   - Manages all state (platform, chatType, participants, messages)
   - Coordinates EditorPanel and PreviewPanel
   - Handles message CRUD operations and participant management

### Platform Previews

Each platform has a dedicated preview component in `components/previews/`:

- `[platform]-preview.tsx` - Implements platform-specific UI styling
- Each receives: `chatType`, `participants`, `messages` props
- Responsible for rendering accurate chat interface (colors, fonts, layouts)
- Examples: `whatsapp-preview.tsx`, `imessage-preview.tsx`, `telegram-preview.tsx`

### Data Model

```typescript
Platform = "imessage" | "whatsapp" | "messenger" | "instagram" | "telegram" |
           "signal" | "slack" | "teams" | "snapchat" | "tinder" | "x" |
           "reddit" | "tiktok" | "wechat"

ChatType = "dm" | "group"

Participant = {
  id: string          // "sender" for current user, "receiver" for DM, or generated ID
  name: string
  avatar: string | null  // base64 data URL
}

Message = {
  id: string          // crypto.randomUUID()
  senderId: string    // references Participant.id
  content: string
  timestamp: Date
}
```

### Key Behaviors

- **DM Mode**: Always exactly 2 participants (sender + receiver)
- **Group Mode**: 2+ participants, can add/remove (except sender)
- **Message Ordering**: Drag-to-reorder in editor, manual timestamp editing
- **Timestamp Logic**: When editing a timestamp earlier, subsequent messages auto-adjust forward by 1-5 minutes to maintain chronological order
- **Avatar Upload**: File input triggers base64 conversion, stored in participant state
- **Export**: Uses html2canvas-pro to capture preview, adds custom status bar with time (9:41), signal bars, battery, and Dynamic Island (iPhone) or camera punch-hole (Android)

### UI System

- Built with Radix UI primitives (`@radix-ui/*`)
- Tailwind CSS v4 for styling (PostCSS plugin: `@tailwindcss/postcss`)
- Custom components in `components/ui/` (button, input, avatar, collapsible, etc.)
- Utility function: `lib/utils.ts` exports `cn()` for className merging (clsx + tailwind-merge)

### Styling

- Dark/light theme support via platform-specific logic (e.g., `isDarkPlatform` checks for tinder, x, tiktok, snapchat)
- Platform colors hardcoded in preview components (e.g., WhatsApp: `#0b141a` bg, `#005c4b` sender bubbles)
- Collapsible sections in editor use Radix's Collapsible component

### Configuration Notes

- **TypeScript**: `ignoreBuildErrors: true` in next.config.mjs (consider fixing type errors before committing)
- **Images**: `unoptimized: true` (all images served as-is, no Next.js optimization)
- **Path Alias**: `@/*` maps to project root
- **No Test Suite**: No test configuration present

## Development Guidelines

### Adding a New Platform

1. Create `components/previews/[platform]-preview.tsx` implementing the preview UI
2. Add platform ID to `Platform` type in `chat-mockup-generator.tsx`
3. Import and render preview in `preview-panel.tsx`
4. Add platform metadata (name, icon) to `platforms` array in `editor-panel.tsx`

### Modifying Message Display

- Message rendering logic lives in each platform's preview component
- Sender vs receiver styling typically uses `msg.senderId === "sender"` check
- Timestamps formatted with `toLocaleTimeString()` or `toLocaleString()`

### Export Customization

Export logic in `editor-panel.tsx` `handleExport()`:

- Status bar height: 44px \* 2 (scale factor)
- Time display: hardcoded "9:41" (Apple's iconic time)
- Device-specific elements: Dynamic Island for iPhone, camera punch-hole for Android
- Background color determined by `isDarkPlatform` check
