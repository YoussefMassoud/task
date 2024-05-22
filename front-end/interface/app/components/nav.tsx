"use client";

import Link from "next/link";

export default function Nav() {
  return (
    <div className="flex justify-between items-center bg-black px-8 py-3">
      <Link className="text-white font-bold" href={"/"}>
        Home
      </Link>
      <Link className="bg-white p-2 rounded-md" href={"/addTopic"}>
        Add Topic
      </Link>
    </div>
  );
}
