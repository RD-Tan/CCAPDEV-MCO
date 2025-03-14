import SmallPost from "@/components/smallpost";

import { IUser } from "@/models/userType";
import { IPost } from "@/models/postType";
import { useState, useEffect } from "react";

export default function UserPosts({ user }: { user: IUser; }) {
  const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
      fetch(`http://localhost:3001/user/${user.username}/posts`).
        then((response) =>  response.json()).
        then((data) => {
          if (data.message) {

          } else {
            setPosts(data);
          }
        })
    }, [user]);

  if (posts.length > 0) {
    return (
      <div className="user-posts-container">
        {posts.map((post) =>
          <SmallPost post={post}/>
        )}
      </div>
    )
  } else {
    return (
      <div className="user-posts-container">
        <p className="error">No posts found!</p>
      </div>
    )
  }
}