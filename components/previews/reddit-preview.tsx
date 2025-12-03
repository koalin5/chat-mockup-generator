"use client"

import type { ChatType, Participant, Message } from "../chat-mockup-generator"

interface RedditPreviewProps {
  chatType: ChatType
  groupChatName: string
  groupChatImage: string | null
  participants: Participant[]
  messages: Message[]
}

export function RedditPreview({ chatType, groupChatName, groupChatImage, participants, messages }: RedditPreviewProps) {
  const receiver = participants.find((p) => p.id === "receiver")
  const sender = participants.find((p) => p.id === "sender")
  const others = participants.filter((p) => p.id !== "sender")

  return (
    <div className="h-full flex flex-col bg-[#1a1a1b] text-[#d7dadc]">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-[#1a1a1b] border-b border-[#343536]">
        {chatType === "group" ? (
          <>
            {groupChatImage ? (
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img src={groupChatImage} alt="" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#ff4500] overflow-hidden flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-9 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 6c2.7 0 5.8 1.3 6 2v1H1.5v-1c.2-.7 3.3-2 6-2zm9 0c2.7 0 5.8 1.3 6 2v1h-6.5v-1c0-.5-.2-1-.5-1.5 1-.3 2-.5 3-.5z"/>
                </svg>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{groupChatName || "Group Chat"}</p>
              <p className="text-xs text-[#818384] truncate">{others.length} members</p>
            </div>
          </>
        ) : (
          <>
            <div className="w-8 h-8 rounded-full bg-[#ff4500] overflow-hidden flex items-center justify-center flex-shrink-0">
              {receiver?.avatar ? (
                <img src={receiver.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-bold text-xs">{receiver?.name?.[0]?.toUpperCase() || "?"}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">u/{receiver?.name?.replace(/\s+/g, "_") || "user"}</p>
            </div>
          </>
        )}
      </div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto p-4 ${chatType === "dm" ? "space-y-2" : "space-y-3"}`}>
        {messages.map((msg, index) => {
          const isSender = msg.senderId === "sender"
          const msgSender = participants.find((p) => p.id === msg.senderId)
          
          if (chatType === "dm") {
            // DM style: messages aligned left/right, no avatars on messages
            return (
              <div key={msg.id} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] px-3 py-2 rounded-lg ${isSender ? "bg-[#ff4500] text-white" : "bg-[#272729] text-[#d7dadc]"}`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <span className={`text-xs mt-1 block ${isSender ? "text-white/70" : "text-[#818384]"}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            )
          }
          
          // Group chat style: all messages left-aligned with avatars and usernames
          const showAvatar = index === 0 || messages[index - 1]?.senderId !== msg.senderId
          return (
            <div key={msg.id} className="flex gap-2">
              {showAvatar ? (
                <div className="w-8 h-8 rounded-full bg-[#ff4500] overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {msgSender?.avatar ? (
                    <img src={msgSender.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-xs font-bold">{msgSender?.name?.[0]?.toUpperCase() || "?"}</span>
                  )}
                </div>
              ) : (
                <div className="w-8 flex-shrink-0" />
              )}
              <div className="flex-1">
                {showAvatar && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-[#d7dadc]">
                      u/{msgSender?.name?.replace(/\s+/g, "_") || "user"}
                    </span>
                    <span className="text-xs text-[#818384]">
                      {msg.timestamp.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                    </span>
                  </div>
                )}
                {!showAvatar && (
                  <span className="text-xs text-[#818384] mb-1 block">
                    {msg.timestamp.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                  </span>
                )}
                <p className="text-sm text-[#d7dadc]">{msg.content}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-[#343536]">
        <div className="w-full bg-[#272729] border border-[#343536] rounded-full px-4 py-2.5 text-sm text-[#818384]">
          {chatType === "dm" 
            ? `Message u/${receiver?.name?.replace(/\s+/g, "_") || "user"}`
            : `Message ${groupChatName || "group"}`}
        </div>
      </div>
    </div>
  )
}
