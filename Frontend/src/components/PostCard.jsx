/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

function getRandomColor() {
  // Generate random color code
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function PostCard({ post }) {
  const authorColor = getRandomColor(); // Get random color for author name background

  return (
    <div className="w-full  mx-auto  border-b">
      <div className="bg-white rounded-lg lg:rounded-md p-4 flex flex-col justify-between leading-normal">
        <div className="mb-4">
          <p className="text-sm bg-slate-200 w-fit rounded-md px-1 flex items-center">
            😍 {post.likes.length}
          </p>
         
          <Link
            className="text-gray-900 font-bold text-xl mb-2 hover:underline md:no-underline underline line-clamp-3"
            to={`/post/${post._id}`}
          >
            {post.title}
          </Link>
          {/* <div className="max-h-20 overflow-hidden">
            <ReactMarkDown className="text-gray-700 text-base" content={post.story} />
          </div> */}
        </div>
        <div className="flex items-center">
          <span
            className="w-10 h-10 rounded-full text-center text-2xl text-white mr-4 flex items-center justify-center"
            style={{ backgroundColor: authorColor }}
          >
            {post.authorName.charAt(0).toUpperCase()}
          </span>
          <div className="text-sm">
            <Link
              to={`/user/${post.author}/${post.authorName}`}
              className="text-gray-900 font-semibold hover:underline"
            >
              {post.authorName}
            </Link>
            <p className="text-gray-600">
              <ReactTimeAgo date={post.createdAt} />
            </p>
          </div>
        </div>
        <ul className="flex overflow-x-hidden gap-2 mt-1">
            {post.label.map((l, i) => (
              <Link className=" px-1 rounded-md bg-slate-200 text-blue-600"   key={i} to={`?label=${l}`}>
                #{l}
              </Link>
            ))}
          </ul>
      </div>
    </div>
  );
}

export default PostCard;
