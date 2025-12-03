"use client"

import type { ChatType, Participant, Message } from "../chat-mockup-generator"
import { CheckCheck } from "lucide-react"

interface TelegramPreviewProps {
  chatType: ChatType
  participants: Participant[]
  messages: Message[]
}

export function TelegramPreview({ participants, messages }: TelegramPreviewProps) {
  const receiver = participants.find((p) => p.id === "receiver")

  return (
    <div className="h-full flex flex-col bg-[#17212b] text-white">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-[#242f3d]">
        <div className="w-10 h-10 rounded-full bg-[#5288c1] overflow-hidden flex items-center justify-center">
          {receiver?.avatar ? (
            <img src={receiver.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white font-medium">{receiver?.name?.[0]?.toUpperCase() || "?"}</span>
          )}
        </div>
        <div>
          <p className="font-medium">{receiver?.name || "Contact"}</p>
          <p className="text-xs text-[#6c7883]">last seen recently</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => {
          const isSender = msg.senderId === "sender"
          return (
            <div key={msg.id} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] px-3 py-2 rounded-xl shadow ${
                  isSender ? "bg-[#2b5278] rounded-br-sm" : "bg-[#182533] rounded-bl-sm"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px] text-[#6c7883]">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  {isSender && <CheckCheck className="w-3 h-3 text-[#4fae4e]" />}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="p-3 bg-[#17212b] border-t border-[#0e1621]">
        <input
          type="text"
          placeholder="Write a message..."
          className="w-full bg-[#242f3d] rounded-lg px-4 py-2.5 text-sm placeholder:text-[#6c7883] focus:outline-none"
          readOnly
        />
      </div>
    </div>
  )
}
