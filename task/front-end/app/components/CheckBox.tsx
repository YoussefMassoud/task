import { topicProps } from "@/types/topics";
import axios from "axios";
import React from "react";

interface CheckBoxProps {
  id: string;
  setAllTopics: React.Dispatch<React.SetStateAction<topicProps[]>>;
  allTopics: topicProps[];
}

const makeItDoneInApi = async (id: string, newIsDone: boolean) => {
  const result = await axios.patch(`http://localhost:3000/tasks/${id}`, {
    isDone: newIsDone,
  });
  console.log("🚀 ~ makeItDoneInApi ~ result:", result);
  return result;
};

const CheckBox = ({ id, setAllTopics, allTopics }: CheckBoxProps) => {
  const handleCheckBoxChange = async () => {
    const indexOfTask = allTopics.findIndex((topic) => topic.id === id);
    const theTask = allTopics[indexOfTask];
    const newIsDone = !theTask.isDone;
    await makeItDoneInApi(id, newIsDone);

    const updatedTopics = [...allTopics];
    updatedTopics[indexOfTask] = { ...theTask, isDone: newIsDone };
    setAllTopics(updatedTopics);
  };

  return (
    <div className="flex items-center ">
      <input
        type="checkbox"
        checked={allTopics.find((topic) => topic.id === id)?.isDone || false}
        onChange={handleCheckBoxChange}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
      />
    </div>
  );
};

export default CheckBox;
