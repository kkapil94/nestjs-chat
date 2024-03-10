import React, { useState } from "react";
import socket from "../socket/socket";
import { useParams } from "react-router-dom";

export default function RoomPage() {
  const [msg, setMsg] = useState("");
  const [receivedMsg, setReceivedMsg] = useState([]);
  const { id } = useParams();
  socket.on("receive-msg", (data) => {
    setReceivedMsg([...receivedMsg, data]);
  });
  const handleSendMsg = (e) => {
    e.preventDefault();
    socket.emit("send-msg", msg);
    setMsg("");
  };
  return (
    <>
      <div className="container">
        <div className="username-container">
          <span>Room: {id}</span>
        </div>
        <div className="msg-container">
          {receivedMsg &&
            receivedMsg?.map((data, i) => (
              <div className="received-msg" key={i}>
                <strong>{data?.user?.username}</strong> :{data?.msg}
              </div>
            ))}
        </div>
        <div className="typespace-container">
          <form className="typespace" onSubmit={handleSendMsg}>
            <input
              type="text"
              name="msg"
              id="msg"
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
              autoComplete="off"
            />
            <button type="submit">send</button>
          </form>
        </div>
      </div>
    </>
  );
}
