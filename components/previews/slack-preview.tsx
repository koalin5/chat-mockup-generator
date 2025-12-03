"use client"

import type { ChatType, Participant, Message } from "../chat-mockup-generator"

interface SlackPreviewProps {
  chatType: ChatType
  groupChatName: string
  groupChatImage: string | null
  participants: Participant[]
  messages: Message[]
}

export function SlackPreview({ chatType, groupChatName, groupChatImage, participants, messages }: SlackPreviewProps) {
  const receiver = participants.find((p) => p.id === "receiver")
  const sender = participants.find((p) => p.id === "sender")
  const channelName = chatType === "group"
    ? (groupChatName || "general").toLowerCase().replace(/\s+/g, "-")
    : null
  const dmName = chatType === "dm" ? (receiver?.name || "User") : null

  return (
    <div className="h-full flex flex-col bg-white text-[#1d1c1d]">
      {/* Header */}
      <div className="flex items-center gap-2 p-3 border-b border-[#e1e1e1]">
        {chatType === "dm" ? (
          <>
            <div className="w-8 h-8 rounded-full bg-[#4a154b] overflow-hidden flex-shrink-0 flex items-center justify-center">
              {receiver?.avatar ? (
                <img src={receiver.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white text-xs font-medium">{receiver?.name?.[0]?.toUpperCase() || "?"}</span>
              )}
            </div>
            <span className="text-base font-semibold">{dmName}</span>
          </>
        ) : (
          <span className="text-lg font-bold">#{channelName}</span>
        )}
      </div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto p-4 ${chatType === "dm" ? "space-y-1" : "space-y-4"}`}>
        {messages.map((msg, index) => {
          const msgSender = participants.find((p) => p.id === msg.senderId)
          const isYou = msg.senderId === "sender"
          
          if (chatType === "dm") {
            // DM style: compact, no avatars, minimal styling
            const showName = index === 0 || messages[index - 1]?.senderId !== msg.senderId
            return (
              <div key={msg.id} className="flex flex-col gap-0.5">
                {showName && (
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-sm text-[#1d1c1d]">{isYou ? (sender?.name || "You") : (msgSender?.name || "User")}</span>
                    <span className="text-xs text-[#616061]">
                      {msg.timestamp.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                    </span>
                  </div>
                )}
                <p className={`text-sm text-[#1d1c1d] leading-relaxed ${showName ? "" : "ml-0"}`}>{msg.content}</p>
              </div>
            )
          }
          
          // Group/channel style: with avatars and names
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
          <div className="w-full text-sm text-[#868686]">
            {chatType === "dm" ? `Message ${dmName}` : `Message #${channelName}`}
          </div>
        </div>
      </div>
    </div>
  )
}
