"use client"

import type { ChatType, Participant, Message } from "../chat-mockup-generator"
import { Video, Phone, MoreHorizontal, ChevronLeft, Paperclip, Smile, Send } from "lucide-react"

interface TeamsPreviewProps {
  chatType: ChatType
  participants: Participant[]
  messages: Message[]
}

export function TeamsPreview({ participants, messages }: TeamsPreviewProps) {
  const other = participants.find((p) => p.id === "receiver")

  return (
    <div className="h-full flex flex-col bg-[#F5F5F5]">
      {/* Header - Teams style */}
      <div className="bg-[#464775] px-4 py-3 flex items-center gap-3">
        <ChevronLeft className="w-5 h-5 text-white" />
        <div className="w-9 h-9 rounded-full bg-[#6264A7] flex items-center justify-center overflow-hidden">
          {other?.avatar ? (
            <img src={other.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white text-sm font-semibold">{other?.name?.[0]?.toUpperCase() || "?"}</span>
          )}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm text-white">{other?.name || "User"}</p>
          <p className="text-xs text-white/70">Available</p>
        </div>
        <div className="flex items-center gap-3">
          <Video className="w-5 h-5 text-white" />
          <Phone className="w-5 h-5 text-white" />
          <MoreHorizontal className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
        {messages.map((msg, index) => {
          const isYou = msg.senderId === "sender"
          const sender = participants.find((p) => p.id === msg.senderId)
          const showHeader = index === 0 || messages[index - 1]?.senderId !== msg.senderId

          return (
            <div key={msg.id} className={`flex ${isYou ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-2 max-w-[80%] ${isYou ? "flex-row-reverse" : ""}`}>
                {!isYou && showHeader && (
                  <div className="w-8 h-8 rounded-full bg-[#6264A7] flex items-center justify-center overflow-hidden flex-shrink-0">
                    {sender?.avatar ? (
                      <img src={sender.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white text-xs font-semibold">
                        {sender?.name?.[0]?.toUpperCase() || "?"}
                      </span>
                    )}
                  </div>
                )}
                {!isYou && !showHeader && <div className="w-8" />}
                <div>
                  {showHeader && (
                    <div className={`flex items-center gap-2 mb-1 ${isYou ? "justify-end" : ""}`}>
                      <span className="text-xs font-semibold text-gray-900">{isYou ? "You" : sender?.name}</span>
                      <span className="text-[10px] text-gray-500">
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  )}
                  <div
                    className={`px-3 py-2 rounded-lg ${
                      isYou ? "bg-[#E5E5F7] text-gray-900" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="bg-white px-4 py-3 border-t border-gray-200">
        <div className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-2">
          <Paperclip className="w-5 h-5 text-gray-500" />
          <div className="flex-1">
            <p className="text-sm text-gray-400">Type a new message</p>
          </div>
          <Smile className="w-5 h-5 text-gray-500" />
          <Send className="w-5 h-5 text-[#6264A7]" />
        </div>
      </div>
    </div>
  )
}
