import '@/styles/post-styles.css'

import ImageCarousel from './imagecarousel';
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import { IPost } from '@/models/postType';
import { toast } from 'react-toastify';
import { makeServerURL } from '@/hook/url';

export default function Post({
  post,
  initialVote = null,
  initialLikes = 0,
  initialDislikes = 0,
  initialComments = 0,
}: {
  post: IPost;
  initialVote?: boolean | null;
  initialLikes?: number;
  initialDislikes?: number;
  initialComments?: number;
}) {
  const [vote, setVote] = useState<boolean | null>(initialVote);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [dislikeCount, setDislikeCount] = useState(initialDislikes);
  const [commentCount] = useState(initialComments);

  function handleDate(datePosted: Date): string {
    return moment(datePosted).fromNow();
  }

  async function handleUpvote() {
    try {
      const res = await fetch(makeServerURL(`upvote/${post.publicId}`), {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        console.error(data.message);
        return;
      }

      if (data.likes !== undefined && data.dislike !== undefined) {
        setLikeCount(data.likes);
        setDislikeCount(data.dislike);

        if (vote === true) {
          setVote(null);
        } else {
          setVote(true);
        }
        console.log(data.message);
      }
    } catch (err: unknown) {
      toast.error("A server error occured.");
      console.error(err);
    }
  }

  async function handleDownvote() {
    try {
      const res = await fetch(makeServerURL(`downvote/${post.publicId}`), {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("An error has occured.");
        console.error(data.message);
        return;
      }

      if (data.likes !== undefined && data.dislike !== undefined) {
        setLikeCount(data.likes);
        setDislikeCount(data.dislike);

        if (vote === false) {
          setVote(null);
        } else {
          setVote(false);
        }
        console.log(data.message);
      }
    } catch (err: unknown) {
      toast.error("A server error occured.");
      console.error(err);
    }
  }

  return (
    <div className="post-container">
      <div className="post-main">
        <div className="post-header">
          <Link to={`/post/${post.publicId}`} className="black-color">
            <h2>{post.title}</h2>
            <hr />
            <div className="post-info">
              <b className="post-author">Posted by <span className="gray-color">{post.username}</span> </b>
              <i className="post-date">{handleDate(post.postDate)}</i>
            </div>
          </Link>
        </div>

        <div className="post-body-container">
          <ReactMarkdown className="post-body" children={post.body} />
          <div className="matchWidth">
            <ImageCarousel images={post.images} maxImages={1} />
          </div>
        </div>

        <div className="post-footer">
          {post.tags.map((tag, i) => (
            <span key={tag + i} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="post-sidebar">
        <div className='post-button'>
          <span className='like-count'>{likeCount}</span>
          <button
            className={`round-button ${vote === true ? "selected-up" : ""}`}
            onClick={handleUpvote}>
            <ThumbsUp className="icon" />
          </button>
        </div>

        <div className="post-button">
          <button
            className={`round-button ${vote === false ? " selected-down" : ""}`}
            onClick={handleDownvote}>
            <ThumbsDown className="icon" />
          </button>
          <span className='dislike-count'>{dislikeCount}</span>
        </div>

        <div className="post-button">
          <Link to={`/post/${post.publicId}`}>
            <button className="round-button">
              <MessageCircle className="icon" />
            </button>
          </Link>
          <span className='comment-count'>{commentCount}</span>
        </div>
      </div>
    </div>
  );
}
