import React, { useContext, useEffect, useState } from "react";
import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
import { useNavigate, useParams } from "react-router-dom";
import { context } from "../context/context";

export default function RoomPage() {
  const [msg, setMsg] = useState("");
  const [receivedMsg, setReceivedMsg] = useState([]);
  const navigate = useNavigate();
  const { userData } = useContext(context);
  const { id } = useParams();
  const [newSocket, setNewSocket] = useState();

  const handleSendMsg = (e) => {
    e.preventDefault();
    newSocket.emit("send-msg", msg);
    setMsg("");
  };

  newSocket?.on("receive-msg", (data) => {
    setReceivedMsg([...receivedMsg, data]);
  });

  useEffect(() => {
    const socket = io("http://localhost:3000");
    setNewSocket(socket);
    socket.emit("join-room", userData, (error) => {
      if (error) {
        alert(error);
        navigate("/");
      }
    });
    console.log(socket.id);
    return () => {
      socket.disconnect();
      socket.off("receive-msg", (data) => {
        setReceivedMsg([...receivedMsg, data]);
      });
    };
  }, [userData, navigate]);

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
