"use client";

import { setInitialTopics } from "@/lib/features/topic-slice";
import { AppDispatch, useAppSelector } from "@/lib/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function EditTopic({ params }: { params: any }) {
  const { id } = params;
  const [newTitle, setNewTitle] = useState<string>("title");
  const [newDescription, setNewDescription] = useState<string>("description");
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/topics/${id}`
        );
        setNewTitle(response?.data?.topic?.title || "");
        setNewDescription(response?.data?.topic?.description || "");
      } catch (error) {
        console.log(error, "fetched response");
      } finally {
        console.log("useEffect done");
      }
    };
    getData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newTitle, newDescription, "newTitle,newDescription");
    try {
      const response = await axios.put(
        `http://localhost:3000/api/topics/${id}`,
        {
          newTitle,
          newDescription,
        }
      );
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
        Update Topic
      </button>
    </form>
  );
}
