import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function Post({
  title,
  body,
  tags,
  datePosted,
  username,
}: {
  title: string;
  body: string;
  tags: string[];
  datePosted: Date;
  username: string;
}) {
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  function handleDate(datePosted: Date): string {
    return "a day ago.";
  }

  function handleUpvote(): void {
    if (vote === "up") {
      setVote(null);
    } else {
      setVote("up");
    }
  }

  function handleDownvote(): void{
    if (vote === "down") {
      setVote(null);
    } else {
      setVote("down");
    }
  }

  return (
      <div className="post-container">
        <Link to="/post" className="post-link">
          <div className="post-body">
            <div className="post-header">
              <h1>
                {title} &sdot;{" "}
                <span className="gray">{handleDate(datePosted)}</span>
              </h1>
              <p className="gray">Posted by {username}</p>
            </div>
            <div className="post-main">
              <p>{body}</p>
            </div>
            <div className="post-footer">
              {tags.map((tag, i) => (
                <span key={tag + i} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
        <div className="post-sidebar">
          <button
            className={`round-button ${
              vote === "up" ? "selected-up" : ""
            }`}
            onClick={handleUpvote}
          >
            <ThumbsUp className="icon" />
          </button>
          <button
            className={`round-button ${
              vote === "down" ? " selected-down" : ""
            }`}
            onClick={handleDownvote}>
            <ThumbsDown className="icon" />
          </button>
          <Link to="/post">
            <button className="round-button">
              <MessageCircle className="icon" />
            </button>
          </Link>
        </div>
      </div>
  );
}
