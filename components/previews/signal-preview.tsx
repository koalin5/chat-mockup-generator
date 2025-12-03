"use client"

import type { ChatType, Participant, Message } from "../chat-mockup-generator"

interface SignalPreviewProps {
  chatType: ChatType
  groupChatName: string
  groupChatImage: string | null
  participants: Participant[]
  messages: Message[]
  isExporting?: boolean
}

export function SignalPreview({ chatType, groupChatName, groupChatImage, participants, messages, isExporting = false }: SignalPreviewProps) {
  const receiver = participants.find((p) => p.id === "receiver")
  const others = participants.filter((p) => p.id !== "sender")

  return (
    <div className="h-full flex flex-col bg-[#1b1c1f] text-white">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-[#1b1c1f] border-b border-[#2d2e33]">
        <div className="w-10 h-10 rounded-full bg-[#3a76f0] overflow-hidden flex items-center justify-center flex-shrink-0">
          {chatType === "group" ? (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-9 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 6c2.7 0 5.8 1.3 6 2v1H1.5v-1c.2-.7 3.3-2 6-2zm9 0c2.7 0 5.8 1.3 6 2v1h-6.5v-1c0-.5-.2-1-.5-1.5 1-.3 2-.5 3-.5z"/>
            </svg>
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
          {chatType === "group" && (
            <p className="text-xs text-gray-400 truncate">{others.length} members</p>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => {
          const isSender = msg.senderId === "sender"
          const sender = participants.find((p) => p.id === msg.senderId)
          return (
            <div key={msg.id} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] px-3 py-2 rounded-2xl ${isSender ? "bg-[#3a76f0]" : "bg-[#3b3c40]"}`}>
                {!isSender && chatType === "group" && (
                  <p className="text-xs font-semibold text-[#3a76f0] mb-1">{sender?.name || "Unknown"}</p>
                )}
                <p className="text-sm">{msg.content}</p>
                <p className="text-[10px] text-white/60 text-right mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="p-3 bg-[#1b1c1f] border-t border-[#2d2e33]">
        <div className="w-full bg-[#3b3c40] rounded-full px-4 py-2.5 text-sm text-[#8b8d92]">
          Signal message
        </div>
      </div>
    </div>
  )
}
