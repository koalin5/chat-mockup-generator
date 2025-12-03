"use client"

import type { ChatType, Participant, Message } from "../chat-mockup-generator"
import { CheckCheck, Video, Phone, MoreVertical, Plus, Camera, Mic, Smile } from "lucide-react"

interface WhatsAppPreviewProps {
  chatType: ChatType
  groupChatName: string
  groupChatImage: string | null
  participants: Participant[]
  messages: Message[]
  isExporting?: boolean
}

// WhatsApp uses consistent colors for user names in groups
const whatsappNameColors = [
  "#06cf9c", // teal
  "#e09e36", // orange
  "#c25fff", // purple
  "#1398df", // blue
  "#df3c3c", // red
  "#15a048", // green
  "#eb5bc0", // pink
  "#f27746", // coral
]

// Assign colors based on participant index to ensure different users get different colors
const getUserNameColor = (participantId: string, participants: Participant[]) => {
  const index = participants.findIndex(p => p.id === participantId)
  return whatsappNameColors[index % whatsappNameColors.length]
}

export function WhatsAppPreview({ chatType, groupChatName, groupChatImage, participants, messages, isExporting = false }: WhatsAppPreviewProps) {
  const receiver = participants.find((p) => p.id === "receiver")
  const others = participants.filter((p) => p.id !== "sender")

  return (
    <div className="h-full flex flex-col bg-[#0b141a] text-white">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-[#1f2c34]">
        <button className="text-[#8696a0]">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <div className="w-10 h-10 rounded-full bg-[#2a3942] overflow-hidden flex-shrink-0">
          {chatType === "group" ? (
            groupChatImage ? (
              <img src={groupChatImage} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#8696a0]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-9 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 6c2.7 0 5.8 1.3 6 2v1H1.5v-1c.2-.7 3.3-2 6-2zm9 0c2.7 0 5.8 1.3 6 2v1h-6.5v-1c0-.5-.2-1-.5-1.5 1-.3 2-.5 3-.5z"/>
                </svg>
              </div>
            )
          ) : receiver?.avatar ? (
            <img src={receiver.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#8696a0]">
              {receiver?.name?.[0]?.toUpperCase() || "?"}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-[#e9edef] truncate text-[15px]">
            {chatType === "group"
              ? (groupChatName || "Group Chat")
              : (receiver?.name || "Contact")}
          </p>
          <p className="text-xs text-[#8696a0] truncate">
            {chatType === "group"
              ? others.map(p => p.name || "Unknown").filter(Boolean).join(", ")
              : "online"}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <Video className="w-5 h-5 text-[#8696a0]" />
          <Phone className="w-5 h-5 text-[#8696a0]" />
          <MoreVertical className="w-5 h-5 text-[#8696a0]" />
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-3 space-y-1"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23182229' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {messages.map((msg, index) => {
          const isSender = msg.senderId === "sender"
          const sender = participants.find((p) => p.id === msg.senderId)
          const showAvatar = !isSender && chatType === "group" && (index === messages.length - 1 || messages[index + 1]?.senderId !== msg.senderId)

          return (
            <div key={msg.id} className={`flex gap-1 ${isSender ? "justify-end" : "justify-start"}`}>
              {!isSender && chatType === "group" && (
                <div className="w-8 h-8 flex-shrink-0 mt-auto mb-1">
                  {showAvatar && (
                    <div className="w-8 h-8 rounded-full bg-[#2a3942] overflow-hidden flex items-center justify-center">
                      {sender?.avatar ? (
                        <img src={sender.avatar} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[#8696a0] text-xs">{sender?.name?.[0]?.toUpperCase() || "?"}</span>
                      )}
                    </div>
                  )}
                </div>
              )}
              <div className={`max-w-[75%] px-3 py-2 rounded-lg shadow ${isSender ? "bg-[#005c4b]" : "bg-[#1f2c34]"}`}>
                {!isSender && chatType === "group" && (
                  <p
                    className="text-xs font-semibold mb-1"
                    style={{ color: getUserNameColor(msg.senderId, participants) }}
                  >
                    {sender?.name || "Unknown"}
                  </p>
                )}
                <p className="text-[15px] text-[#e9edef] leading-[19px]">{msg.content}</p>
                <div className="flex items-center justify-end gap-1 mt-0.5">
                  <span className="text-[11px] text-[#8696a0]">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  {isSender && <CheckCheck className="w-4 h-4 text-[#53bdeb]" />}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="px-2 py-2 bg-[#1f2c34]">
        <div className="flex items-center gap-1">
          <button className="text-[#8696a0] p-1">
            <Plus className="w-6 h-6" />
          </button>
          <div className="flex-1 bg-[#2a3942] rounded-full px-3 py-2 flex items-center gap-2 min-w-0">
            <Smile className="w-5 h-5 text-[#8696a0] flex-shrink-0" />
            <span className="flex-1 text-[#8696a0] text-sm min-w-0">Message</span>
          </div>
          <button className="text-[#8696a0] p-1">
            <Camera className="w-5 h-5" />
          </button>
          <button className="text-[#8696a0] p-1">
            <Mic className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
