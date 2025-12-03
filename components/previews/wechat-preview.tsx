"use client"

import type { ChatType, Participant, Message } from "../chat-mockup-generator"

interface WeChatPreviewProps {
  chatType: ChatType
  participants: Participant[]
  messages: Message[]
}

export function WeChatPreview({ participants, messages }: WeChatPreviewProps) {
  const receiver = participants.find((p) => p.id === "receiver")
  const sender = participants.find((p) => p.id === "sender")

  return (
    <div className="h-full flex flex-col bg-[#ededed] text-black">
      {/* Header */}
      <div className="flex items-center justify-center p-3 bg-[#ededed] border-b border-[#d9d9d9]">
        <p className="font-medium">{receiver?.name || "Chat"}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isSender = msg.senderId === "sender"
          const msgSender = participants.find((p) => p.id === msg.senderId)
          return (
            <div key={msg.id} className={`flex gap-2 ${isSender ? "flex-row-reverse" : "flex-row"}`}>
              <div className="w-10 h-10 rounded-sm bg-[#7bb32e] overflow-hidden flex-shrink-0 flex items-center justify-center">
                {msgSender?.avatar ? (
                  <img src={msgSender.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-medium">{msgSender?.name?.[0]?.toUpperCase() || "?"}</span>
                )}
              </div>
              <div className={`max-w-[65%] px-3 py-2 rounded-md relative ${isSender ? "bg-[#95ec69]" : "bg-white"}`}>
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="p-3 bg-[#f5f5f5] border-t border-[#d9d9d9]">
        <input
          type="text"
          placeholder="Enter message..."
          className="w-full bg-white rounded px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none border border-[#e5e5e5]"
          readOnly
        />
      </div>
    </div>
  )
}
