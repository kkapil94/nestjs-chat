import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../context/context";

export default function RoomJoin() {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(context);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/room/${userData.room}`);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="join-room">
          <label htmlFor="username">Username:</label>
          <input
            className="username"
            id="username"
            type="text"
            required
            onChange={handleChange}
            autoComplete="off"
          />
          <label htmlFor="room">Room:</label>
          <input
            type="number"
            id="room"
            className="room"
            min={1}
            max={10}
            required
            onChange={handleChange}
            value={userData.room}
            autoComplete="off"
          />
          <button type="submit">Join Room</button>
        </form>
      </div>
    </>
  );
}
