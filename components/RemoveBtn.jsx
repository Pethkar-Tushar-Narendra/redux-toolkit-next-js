"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RemoveBtn({ id, dispatch, setInitialTopics }) {
  const router = useRouter();
  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await axios.delete(
        `http://localhost:3000/api/topics?id=${id}`
      );

      if (res.ok) {
        router.refresh();
      }
      dispatch(setInitialTopics(res?.data?.topics || []));
    }
  };

  return (
    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}
