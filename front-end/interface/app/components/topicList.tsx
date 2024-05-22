"use client";

import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { topicProps } from "@/types/topics";


export const getTopics = async (callBack) => {
  try {
    const res = await axios.get("http://localhost:3000/api/topics");
    // console.log(res.data);

    if (!res.data) {
      throw new Error("Failed to fetch topics");
    }

    callBack(res.data.topics);
    return res.data;
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default function TopicsList() {
  const [allTopies, setAllTopies] = useState<topicProps[]>();

  useEffect(() => {
    const res: any = getTopics(setAllTopies);
  }, []);

  return (
    <>
      {allTopies?.map((t) => (
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
              setAllTopics={setAllTopies}
              allTopics={allTopies}
            />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
