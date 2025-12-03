"use client"

import type React from "react"
import { useState, useRef, type RefObject } from "react"
import type { Platform, ChatType, Participant, Message } from "@/components/chat-mockup-generator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  ChevronUp,
  MessageSquare,
  Users,
  X,
  GripVertical,
  Trash2,
  Plus,
  Calendar,
  Upload,
  Download,
  Smartphone,
} from "lucide-react"
import {
  SiReddit,
  SiSignal,
  SiSlack,
  SiSnapchat,
  SiTelegram,
  SiTiktok,
  SiTinder,
  SiWechat,
  SiWhatsapp,
  SiMessenger,
  SiInstagram,
} from "react-icons/si"
import { FaXTwitter, FaApple } from "react-icons/fa6"
import html2canvas from "html2canvas-pro"

// Custom Teams icon since SiMicrosoftteams doesn't exist
const TeamsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.625 8.073c.574 0 1.125-.228 1.53-.634.407-.405.636-.955.636-1.528s-.229-1.123-.635-1.528a2.163 2.163 0 00-1.531-.634c-.574 0-1.125.228-1.53.634a2.163 2.163 0 00-.636 1.529c0 .573.229 1.123.635 1.528.406.406.957.634 1.531.634zm-4.125-2.04c1.055 0 1.91-.854 1.91-1.909S17.555 2.214 16.5 2.214s-1.91.855-1.91 1.91.855 1.91 1.91 1.91zm-2.25 9.375V9.783c0-.276.224-.5.5-.5h5.5c.276 0 .5.224.5.5v5.625c0 1.554-1.26 2.813-2.812 2.813h-1.25c-1.554 0-2.438-1.26-2.438-2.813zm-2.75-6.125c.966 0 1.75-.784 1.75-1.75s-.784-1.75-1.75-1.75-1.75.784-1.75 1.75.784 1.75 1.75 1.75zm5 2.5H8.25c-.69 0-1.25.56-1.25 1.25v4.75c0 2.071 1.679 3.75 3.75 3.75h2.5c2.071 0 3.75-1.679 3.75-3.75v-4.75c0-.69-.56-1.25-1.25-1.25h-.25z" />
  </svg>
)

const platforms: { id: Platform; name: string; icon: React.ReactNode }[] = [
  { id: "imessage", name: "iMessage", icon: <FaApple className="w-4 h-4" /> },
  { id: "whatsapp", name: "WhatsApp", icon: <SiWhatsapp className="w-4 h-4" /> },
  { id: "messenger", name: "Messenger", icon: <SiMessenger className="w-4 h-4" /> },
  { id: "instagram", name: "Instagram", icon: <SiInstagram className="w-4 h-4" /> },
  { id: "telegram", name: "Telegram", icon: <SiTelegram className="w-4 h-4" /> },
  { id: "signal", name: "Signal", icon: <SiSignal className="w-4 h-4" /> },
  { id: "slack", name: "Slack", icon: <SiSlack className="w-4 h-4" /> },
  { id: "teams", name: "Teams", icon: <TeamsIcon className="w-4 h-4" /> },
  { id: "snapchat", name: "Snapchat", icon: <SiSnapchat className="w-4 h-4" /> },
  { id: "tinder", name: "Tinder", icon: <SiTinder className="w-4 h-4" /> },
  { id: "x", name: "X", icon: <FaXTwitter className="w-4 h-4" /> },
  { id: "reddit", name: "Reddit", icon: <SiReddit className="w-4 h-4" /> },
  { id: "tiktok", name: "TikTok", icon: <SiTiktok className="w-4 h-4" /> },
  { id: "wechat", name: "WeChat", icon: <SiWechat className="w-4 h-4" /> },
]

interface EditorPanelProps {
  platform: Platform
  setPlatform: (platform: Platform) => void
  chatType: ChatType
  setChatType: (type: ChatType) => void
  groupChatName: string
  setGroupChatName: (name: string) => void
  groupChatImage: string | null
  setGroupChatImage: (image: string | null) => void
  participants: Participant[]
  updateParticipant: (id: string, updates: Partial<Participant>) => void
  addParticipant: () => void
  removeParticipant: (id: string) => void
  messages: Message[]
  addMessage: (senderId: string, content: string) => void
  updateMessage: (id: string, content: string) => void
  deleteMessage: (id: string) => void
  reorderMessages: (fromIndex: number, toIndex: number) => void
  updateMessageTimestamp: (id: string, timestamp: Date) => void
  isExporting: boolean
  setIsExporting: (isExporting: boolean) => void
  setExportDeviceType: (deviceType: "iphone" | "android" | null) => void
  previewRef: RefObject<HTMLDivElement | null>
}

export function EditorPanel({
  platform,
  setPlatform,
  chatType,
  setChatType,
  groupChatName,
  setGroupChatName,
  groupChatImage,
  setGroupChatImage,
  participants,
  updateParticipant,
  addParticipant,
  removeParticipant,
  messages,
  addMessage,
  updateMessage,
  deleteMessage,
  reorderMessages,
  updateMessageTimestamp,
  isExporting,
  setIsExporting,
  setExportDeviceType,
  previewRef,
}: EditorPanelProps) {
  const [newMessage, setNewMessage] = useState("")
  const [selectedSender, setSelectedSender] = useState<string>("sender")
  const [editingMessage, setEditingMessage] = useState<string | null>(null)
  const [editingContent, setEditingContent] = useState("")
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [openTimestampPicker, setOpenTimestampPicker] = useState<string | null>(null)
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})
  const groupImageInputRef = useRef<HTMLInputElement | null>(null)

  const handleAvatarUpload = (participantId: string, file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      updateParticipant(participantId, { avatar: e.target?.result as string })
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveAvatar = (participantId: string) => {
    updateParticipant(participantId, { avatar: null })
  }

  const handleNameChange = (participantId: string, name: string) => {
    updateParticipant(participantId, { name })
  }

  const handleAddMessage = () => {
    if (!newMessage.trim()) return
    addMessage(selectedSender, newMessage)
    setNewMessage("")
  }

  const handleEditMessage = (msgId: string) => {
    const msg = messages.find((m) => m.id === msgId)
    if (msg) {
      setEditingMessage(msgId)
      setEditingContent(msg.content)
    }
  }

  const handleSaveEdit = (msgId: string) => {
    updateMessage(msgId, editingContent)
    setEditingMessage(null)
    setEditingContent("")
  }

  const handleDeleteMessage = (msgId: string) => {
    deleteMessage(msgId)
  }

  const handleTimestampChange = (msgId: string, newTimestamp: Date) => {
    updateMessageTimestamp(msgId, newTimestamp)
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== index) {
      reorderMessages(draggedIndex, index)
      setDraggedIndex(index)
    }
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const getParticipantLabel = (participant: Participant) => {
    if (participant.id === "sender") {
      return "You (your messages appear on right)"
    }
    if (chatType === "dm") {
      return "Other Person (appears in chat header)"
    }
    return `Participant ${participants.findIndex((p) => p.id === participant.id)}`
  }

  const isDarkPlatform = ["tinder", "x", "tiktok", "snapchat"].includes(platform)

  const handleExport = async (deviceType: "iphone" | "android") => {
    if (!previewRef.current) return

    try {
      // Set export state (triggers status bar in preview)
      setExportDeviceType(deviceType)
      setIsExporting(true)

      // Wait for React to render status bar and content
      await new Promise((resolve) => setTimeout(resolve, 300))

      const previewElement = previewRef.current

      // Capture with html2canvas at 3x scale
      const canvas = await html2canvas(previewElement, {
        backgroundColor: null,
        scale: 3, // 3x for better quality (1125px width)
        useCORS: true,
        allowTaint: true,
        logging: false,
        imageTimeout: 0,
      })

      // Download directly
      const link = document.createElement("a")
      link.download = `chat-mockup-${platform}-${deviceType}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    } catch (error) {
      console.error("Failed to export:", error)
      alert(`Failed to export: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      // Reset export state
      setIsExporting(false)
      setExportDeviceType(null)
    }
  }

  return (
    <div className="w-full md:w-[400px] lg:w-[450px] border-r border-border bg-background flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border flex-shrink-0">
        <h1 className="text-xl font-bold">ChatForge</h1>
        <p className="text-sm text-muted-foreground">Create realistic chat mockups</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Platform Selection */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 border-b border-border hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              <span className="font-medium">Platform</span>
            </div>
            <ChevronUp className="w-4 h-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 border-b border-border">
            <div className="grid grid-cols-3 gap-2">
              {platforms.map((p) => (
                <Button
                  key={p.id}
                  variant={platform === p.id ? "default" : "outline"}
                  size="sm"
                  className="flex items-center gap-2 justify-start"
                  onClick={() => setPlatform(p.id)}
                >
                  {p.icon}
                  <span className="truncate text-xs">{p.name}</span>
                </Button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Chat Type */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 border-b border-border hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="font-medium">Type</span>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                {chatType === "dm" ? "Direct Message" : "Group Chat"}
              </span>
            </div>
            <ChevronUp className="w-4 h-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 border-b border-border space-y-3">
            <div className="flex gap-2">
              <Button
                variant={chatType === "dm" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setChatType("dm")}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Direct Message
              </Button>
              <Button
                variant={chatType === "group" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setChatType("group")}
              >
                <Users className="w-4 h-4 mr-2" />
                Group Chat
              </Button>
            </div>
            {chatType === "group" && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Group Chat Name</Label>
                  <Input
                    value={groupChatName}
                    onChange={(e) => setGroupChatName(e.target.value)}
                    placeholder="Enter group name (e.g., Family, Work Team)"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Group Profile Image</Label>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      {groupChatImage ? (
                        <AvatarImage src={groupChatImage} alt="Group" />
                      ) : (
                        <AvatarFallback>
                          <Users className="w-6 h-6" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => groupImageInputRef.current?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                      {groupChatImage && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setGroupChatImage(null)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={groupImageInputRef}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = (event) => {
                            setGroupChatImage(event.target?.result as string)
                          }
                          reader.readAsDataURL(file)
                        }
                        e.target.value = ""
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>

        {/* People */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 border-b border-border hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="font-medium">People</span>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{participants.length}</span>
            </div>
            <ChevronUp className="w-4 h-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 border-b border-border space-y-4">
            {participants.map((participant) => (
              <div key={participant.id} className="space-y-2">
                <Label className="text-xs text-muted-foreground">{getParticipantLabel(participant)}</Label>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Avatar className="h-10 w-10">
                    {participant.avatar ? (
                      <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                    ) : (
                      <AvatarFallback>{participant.name?.[0]?.toUpperCase() || "?"}</AvatarFallback>
                    )}
                  </Avatar>
                  <Input
                    value={participant.name}
                    onChange={(e) => handleNameChange(participant.id, e.target.value)}
                    placeholder={participant.id === "sender" ? "Your name" : "Their name"}
                    className="flex-1"
                  />
                  {chatType === "group" && participant.id !== "sender" && participants.length > 2 && (
                    <Button variant="ghost" size="icon" onClick={() => removeParticipant(participant.id)}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => fileInputRefs.current[participant.id]?.click()}
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={(el) => {
                        fileInputRefs.current[participant.id] = el
                      }}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleAvatarUpload(participant.id, file)
                        e.target.value = "" // Reset so same file can be selected again
                      }}
                    />
                  </div>
                  {participant.avatar && (
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveAvatar(participant.id)}>
                      <X className="w-4 h-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {chatType === "group" && (
              <Button variant="outline" className="w-full bg-transparent" onClick={addParticipant}>
                <Plus className="w-4 h-4 mr-2" />
                Add Participant
              </Button>
            )}
          </CollapsibleContent>
        </Collapsible>

        {/* Messages */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 border-b border-border hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="font-medium">Messages</span>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{messages.length}</span>
            </div>
            <ChevronUp className="w-4 h-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 border-b border-border space-y-4">
            {/* Sender Selection */}
            <div className="flex gap-2 flex-wrap">
              {participants.map((p) => (
                <Button
                  key={p.id}
                  variant={selectedSender === p.id ? "default" : "outline"}
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setSelectedSender(p.id)}
                >
                  <Avatar className="h-5 w-5">
                    {p.avatar ? (
                      <AvatarImage src={p.avatar || "/placeholder.svg"} alt={p.name} />
                    ) : (
                      <AvatarFallback className="text-[10px]">{p.name?.[0]?.toUpperCase() || "?"}</AvatarFallback>
                    )}
                  </Avatar>
                  <span className="truncate max-w-[60px]">{p.name || (p.id === "sender" ? "You" : "Other")}</span>
                </Button>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={`Type as ${participants.find((p) => p.id === selectedSender)?.name || "selected user"}...`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleAddMessage()
                  }
                }}
              />
              <Button onClick={handleAddMessage}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Message List */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {messages.map((msg, index) => {
                const sender = participants.find((p) => p.id === msg.senderId)
                const isSender = msg.senderId === "sender"
                return (
                  <div
                    key={msg.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-start gap-2 p-2 rounded-lg border ${
                      isSender ? "bg-primary/5 border-primary/20" : "bg-muted/30 border-border"
                    } ${draggedIndex === index ? "opacity-50" : ""}`}
                  >
                    <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab mt-1 flex-shrink-0" />
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      {sender?.avatar ? (
                        <AvatarImage src={sender.avatar || "/placeholder.svg"} alt={sender.name} />
                      ) : (
                        <AvatarFallback className="text-xs">{sender?.name?.[0]?.toUpperCase() || "?"}</AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <span className="font-medium truncate">{sender?.name || "Unknown"}</span>
                        <Popover open={openTimestampPicker === msg.id} onOpenChange={(open) => setOpenTimestampPicker(open ? msg.id : null)}>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer"
                              title="Click to edit date/time"
                            >
                              <Calendar className="w-3 h-3" />
                              <span className="text-xs">{msg.timestamp.toLocaleString()}</span>
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="center">
                            <div className="p-3 space-y-3">
                              <CalendarComponent
                                mode="single"
                                selected={msg.timestamp}
                                onSelect={(date) => {
                                  if (date) {
                                    const newDate = new Date(date)
                                    newDate.setHours(msg.timestamp.getHours())
                                    newDate.setMinutes(msg.timestamp.getMinutes())
                                    newDate.setSeconds(msg.timestamp.getSeconds())
                                    handleTimestampChange(msg.id, newDate)
                                  }
                                }}
                                initialFocus
                              />
                              <div className="flex items-center gap-2 border-t pt-3">
                                <Label htmlFor={`time-${msg.id}`} className="text-xs">Time:</Label>
                                <Input
                                  id={`time-${msg.id}`}
                                  type="time"
                                  className="h-8 text-xs"
                                  value={`${String(msg.timestamp.getHours()).padStart(2, '0')}:${String(msg.timestamp.getMinutes()).padStart(2, '0')}`}
                                  onChange={(e) => {
                                    const [hours, minutes] = e.target.value.split(':').map(Number)
                                    const newDate = new Date(msg.timestamp)
                                    newDate.setHours(hours || 0)
                                    newDate.setMinutes(minutes || 0)
                                    handleTimestampChange(msg.id, newDate)
                                  }}
                                />
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      {editingMessage === msg.id ? (
                        <div className="flex gap-2">
                          <Input
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                            className="text-sm"
                            autoFocus
                          />
                          <Button size="sm" onClick={() => handleSaveEdit(msg.id)}>
                            Save
                          </Button>
                        </div>
                      ) : (
                        <p
                          className="text-sm cursor-pointer hover:bg-muted/50 rounded px-1 -mx-1"
                          onClick={() => handleEditMessage(msg.id)}
                        >
                          {msg.content}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="flex-shrink-0 h-8 w-8"
                      onClick={() => handleDeleteMessage(msg.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                )
              })}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Export */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 border-b border-border hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span className="font-medium">Export</span>
            </div>
            <ChevronUp className="w-4 h-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 space-y-3">
            <p className="text-xs text-muted-foreground">Save your mockup with device status bar</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => handleExport("iphone")}
                disabled={isExporting}
              >
                <FaApple className="w-4 h-4 mr-2" />
                iPhone
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => handleExport("android")}
                disabled={isExporting}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Android
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}
