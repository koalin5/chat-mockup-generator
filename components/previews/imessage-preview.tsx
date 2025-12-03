import type { ChatType, Participant, Message } from "../chat-mockup-generator"
import { ChevronLeft, Video, Phone } from "lucide-react"

interface IMessagePreviewProps {
  chatType: ChatType
  participants: Participant[]
  messages: Message[]
}

export function IMessagePreview({ chatType, participants, messages }: IMessagePreviewProps) {
  const others = participants.filter((p) => p.id !== "sender")
  const headerName =
    chatType === "group" ? others.map((p) => p.name || "Unknown").join(", ") || "Group" : others[0]?.name || "Contact"

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
  }

  const shouldShowTimestamp = (index: number) => {
    if (index === 0) return true
    const prevMsg = messages[index - 1]
    const currMsg = messages[index]
    const diff = currMsg.timestamp.getTime() - prevMsg.timestamp.getTime()
    return diff > 60 * 60 * 1000
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-[#F6F6F6] px-2 py-2 flex items-center gap-2 border-b border-gray-200">
        <button className="flex items-center text-[#007AFF] text-sm">
          <ChevronLeft className="w-6 h-6" />
          <span className="text-[10px] bg-[#007AFF] text-white rounded-full w-5 h-5 flex items-center justify-center ml-[-4px]">
            3
          </span>
        </button>
        <div className="flex-1 flex flex-col items-center">
          {chatType === "group" ? (
            <div className="flex -space-x-2 mb-0.5">
              {others.slice(0, 3).map((p, i) => (
                <div
                  key={p.id}
                  className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden border-2 border-[#F6F6F6]"
                >
                  {p.avatar ? (
                    <img src={p.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-gray-600">{p.name?.[0]?.toUpperCase() || "?"}</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              {others[0]?.avatar ? (
                <img src={others[0].avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-600 text-sm">{others[0]?.name?.[0]?.toUpperCase() || "?"}</span>
              )}
            </div>
          )}
          <span className="text-xs font-medium text-black truncate max-w-[150px]">{headerName}</span>
        </div>
        <div className="flex gap-3">
          <Video className="w-5 h-5 text-[#007AFF]" />
          <Phone className="w-5 h-5 text-[#007AFF]" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1 bg-white">
        {messages.map((msg, index) => {
          const isYou = msg.senderId === "sender"
          const sender = participants.find((p) => p.id === msg.senderId)
          const showTimestamp = shouldShowTimestamp(index)

          return (
            <div key={msg.id}>
              {showTimestamp && (
                <div className="text-center text-xs text-gray-500 py-2">
                  {msg.timestamp.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })} at{" "}
                  {formatTime(msg.timestamp)}
                </div>
              )}
              <div className={`flex ${isYou ? "justify-end" : "justify-start"}`}>
                {!isYou && chatType === "group" && (
                  <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden mr-1 self-end mb-1">
                    {sender?.avatar ? (
                      <img src={sender.avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] text-gray-600">{sender?.name?.[0]?.toUpperCase() || "?"}</span>
                    )}
                  </div>
                )}
                <div
                  className={`max-w-[70%] px-3 py-2 rounded-2xl ${
                    isYou ? "bg-[#007AFF] text-white rounded-br-md" : "bg-[#E9E9EB] text-black rounded-bl-md"
                  }`}
                >
                  {!isYou && chatType === "group" && (
                    <p className="text-xs text-gray-500 mb-0.5">{sender?.name || "Unknown"}</p>
                  )}
                  <p className="text-[15px] leading-tight">{msg.content}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input Area */}
      <div className="bg-[#F6F6F6] px-3 py-2 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <button className="text-gray-500">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
            </svg>
          </button>
          <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-400 border border-gray-300">
            iMessage
          </div>
          <button className="text-[#007AFF]">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V6z" />
              <path d="M17 12c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V22h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="bg-white py-2 flex justify-center">
        <div className="w-32 h-1 bg-black rounded-full" />
      </div>
    </div>
  )
}
