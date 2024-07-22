import { useState } from "react"
import { useSelector } from "react-redux"

import { Avatar, Paper, Stack, Typography } from "@mui/material"

import formatTime from "../../utils/formatTime"
import getProfileImg from "../../utils/getProfileImg"

const maxChars = 200

const Message = ({ message }) => {
  const { user } = useSelector((state) => state.user)

  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => setExpanded(!expanded)

  const renderContent = () => {
    if (message.content.length <= maxChars) return message.content

    if (expanded) {
      return (
        <>
          {message.content}
          <Typography
            onClick={toggleExpanded}
            sx={{
              cursor: "pointer",
              userSelect: "none"
            }}
          >
            ...read less
          </Typography>
        </>
      )
    } else {
      return (
        <>
          {message.content.slice(0, maxChars)}...
          <Typography
            onClick={toggleExpanded}
            sx={{
              cursor: "pointer",
              userSelect: "none"
            }}
          >
            ...read more
          </Typography>
        </>
      )
    }
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent={
        message.sentBy.id === user.id ? "flex-end" : "flex-start"
      }
      gap={1}
      sx={{
        width: "100%"
      }}
    >
      {
        message.sentBy.id === user.id ? (
          <>
            <Stack
              sx={{
                maxWidth: "70%"
              }}
            >
              <Paper
                elevation={5}
                sx={{
                  backgroundColor: "rgba(35, 181, 211, 0.5)",
                  p: 1,
                  borderRadius: 0,
                  borderTopLeftRadius: "5px",
                  borderBottomRightRadius: "5px"
                }}
              >
                {renderContent()}
              </Paper>
              <Typography variant="caption" sx={{ textAlign: "right" }}>{formatTime(message.createdAt)}</Typography>
            </Stack>
            <Avatar
              alt={`${message.sentBy.username}`}
              src={getProfileImg({
                gender: user.gender,
                username: user.username
              })}
              sx={{
                width: 24,
                height: 24,
                alignSelf: "flex-start"
              }}
            />
          </>
        ) : (
          <>
            <Avatar
              alt={`${message.sentBy.username}`}
              src={getProfileImg({
                gender: message.sentBy.gender,
                username: message.sentBy.username
              })}
              sx={{
                width: 24,
                height: 24,
                alignSelf: "flex-start"
              }}
            />
            <Stack
              sx={{
                maxWidth: "70%",
              }}
            >
              <Paper
                elevation={5}
                sx={{
                  backgroundColor: "rgba(167, 85, 194, 0.5)",
                  p: 1,
                  borderRadius: 0,
                  borderTopRightRadius: "5px",
                  borderBottomLeftRadius: "5px"
                }}
              >
                {renderContent()}
              </Paper>
              <Typography variant="caption">{formatTime(message.createdAt)}</Typography>
            </Stack>
          </>
        )
      }
    </Stack>
  )
}

export default Message