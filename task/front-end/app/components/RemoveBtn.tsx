import React, { useCallback } from "react";
import { topicProps } from "@/types/topics";
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";

interface RemoveBtnProps {
  id: string;
  setAllTopics: React.Dispatch<React.SetStateAction<topicProps[]>>;
  allTopics: topicProps[];
}

const RemoveBtn: React.FC<RemoveBtnProps> = ({
  id,
  setAllTopics,
  allTopics,
}) => {
  const router = useRouter();

  const removeTopic = useCallback(async () => {
    const confirmed = window.confirm("Are you sure?");
    if (confirmed) {
      let index = allTopics.findIndex((x) => x.id == id);
      if (index !== -1) {
        const updatedTopics = [...allTopics];
        updatedTopics.splice(index, 1);
        setAllTopics(updatedTopics);

        try {
          const res = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE",
          });

          if (res.ok) {
            setAllTopics(updatedTopics);
            router.refresh();
            alert("Topic removed successfully!");
          } else {
            alert("Failed to remove topic.");
          }
        } catch (error) {
          alert("Failed to remove topic.");
        }
      }
    }
  }, [id, allTopics, setAllTopics, router]);

  return (
    <button onClick={removeTopic} className="text-red-500">
      <HiOutlineTrash size={24} />
    </button>
  );
};

export default RemoveBtn;
