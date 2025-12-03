"use client"

import type { ChatType, Participant, Message } from "../chat-mockup-generator"
import { Send } from "lucide-react"

interface TinderPreviewProps {
  chatType: ChatType
  participants: Participant[]
  messages: Message[]
}

export function TinderPreview({ participants, messages }: TinderPreviewProps) {
  const receiver = participants.find((p) => p.id === "receiver")
  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="h-full flex flex-col bg-black text-white">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-zinc-800">
        <div className="w-10 h-10 rounded-full bg-zinc-700 overflow-hidden">
          {receiver?.avatar ? (
            <img src={receiver.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-400">
              {receiver?.name?.[0]?.toUpperCase() || "?"}
            </div>
          )}
        </div>
        <div>
          <p className="font-medium">{receiver?.name || "Match"}</p>
          <p className="text-xs text-green-500">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <p className="text-center text-xs text-zinc-500">{today}</p>
        {messages.map((msg) => {
          const isSender = msg.senderId === "sender"
          return (
            <div key={msg.id} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                  isSender ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white" : "bg-zinc-800 text-white"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${isSender ? "text-white/70" : "text-zinc-500"}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-zinc-800 text-white rounded-full px-4 py-3 text-sm placeholder:text-zinc-500 focus:outline-none"
            readOnly
          />
          <button className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center">
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
