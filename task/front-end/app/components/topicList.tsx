"use client";

import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { topicProps } from "@/types/topics";
import CheckBox from "./CheckBox";

export const getTopics = async (callBack: any) => {
  try {
    const res = await axios.get("http://localhost:3000/tasks");
    // console.log(res.data);

    if (!res.data) {
      throw new Error("Failed to fetch topics");
    }

    callBack(res.data);
    return res.data;
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

function formatDate(timestamp: number) {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year}, ${hours}:${minutes}`;
}

export default function TopicsList() {
  const [allTopies, setAllTopies] = useState<topicProps[]>([]);

  useEffect(() => {
    const res: any = getTopics(setAllTopies);
  }, []);

  return (
    <>
      {allTopies?.map((t) => (
        <div
          key={t.id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center flex-row gap-4 ">
              <CheckBox
                id={t.id}
                setAllTopics={setAllTopies}
                allTopics={allTopies}
              />
              <RemoveBtn
                id={t.id}
                setAllTopics={setAllTopies}
                allTopics={allTopies}
              />
              <Link href={`/editeTopic/${t.id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
            <div>{formatDate(t.dueDate)}</div>
          </div>
        </div>
      ))}
    </>
  );
}
