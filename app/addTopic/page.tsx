"use client";

import { AppDispatch } from "@/lib/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setInitialTopics } from "@/lib/features/topic-slice";

const AddTopic = () => {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/topics`, {
        title: newTitle,
        description: newDescription,
      });
      dispatch(setInitialTopics(response?.data?.topics));
      router.refresh();
      router.push("/topics");
    } catch (error) {
      console.log(error, "fetched response");
    } finally {
      console.log("useEffect done");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />

      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Add Topic
      </button>
    </form>
  );
};

export default AddTopic;
