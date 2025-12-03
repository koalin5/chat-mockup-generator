"use client"

import type { ChatType, Participant, Message } from "../chat-mockup-generator"
import { Phone, Video, Info } from "lucide-react"

interface MessengerPreviewProps {
  chatType: ChatType
  participants: Participant[]
  messages: Message[]
}

export function MessengerPreview({ participants, messages }: MessengerPreviewProps) {
  const other = participants.find((p) => p.id === "receiver")
  const you = participants.find((p) => p.id === "sender")

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header - Messenger style */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-100">
        <button className="text-[#0084FF]">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0084FF] to-[#00C6FF] flex items-center justify-center overflow-hidden">
          {other?.avatar ? (
            <img src={other.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white text-sm font-semibold">{other?.name?.[0]?.toUpperCase() || "?"}</span>
          )}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm text-gray-900">{other?.name || "User"}</p>
          <p className="text-xs text-gray-500">Active now</p>
        </div>
        <div className="flex items-center gap-4">
          <Phone className="w-5 h-5 text-[#0084FF]" />
          <Video className="w-5 h-5 text-[#0084FF]" />
          <Info className="w-5 h-5 text-[#0084FF]" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white">
        {messages.map((msg, index) => {
          const isYou = msg.senderId === "sender"
          const sender = participants.find((p) => p.id === msg.senderId)
          const showAvatar = !isYou && (index === messages.length - 1 || messages[index + 1]?.senderId !== msg.senderId)

          return (
            <div key={msg.id} className={`flex items-end gap-2 ${isYou ? "justify-end" : "justify-start"}`}>
              {!isYou && (
                <div className="w-7 h-7 flex-shrink-0">
                  {showAvatar && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0084FF] to-[#00C6FF] flex items-center justify-center overflow-hidden">
                      {sender?.avatar ? (
                        <img src={sender.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white text-[10px] font-semibold">
                          {sender?.name?.[0]?.toUpperCase() || "?"}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
              <div
                className={`max-w-[70%] px-4 py-2 rounded-full ${
                  isYou ? "bg-[#0084FF] text-white" : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 border-t border-gray-100">
        <button className="text-[#0084FF]">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M12 8v8M8 12h8" />
          </svg>
        </button>
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
          <p className="text-sm text-gray-400">Aa</p>
        </div>
        <button className="text-[#0084FF]">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
