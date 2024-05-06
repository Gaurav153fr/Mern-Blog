/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import ReactMarkDown from "../components/ReactMarkDown";

function EditPost() {
  const [title, setTitle] = useState("");
  const [labels, setLabels] = useState([]);
  const [story, setStory] = useState("");
  const [error, setError] = useState("");

  const user = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/post/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: user.user.token,
        },
        body: JSON.stringify({
          title,
          story,
          labels,
          authorName: user.user.name
        }),
      });
      console.log(user.user.name);
      const json = await response.json();
      if (!response.ok) {
        setError(json.message);
        throw new Error("Failed to fetch data");
      }
      navigate(`/post/${json.post}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center w-screen px-2">
      <textarea
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title here"
        className="my-2 border-2 px-2 w-full py-1 font-extrabold text-3xl"
      ></textarea>

      <textarea
        name="label"
        onChange={(e) => {
          setLabels(e.target.value.split(","));
          console.log(labels, user.user.name);
        }}
        placeholder="labels separated by , here"
        className="my-2 border-2 px-2 w-full py-2"
      ></textarea>

      <textarea
        placeholder="Story here.."
        name="story"
        onChange={(e) => setStory(e.target.value)}
        className="my-2 border-2 px-2 w-full h-52 py-2"
      ></textarea>

      <button
        onClick={handleSubmit}
        className="py-2 bg-black text-white rounded-lg w-full hover:bg-black/90"
      >
        Submit
      </button>

      {error && (
        <div className="text-amber-700 w-full text-center font-medium">
          {error}
        </div>
      )}

      <div className="my-2 border-2  w-full min-h-52 py-2">
        <ReactMarkDown content={story} />
      </div>
    </div>
  );
}

export default EditPost;
