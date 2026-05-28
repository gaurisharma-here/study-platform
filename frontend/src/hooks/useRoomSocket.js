import { useEffect, useRef, useState } from 'react'

const useRoomSocket = (roomId, token, onMessage) => {
  const wsRef = useRef(null)
  const [isConnected, setIsConnected] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState([])

  useEffect(() => {
    if (!roomId || !token) return

    const wsUrl = `${import.meta.env.VITE_WS_URL}/ws/${roomId}?token=${token}`
    const ws = new WebSocket(wsUrl)
    wsRef.current = ws

    ws.onopen = () => setIsConnected(true)

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'user_joined' || data.type === 'user_left') {
        setOnlineUsers(data.online_users || [])
      }
      onMessage(data)
    }

    ws.onclose = () => setIsConnected(false)
    ws.onerror = () => setIsConnected(false)

    return () => ws.close()
  }, [roomId, token])

  const sendMessage = (payload) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload))
    }
  }

  return { isConnected, onlineUsers, sendMessage }
}

export default useRoomSocket