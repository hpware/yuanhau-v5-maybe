"use client";
import { useState } from "react";

export default function TodoForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/todos", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      setSuccess("Todo created!");
      e.currentTarget.reset();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to create todo");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="justify-center align-center text-center flex flex-col m-5 bg-gray-200/20 rounded p-5 gap-2"
    >
      <input type="text" name="title" placeholder="Title" className="m-1" />
      <input
        type="text"
        name="content"
        placeholder="Todo Content"
        className="m-1"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="m-1"
      />
      <button
        type="submit"
        className="rounded m-2 p-1 bg-gray-300/50 hover:bg-gray-400/50 transition-all duration-200"
      >
        Submit
      </button>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}
    </form>
  );
}
