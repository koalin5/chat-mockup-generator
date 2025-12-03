"use client"

import type { ChatType, Participant, Message } from "../chat-mockup-generator"

interface XPreviewProps {
  groupChatName: string
  groupChatImage: string | null
  groupChatName: string
  groupChatImage: string | null
  chatType: ChatType
  participants: Participant[]
  messages: Message[]
}

export function XPreview({ participants, messages }: XPreviewProps) {
  const receiver = participants.find((p) => p.id === "receiver")

  return (
    <div className="h-full flex flex-col bg-black text-white">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 border-b border-[#2f3336]">
        <div className="w-8 h-8 rounded-full bg-[#333639] overflow-hidden">
          {receiver?.avatar ? (
            <img src={receiver.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#71767b]">
              {receiver?.name?.[0]?.toUpperCase() || "?"}
            </div>
          )}
        </div>
        <p className="font-bold">{receiver?.name || "User"}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const isSender = msg.senderId === "sender"
          return (
            <div key={msg.id} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                  isSender ? "bg-[#1d9bf0] rounded-br-sm" : "bg-[#2f3336] rounded-bl-sm"
                }`}
              >
                <p className="text-[15px]">{msg.content}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-[#2f3336]">
        <div className="w-full bg-transparent border border-[#2f3336] rounded-full px-4 py-2.5 text-sm text-[#71767b]">
          Start a new message
        </div>
      </div>
    </div>
  )
}
