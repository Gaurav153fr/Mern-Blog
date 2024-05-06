import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import { useLocation } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("label");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/post");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();

        if (query !== null) {
          const data = json.filter((item) => item.label.includes(query));
          setPosts(data);
        } else {
          setPosts(json);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [query]);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center my-8">Posts</h2>

      <ul className="grid grid-cols-1  border rounded-md border-b-0 ">
        {posts && posts.map((post, i) => <PostCard post={post} key={i} />)}
      </ul>
    </main>
  );
}

export default Home;
