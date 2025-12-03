"use client"

import type { ChatType, Participant, Message } from "../chat-mockup-generator"
import { CheckCheck } from "lucide-react"

interface TelegramPreviewProps {
  chatType: ChatType
  groupChatName: string
  groupChatImage: string | null
  participants: Participant[]
  messages: Message[]
  isExporting?: boolean
}

export function TelegramPreview({ chatType, groupChatName, groupChatImage, participants, messages, isExporting = false }: TelegramPreviewProps) {
  const receiver = participants.find((p) => p.id === "receiver")
  const others = participants.filter((p) => p.id !== "sender")

  return (
    <div className="h-full flex flex-col bg-[#17212b] text-white">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-[#242f3d]">
        <div className="w-10 h-10 rounded-full bg-[#5288c1] overflow-hidden flex items-center justify-center flex-shrink-0">
          {chatType === "group" ? (
            groupChatImage ? (
              <img src={groupChatImage} alt="" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-9 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 6c2.7 0 5.8 1.3 6 2v1H1.5v-1c.2-.7 3.3-2 6-2zm9 0c2.7 0 5.8 1.3 6 2v1h-6.5v-1c0-.5-.2-1-.5-1.5 1-.3 2-.5 3-.5z"/>
              </svg>
            )
          ) : receiver?.avatar ? (
            <img src={receiver.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white font-medium">{receiver?.name?.[0]?.toUpperCase() || "?"}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">
            {chatType === "group" ? (groupChatName || "Group Chat") : (receiver?.name || "Contact")}
          </p>
          <p className="text-xs text-[#6c7883] truncate">
            {chatType === "group"
              ? `${others.length} members`
              : "last seen recently"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => {
          const isSender = msg.senderId === "sender"
          const sender = participants.find((p) => p.id === msg.senderId)
          const showAvatar = !isSender && chatType === "group" && (index === messages.length - 1 || messages[index + 1]?.senderId !== msg.senderId)

          return (
            <div key={msg.id} className={`flex gap-2 ${isSender ? "justify-end" : "justify-start"}`}>
              {!isSender && chatType === "group" && (
                <div className="w-8 h-8 flex-shrink-0 mt-auto">
                  {showAvatar && (
                    <div className="w-8 h-8 rounded-full bg-[#5288c1] overflow-hidden flex items-center justify-center">
                      {sender?.avatar ? (
                        <img src={sender.avatar} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white text-xs font-medium">{sender?.name?.[0]?.toUpperCase() || "?"}</span>
                      )}
                    </div>
                  )}
                </div>
              )}
              <div
                className={`max-w-[75%] px-3 py-2 rounded-xl shadow ${
                  isSender ? "bg-[#2b5278] rounded-br-sm" : "bg-[#182533] rounded-bl-sm"
                }`}
              >
                {!isSender && chatType === "group" && (
                  <p className="text-xs font-semibold text-[#5288c1] mb-1">{sender?.name || "Unknown"}</p>
                )}
                <p className="text-sm">{msg.content}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px] text-[#6c7883]">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  {isSender && <CheckCheck className="w-3 h-3 text-[#4fae4e]" />}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="p-3 bg-[#17212b] border-t border-[#0e1621]">
        <div className="w-full bg-[#242f3d] rounded-lg px-4 py-2.5 text-sm text-[#6c7883]">
          Write a message...
        </div>
      </div>
    </div>
  )
}
