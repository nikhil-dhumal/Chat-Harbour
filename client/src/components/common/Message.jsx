import { useSelector } from "react-redux"

import { Avatar, Paper, Stack, Typography } from "@mui/material"

import formatTime from "../../utils/formatTime"
import getProfileImg from "../../utils/getProfileImg"

const Message = ({ message }) => {
  const { user } = useSelector((state) => state.user)

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
                  borderRadius: "5px"
                }}
              >
                <Typography>{message.content}</Typography>
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
                  borderRadius: "5px"
                }}
              >
                <Typography>{message.content}</Typography>
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