"use client"

import type { ChatType, Participant, Message } from "../chat-mockup-generator"
import { CheckCheck } from "lucide-react"

interface WhatsAppPreviewProps {
  chatType: ChatType
  participants: Participant[]
  messages: Message[]
}

export function WhatsAppPreview({ participants, messages }: WhatsAppPreviewProps) {
  const receiver = participants.find((p) => p.id === "receiver")

  return (
    <div className="h-full flex flex-col bg-[#0b141a] text-white">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-[#1f2c34]">
        <div className="w-10 h-10 rounded-full bg-[#2a3942] overflow-hidden">
          {receiver?.avatar ? (
            <img src={receiver.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#8696a0]">
              {receiver?.name?.[0]?.toUpperCase() || "?"}
            </div>
          )}
        </div>
        <div className="flex-1">
          <p className="font-medium text-[#e9edef]">{receiver?.name || "Contact"}</p>
          <p className="text-xs text-[#8696a0]">online</p>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-3 space-y-1"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23182229' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {messages.map((msg) => {
          const isSender = msg.senderId === "sender"
          return (
            <div key={msg.id} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] px-3 py-2 rounded-lg shadow ${isSender ? "bg-[#005c4b]" : "bg-[#1f2c34]"}`}>
                <p className="text-sm text-[#e9edef]">{msg.content}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px] text-[#8696a0]">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  {isSender && <CheckCheck className="w-4 h-4 text-[#53bdeb]" />}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="p-2 bg-[#1f2c34]">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 bg-[#2a3942] text-[#e9edef] rounded-full px-4 py-2.5 text-sm placeholder:text-[#8696a0] focus:outline-none"
            readOnly
          />
        </div>
      </div>
    </div>
  )
}
