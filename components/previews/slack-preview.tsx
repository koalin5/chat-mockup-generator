"use client"

import type { ChatType, Participant, Message } from "../chat-mockup-generator"

interface SlackPreviewProps {
  chatType: ChatType
  participants: Participant[]
  messages: Message[]
}

export function SlackPreview({ participants, messages }: SlackPreviewProps) {
  const receiver = participants.find((p) => p.id === "receiver")
  const sender = participants.find((p) => p.id === "sender")

  return (
    <div className="h-full flex flex-col bg-white text-[#1d1c1d]">
      {/* Header */}
      <div className="flex items-center gap-2 p-3 border-b border-[#e1e1e1]">
        <span className="text-lg font-bold">#{receiver?.name?.toLowerCase().replace(/\s+/g, "-") || "general"}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const msgSender = participants.find((p) => p.id === msg.senderId)
          return (
            <div key={msg.id} className="flex gap-2">
              <div className="w-9 h-9 rounded-lg bg-[#4a154b] overflow-hidden flex-shrink-0 flex items-center justify-center">
                {msgSender?.avatar ? (
                  <img src={msgSender.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-sm font-medium">{msgSender?.name?.[0]?.toUpperCase() || "?"}</span>
                )}
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-sm">{msgSender?.name || "User"}</span>
                  <span className="text-xs text-[#616061]">
                    {msg.timestamp.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                  </span>
                </div>
                <p className="text-sm text-[#1d1c1d]">{msg.content}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-[#e1e1e1]">
        <div className="border border-[#868686] rounded-lg px-3 py-2">
          <input
            type="text"
            placeholder={`Message #${receiver?.name?.toLowerCase().replace(/\s+/g, "-") || "general"}`}
            className="w-full text-sm placeholder:text-[#868686] focus:outline-none"
            readOnly
          />
        </div>
      </div>
    </div>
  )
}
