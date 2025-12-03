"use client"

import type { ChatType, Participant, Message } from "../chat-mockup-generator"
import { Phone, Video, Info, ChevronLeft, Heart } from "lucide-react"

interface InstagramPreviewProps {
  chatType: ChatType
  participants: Participant[]
  messages: Message[]
}

export function InstagramPreview({ participants, messages }: InstagramPreviewProps) {
  const other = participants.find((p) => p.id === "receiver")

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Header - Instagram DM style */}
      <div className="bg-black px-4 py-3 flex items-center gap-3 border-b border-gray-800">
        <ChevronLeft className="w-6 h-6 text-white" />
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] p-[2px]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
              {other?.avatar ? (
                <img src={other.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white text-xs font-semibold">{other?.name?.[0]?.toUpperCase() || "?"}</span>
              )}
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm text-white">{other?.name || "User"}</p>
          <p className="text-xs text-gray-400">Active now</p>
        </div>
        <div className="flex items-center gap-5">
          <Phone className="w-5 h-5 text-white" />
          <Video className="w-5 h-5 text-white" />
          <Info className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => {
          const isYou = msg.senderId === "sender"
          const sender = participants.find((p) => p.id === msg.senderId)
          const showAvatar = !isYou && (index === messages.length - 1 || messages[index + 1]?.senderId !== msg.senderId)

          return (
            <div key={msg.id} className={`flex items-end gap-2 ${isYou ? "justify-end" : "justify-start"}`}>
              {!isYou && (
                <div className="w-6 h-6 flex-shrink-0">
                  {showAvatar && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F58529] to-[#DD2A7B] flex items-center justify-center overflow-hidden">
                      {sender?.avatar ? (
                        <img src={sender.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white text-[8px] font-semibold">
                          {sender?.name?.[0]?.toUpperCase() || "?"}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
              <div
                className={`max-w-[70%] px-4 py-2 rounded-3xl ${
                  isYou
                    ? "bg-gradient-to-r from-[#405DE6] via-[#833AB4] to-[#C13584] text-white"
                    : "bg-gray-800 text-white"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="bg-black px-4 py-3 flex items-center gap-3 border-t border-gray-800">
        <button className="text-white">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8M12 8v8" />
          </svg>
        </button>
        <div className="flex-1 bg-gray-800 rounded-full px-4 py-2 border border-gray-700">
          <p className="text-sm text-gray-400">Message...</p>
        </div>
        <Heart className="w-6 h-6 text-white" />
      </div>
    </div>
  )
}
