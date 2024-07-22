import { useState, useEffect } from "react"

import { useSelector } from "react-redux"
import { Typography } from "@mui/material"

const typingStatusStyle = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  WebkitLineClamp: 1,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical"
}

const TypingStatus = ({ chat }) => {
  const { usersTyping } = useSelector((state) => state.usersTyping)
  const [typingStatus, setTypingStatus] = useState(null)

  useEffect(() => {
    if (!chat) {
      setTypingStatus(null)
      return
    }

    if (!chat.isGroup) {
      if (usersTyping[chat.id]?.includes(chat.receiver.id)) {
        setTypingStatus(
          <Typography variant="caption" sx={typingStatusStyle}>
            typing...
          </Typography>
        )
      } else {
        setTypingStatus(null)
      }
      return
    }

    const typingUserIds = usersTyping[chat.id] || []

    const typingMembers = chat.members
      .filter((member) => typingUserIds.includes(member.id))
      .map((member) => member.username)

    if (typingMembers.length === 0) {
      setTypingStatus(null)
    } else if (typingMembers.length === 1) {
      setTypingStatus(
        <Typography variant="caption" sx={typingStatusStyle}>
          {typingMembers[0]} is typing...
        </Typography>
      )
    } else if (typingMembers.length === 2) {
      setTypingStatus(
        <Typography variant="caption" sx={typingStatusStyle}>
          {typingMembers.join(" and ")} are typing...
        </Typography>
      )
    } else {
      const othersCount = typingMembers.length - 1
      setTypingStatus(
        <Typography variant="caption" sx={typingStatusStyle}>
          {typingMembers[0]} and {othersCount} other
          {othersCount > 1 ? "s" : ""} are typing...
        </Typography>
      )
    }
  }, [chat, usersTyping])

  return typingStatus
}

export default TypingStatus
