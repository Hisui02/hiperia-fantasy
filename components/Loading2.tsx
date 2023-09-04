"use client";

import "./Loading.css";

export default function Loading() {
  return (
    <div className="absolute top-1/2 left-1/2">
      <div className="typing-indicator">
        <div className="typing-circle"></div>
        <div className="typing-circle"></div>
        <div className="typing-circle"></div>
        <div className="typing-shadow"></div>
        <div className="typing-shadow"></div>
        <div className="typing-shadow"></div>
      </div>
    </div>
  );
}
