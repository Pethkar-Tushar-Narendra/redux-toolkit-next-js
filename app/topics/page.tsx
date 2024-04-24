"use client";

import { setInitialTopics } from "@/lib/features/topic-slice";
import { AppDispatch, useAppSelector } from "@/lib/store";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import RemoveBtn from "@/components/RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reduxValue = useAppSelector((state) => state);
  const topics = [...reduxValue?.topics?.value];

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/topics");
        dispatch(setInitialTopics(response?.data?.topics || []));
      } catch (error) {
        console.log(error, "fetched response");
      } finally {
        console.log("useEffect done");
      }
    };
    getData();
  }, []);

  return (
    <>
      {topics?.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn
              id={t._id}
              dispatch={dispatch}
              setInitialTopics={setInitialTopics}
            />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default TodoList;
