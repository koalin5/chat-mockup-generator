"use client"

import type { ChatType, Participant, Message } from "../chat-mockup-generator"

interface TikTokPreviewProps {
  groupChatName: string
  groupChatImage: string | null
  groupChatName: string
  groupChatImage: string | null
  chatType: ChatType
  participants: Participant[]
  messages: Message[]
}

export function TikTokPreview({ participants, messages }: TikTokPreviewProps) {
  const receiver = participants.find((p) => p.id === "receiver")

  return (
    <div className="h-full flex flex-col bg-black text-white">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 border-b border-[#2f2f2f]">
        <div className="w-10 h-10 rounded-full bg-[#25f4ee] overflow-hidden flex items-center justify-center">
          {receiver?.avatar ? (
            <img src={receiver.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-black font-bold">{receiver?.name?.[0]?.toUpperCase() || "?"}</span>
          )}
        </div>
        <div>
          <p className="font-semibold">{receiver?.name || "User"}</p>
          <p className="text-xs text-gray-400">@{receiver?.name?.toLowerCase().replace(/\s+/g, "") || "user"}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const isSender = msg.senderId === "sender"
          return (
            <div key={msg.id} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                  isSender ? "bg-[#fe2c55] text-white" : "bg-[#2f2f2f] text-white"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-[#2f2f2f]">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-[#2f2f2f] rounded-full px-4 py-2.5 text-sm text-gray-500">
            Send a message...
          </div>
        </div>
      </div>
    </div>
  )
}
