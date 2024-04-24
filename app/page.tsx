"use client";

import { action2 } from "@/lib/features/auth-slice";
import { AppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  // const reduxValue = useAppSelector((state) => state);
  // console.log(reduxValue, "reduxValue");

  const dispatch = useDispatch<AppDispatch>();

  // const getTopics = (e: { title: string; description: string }[]) => {
  //   dispatch(setInitialTopics(e));
  // };

  const router = useRouter();

  useEffect(() => {
    router.refresh();
    router.push("topics");
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          dispatch(action2("something different"));
        }}
      >
        button to change the state
      </button>
      {/* <TopicsList getTopics={getTopics} /> */}
    </div>
  );
}
