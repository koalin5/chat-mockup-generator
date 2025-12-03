"use client"

import type { ChatType, Participant, Message } from "../chat-mockup-generator"

interface SnapchatPreviewProps {
  groupChatName: string
  groupChatImage: string | null
  groupChatName: string
  groupChatImage: string | null
  chatType: ChatType
  participants: Participant[]
  messages: Message[]
}

export function SnapchatPreview({ participants, messages }: SnapchatPreviewProps) {
  const receiver = participants.find((p) => p.id === "receiver")

  return (
    <div className="h-full flex flex-col bg-white text-black">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-white border-b border-gray-100">
        <div className="w-10 h-10 rounded-full bg-[#fffc00] overflow-hidden flex items-center justify-center">
          {receiver?.avatar ? (
            <img src={receiver.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-black font-bold">{receiver?.name?.[0]?.toUpperCase() || "?"}</span>
          )}
        </div>
        <div>
          <p className="font-semibold">{receiver?.name || "Friend"}</p>
          <p className="text-xs text-gray-500">Snapchat</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((msg) => {
          const isSender = msg.senderId === "sender"
          return (
            <div key={msg.id} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                  isSender ? "bg-[#0fabff] text-white" : "bg-[#e5e5ea] text-black"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm text-gray-400">
            Send a chat
          </div>
          <button className="w-10 h-10 rounded-full bg-[#fffc00] flex items-center justify-center">
            <span className="text-black font-bold text-lg">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
