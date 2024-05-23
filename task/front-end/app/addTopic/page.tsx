"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      if (!title || !description) {
        alert("Title and description are required.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post("http://localhost:3000/tasks", {
          title,
          description,
        });
        console.log("🚀 ~ response:", response);

        if (response.status === 201) {
          setLoading(false);
          alert("Topic created successfully!");
          router.push("/");
        } else {
          throw new Error("Failed to create a topic");
        }
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
        alert("Failed to create a topic");
      }
    },
    [title, description, router]
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />

      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />

      <button
        type="submit"
        disabled={loading}
        className={`bg-green-600 font-bold text-white py-3 px-6 w-fit ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Adding..." : "Add Topic"}
      </button>
    </form>
  );
}
