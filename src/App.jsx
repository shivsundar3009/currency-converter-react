// src/App.js
import React from "react";
import Converter from "./components/Converter";

function App() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://plus.unsplash.com/premium_photo-1679397743946-ef0f12e366c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <Converter />
    </div>
  );
}

export default App;
