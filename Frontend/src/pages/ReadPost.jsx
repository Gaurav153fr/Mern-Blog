import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkDown from "../components/ReactMarkDown";
import { Cfetch } from "../utils/apiFetch";
import Back from "../components/back";
import { useAuthContext } from "../hooks/useAuthContext";

function ReadPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  const user = useAuthContext();
  useEffect(() => {
    const fetchData = async () => {
      const data = await Cfetch(id);
      const json = await data;
      setPost(json);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user.user!==null && post && post.likes.includes(user.user.id)) {
      console.log("sdf");
      setLiked(true);
      
    }
    if(post){
      setCount(post.likes.length);
    }
  }, [post]);

  const handleLike = async () => {
    if(user.user===null){
      return 
    }else{
    console.log("vxdfv");
    setCount(liked ? count - 1 : count + 1);
    setLiked(!liked);
    await fetch(`/api/post/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: user.user.token,
      },
      body: JSON.stringify({ unLike: liked }),
    });
  }};

  return (
    <div className="md:px-10 px-2 py-5">
      <Back />
      {post ? (
        <div>
          <h1 className="max-md:text-3xl mb-5 bg-slate-100 p-1 rounded-md">
            💁‍♂️ {post.title}:
          </h1>

          <button onClick={handleLike} className="bg-slate-100 px-1 rounded-md">
            <span
              role="img"
              aria-label="Like"
              style={{ color: liked ? "red" : "black" }}
            >
              😍 {count}
            </span>{" "}
          </button>
          <br />
          <ul className="flex flex-wrap gap-2 mt-1">
            {post.label.map((l, i) => (
              <Link className=" px-1 rounded-md bg-slate-200 text-blue-600"   key={i} to={`/?label=${l}`}>
                #{l}
              </Link>
            ))}
          </ul>

          <div className="mt-5 border-t p-2 ">
            {" "}
            <ReactMarkDown content={post.story} />
          </div>
        </div>
      ) : (
        <strong>Post not found :(</strong>
      )}
    </div>
  );
}

export default ReadPost;
