"use client"

import type { ChatType, Participant, Message } from "../chat-mockup-generator"

interface RedditPreviewProps {
  chatType: ChatType
  participants: Participant[]
  messages: Message[]
}

export function RedditPreview({ participants, messages }: RedditPreviewProps) {
  const receiver = participants.find((p) => p.id === "receiver")

  return (
    <div className="h-full flex flex-col bg-[#1a1a1b] text-[#d7dadc]">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-[#1a1a1b] border-b border-[#343536]">
        <div className="w-8 h-8 rounded-full bg-[#ff4500] overflow-hidden flex items-center justify-center">
          {receiver?.avatar ? (
            <img src={receiver.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white font-bold text-xs">{receiver?.name?.[0]?.toUpperCase() || "?"}</span>
          )}
        </div>
        <div>
          <p className="font-medium text-sm">u/{receiver?.name?.replace(/\s+/g, "_") || "user"}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const isSender = msg.senderId === "sender"
          const msgSender = participants.find((p) => p.id === msg.senderId)
          return (
            <div key={msg.id} className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-[#ff4500] overflow-hidden flex-shrink-0 flex items-center justify-center">
                {msgSender?.avatar ? (
                  <img src={msgSender.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-xs font-bold">{msgSender?.name?.[0]?.toUpperCase() || "?"}</span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-[#d7dadc]">
                    u/{msgSender?.name?.replace(/\s+/g, "_") || "user"}
                  </span>
                  <span className="text-xs text-[#818384]">
                    {msg.timestamp.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                  </span>
                </div>
                <p className="text-sm text-[#d7dadc]">{msg.content}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-[#343536]">
        <input
          type="text"
          placeholder="Message"
          className="w-full bg-[#272729] border border-[#343536] rounded-full px-4 py-2.5 text-sm placeholder:text-[#818384] focus:outline-none focus:border-[#d7dadc]"
          readOnly
        />
      </div>
    </div>
  )
}
