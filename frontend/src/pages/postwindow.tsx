import "@/styles/post-styles.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import { toast } from 'react-toastify';
import moment from "moment";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  CornerDownLeft,
} from "lucide-react";

import Comment from "@/components/comment";
import ImageCarousel from "@/components/imagecarousel";
import { IPost } from "@/models/postType";
import { IComment } from "@/models/commentType";

export default function PostWindow() {
  const { postId } = useParams();
  const [post, setPost] = useState<IPost>({} as IPost);
  const [vote, setVote] = useState<boolean | null>(null);

  const [commentValue, setCommentValue] = useState("");
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentCount, setCommentCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:3001/retrievepost/${postId}`);

      if (response.ok) {
        const { message, post } = await response.json();
        setPost(post);
        console.log(message);

        const commentsData = await Promise.all(
          post.comments.map(async (commentId: string) => {
            const res = await fetch(`http://localhost:3001/retrievecomment/${commentId}`);
            const data = await res.json();

            if (!res.ok) {
              toast.error("An error has occurred.");
              console.error(data.message);
              return null;
            } else {
              console.log(data.message);
              return data.comment;
            }
          })
        );

        const filteredComments = commentsData.filter(Boolean);
        setComments(filteredComments);
        setCommentCount(filteredComments.length);
      } else {
        console.error(response);
        if (response.status === 404) {
          toast.info("That post you were looking for was a paper town!");
          navigate("/");

        } else {

          toast.error("An error has occured");
        }
      }
    }

    async function fetchVote() {
      const res = await fetch(`http://localhost:3001/retreivevote/${postId}`);
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 404) {
          // do nothing
        } else {
          toast.error("A server error has occured vote pull.");
        }
      } else {
        setVote(data.initialVote);
      }
    }

    fetchData();
    fetchVote();
  }, [postId, navigate]);

  function handleDate(datePosted: Date = new Date()): string {
    return moment(datePosted).fromNow();
  }

  async function handleUpvote(): Promise<any> {
    try {
      const res = await fetch(`http://localhost:3001/upvote/${post.publicId}`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("An error has occured.");
        console.error(data.message);
        return;
      }

      if (data.likes !== undefined && data.dislike !== undefined) {
        setPost((post) => ({ ...post, likes: data.likes }));
        setPost((post) => ({ ...post, dislikes: data.dislike }));

        if (vote === true) {
          setVote(null);
        } else {
          setVote(true);
        }
        console.log(data.message);
      }
    } catch (err: any) {
      toast.error("A server error occured.");
      console.error(err);
    }
  }

  async function handleDownvote(): Promise<any> {
    try {
      const res = await fetch(`http://localhost:3001/downvote/${post.publicId}`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("An error has occured.");
        console.error(data.message);
        return;
      }

      if (data.likes !== undefined && data.dislike !== undefined) {
        setPost((post) => ({ ...post, likes: data.likes }));
        setPost((post) => ({ ...post, dislikes: data.dislike }));

        if (vote === false) {
          setVote(null);
        } else {
          setVote(false);
        }
        console.log(data.message);
      }
    } catch (err: any) {
      toast.error("A server error occured.");
      console.error(err);
    }
  }

  async function handleAddComment(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter" || commentValue.trim() === "") return;

    try {
      const res = await fetch("http://localhost:3001/submitcomment", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: "ANTHIMON",
          body: commentValue,
          publicId: postId,
          parentId: postId,
          type: "Comment",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setCommentValue("");

        console.log(data.message);
        setComments((prevComments) => [...prevComments, data.newComment]);
        setCommentCount((prev) => prev + 1);
      } else {
        toast.error("An error has occured.");
        console.error(data.message);
      }
    } catch (err: unknown) {
      toast.error("An error occurred while submitting the comment.");
      console.log(err);
    }
  }

  function handleDeleteComment(commentID: string) {
    setComments((prevComments) => {
      const updatedComments = prevComments.filter((comment) => comment.commentID !== commentID);
      setCommentCount(updatedComments.length);
      return updatedComments;
    });
  };

  return (
    <div className="post-window-container">
      <div className="post-window-header">
        <div className="post-window-title">
          <h1>{post?.title}</h1>
          <button className="round-button top-right" onClick={() => navigate(-1)}>
            <CornerDownLeft className="icon black" />
          </button>
        </div>

        <hr />

        <div className="post-info">
          <b className="post-author">Posted by <span className="gray-color">{post?.username}</span> </b>
          <i className="post-date">{handleDate(post?.postDate)}</i>
        </div>
      </div>

      <div className="post-window-main">
        <div className="tag-list">
          {post?.tags?.map((tag, i) => (
            <span key={tag + i} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <ImageCarousel images={post.images} maxImages={3} />
        <ReactMarkdown className="post-body" children={post?.body} />
      </div>

      <div className="post-window-footer">
        <div className="post-button">
          <span className="like-count">{post?.likes}</span>
          <button
            className={`round-button ${vote === true ? "selected-up" : ""}`}
            onClick={handleUpvote}
          >
            <ThumbsUp className="icon" />
          </button>
        </div>

        <div className="post-button">
          <button
            className={`round-button ${vote === false ? " selected-down" : ""
              }`}
            onClick={handleDownvote}
          >
            <ThumbsDown className="icon" />
          </button>
          <span className="dislike-count">{post?.dislikes}</span>
        </div>

        <div className="post-button">
          <button className="round-button">
            <MessageCircle className="icon" />
          </button>
          <span className="comment-count">{commentCount}</span>
        </div>

        <input
          type="text"
          placeholder="Add a Comment"
          id="comment-input"
          className="comment-input"
          onChange={(e) => setCommentValue(e.target.value)}
          onKeyUp={handleAddComment}
          value={commentValue}
        />
      </div>

      <div className="post-window-comments">
        <h1>Comments</h1>
        {comments.length > 0 ?
          comments.map((comment, i) =>
            <Comment
              key={(comment.commentID ?? "") + i}
              commentData={comment}
              isReplyable={true}
              onDeleteComment={handleDeleteComment}
              setCommentCount={setCommentCount} />)
          : comments.length === 0 ? <p>No comments yet!</p>
            : <p>"Loading..."</p>}
      </div >
    </div >
  );
}