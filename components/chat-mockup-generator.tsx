"use client"

import { useState, useRef } from "react"
import { EditorPanel } from "./editor-panel"
import { PreviewPanel } from "./preview-panel"

export type Platform =
  | "reddit"
  | "signal"
  | "slack"
  | "snapchat"
  | "telegram"
  | "tiktok"
  | "tinder"
  | "wechat"
  | "whatsapp"
  | "x"
  | "messenger"
  | "instagram"
  | "teams"
  | "imessage"

export type ChatType = "dm" | "group"

export interface Participant {
  id: string
  name: string
  avatar: string | null
}

export interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
}

export type DeviceType = "iphone" | "android"

export function Scripted() {
  const [platform, setPlatform] = useState<Platform>("imessage")
  const [chatType, setChatType] = useState<ChatType>("dm")
  const [groupChatName, setGroupChatName] = useState<string>("")
  const [groupChatImage, setGroupChatImage] = useState<string | null>(null)
  const [participants, setParticipants] = useState<Participant[]>([
    { id: "sender", name: "You", avatar: null },
    { id: "receiver", name: "", avatar: null },
  ])
  const [messages, setMessages] = useState<Message[]>([])
  const [isExporting, setIsExporting] = useState(false)
  const [exportDeviceType, setExportDeviceType] = useState<DeviceType | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const addMessage = (senderId: string, content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        senderId,
        content,
        timestamp: new Date(),
      },
    ])
  }

  const updateMessage = (id: string, content: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === id ? { ...msg, content } : msg)))
  }

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id))
  }

  const updateParticipant = (id: string, updates: Partial<Participant>) => {
    setParticipants((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  const addParticipant = () => {
    const newId = `participant-${crypto.randomUUID()}`
    setParticipants((prev) => [...prev, { id: newId, name: "", avatar: null }])
  }

  const removeParticipant = (id: string) => {
    // Don't allow removing sender or if only 2 participants left
    if (id === "sender" || participants.length <= 2) return
    setParticipants((prev) => prev.filter((p) => p.id !== id))
    // Also remove messages from this participant
    setMessages((prev) => prev.filter((msg) => msg.senderId !== id))
  }

  const reorderMessages = (fromIndex: number, toIndex: number) => {
    setMessages((prev) => {
      const newMessages = [...prev]
      const [removed] = newMessages.splice(fromIndex, 1)
      newMessages.splice(toIndex, 0, removed)
      return newMessages
    })
  }

  const updateMessageTimestamp = (id: string, newTimestamp: Date) => {
    setMessages((prev) => {
      const messageIndex = prev.findIndex((msg) => msg.id === id)
      if (messageIndex === -1) return prev

      const newMessages = [...prev]
      const oldTimestamp = newMessages[messageIndex].timestamp
      newMessages[messageIndex] = { ...newMessages[messageIndex], timestamp: newTimestamp }

      // Handle conflicts: ensure chronological order
      // If moved earlier, push subsequent messages forward
      if (newTimestamp < oldTimestamp) {
        for (let i = messageIndex + 1; i < newMessages.length; i++) {
          const prevMsgTime = newMessages[i - 1].timestamp
          const currentMsgTime = newMessages[i].timestamp

          // If current message is before or equal to previous, push it forward
          if (currentMsgTime <= prevMsgTime) {
            // Add 1-5 minutes randomly to make it look natural
            const offsetMs = (Math.floor(Math.random() * 4) + 1) * 60 * 1000
            newMessages[i] = {
              ...newMessages[i],
              timestamp: new Date(prevMsgTime.getTime() + offsetMs),
            }
          }
        }
      } else if (newTimestamp > oldTimestamp) {
        // If moved later, push previous messages backward if needed
        for (let i = messageIndex - 1; i >= 0; i--) {
          const nextMsgTime = newMessages[i + 1].timestamp
          const currentMsgTime = newMessages[i].timestamp

          // If current message is after or equal to next, push it backward
          if (currentMsgTime >= nextMsgTime) {
            // Subtract 1-5 minutes randomly to make it look natural
            const offsetMs = (Math.floor(Math.random() * 4) + 1) * 60 * 1000
            const newTime = new Date(nextMsgTime.getTime() - offsetMs)
            // Don't go before the previous message if it exists
            if (i > 0 && newTime <= newMessages[i - 1].timestamp) {
              newMessages[i] = {
                ...newMessages[i],
                timestamp: new Date(newMessages[i - 1].timestamp.getTime() + 60000), // 1 minute after previous
              }
            } else {
              newMessages[i] = {
                ...newMessages[i],
                timestamp: newTime,
              }
            }
          }
        }
      }

      // Sort messages by timestamp to ensure chronological order
      // This handles any edge cases where messages might still be out of order
      newMessages.sort((a, b) => {
        const timeDiff = a.timestamp.getTime() - b.timestamp.getTime()
        // If timestamps are equal (or very close), maintain original order as tiebreaker
        if (Math.abs(timeDiff) < 1000) {
          return prev.findIndex(m => m.id === a.id) - prev.findIndex(m => m.id === b.id)
        }
        return timeDiff
      })

      return newMessages
    })
  }

  const handleChatTypeChange = (type: ChatType) => {
    setChatType(type)
    if (type === "dm") {
      // Keep only sender and first other participant
      setParticipants((prev) => {
        const sender = prev.find((p) => p.id === "sender")!
        const firstOther = prev.find((p) => p.id !== "sender") || { id: "receiver", name: "", avatar: null }
        return [sender, { ...firstOther, id: "receiver" }]
      })
    }
  }

  return (
    <div className="flex h-full">
      <EditorPanel
        platform={platform}
        setPlatform={setPlatform}
        chatType={chatType}
        setChatType={handleChatTypeChange}
        groupChatName={groupChatName}
        setGroupChatName={setGroupChatName}
        groupChatImage={groupChatImage}
        setGroupChatImage={setGroupChatImage}
        participants={participants}
        updateParticipant={updateParticipant}
        addParticipant={addParticipant}
        removeParticipant={removeParticipant}
        messages={messages}
        addMessage={addMessage}
        updateMessage={updateMessage}
        deleteMessage={deleteMessage}
        reorderMessages={reorderMessages}
        updateMessageTimestamp={updateMessageTimestamp}
        isExporting={isExporting}
        setIsExporting={setIsExporting}
        setExportDeviceType={setExportDeviceType}
        previewRef={previewRef}
      />
      <PreviewPanel
        platform={platform}
        chatType={chatType}
        groupChatName={groupChatName}
        groupChatImage={groupChatImage}
        participants={participants}
        messages={messages}
        isExporting={isExporting}
        exportDeviceType={exportDeviceType}
        previewRef={previewRef}
      />
    </div>
  )
}
