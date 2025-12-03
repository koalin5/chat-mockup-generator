"use client"

import type { ChatType, Participant, Message } from "../chat-mockup-generator"

interface SignalPreviewProps {
  chatType: ChatType
  participants: Participant[]
  messages: Message[]
}

export function SignalPreview({ participants, messages }: SignalPreviewProps) {
  const receiver = participants.find((p) => p.id === "receiver")

  return (
    <div className="h-full flex flex-col bg-[#1b1c1f] text-white">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-[#1b1c1f] border-b border-[#2d2e33]">
        <div className="w-10 h-10 rounded-full bg-[#3a76f0] overflow-hidden flex items-center justify-center">
          {receiver?.avatar ? (
            <img src={receiver.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white font-medium">{receiver?.name?.[0]?.toUpperCase() || "?"}</span>
          )}
        </div>
        <p className="font-medium">{receiver?.name || "Contact"}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => {
          const isSender = msg.senderId === "sender"
          return (
            <div key={msg.id} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] px-3 py-2 rounded-2xl ${isSender ? "bg-[#3a76f0]" : "bg-[#3b3c40]"}`}>
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
        <input
          type="text"
          placeholder="Signal message"
          className="w-full bg-[#3b3c40] rounded-full px-4 py-2.5 text-sm placeholder:text-[#8b8d92] focus:outline-none"
          readOnly
        />
      </div>
    </div>
  )
}
