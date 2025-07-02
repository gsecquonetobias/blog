import { apiRoot } from "./constants";
import { PostCard } from "./PostCard";

export const Feed = async () => {
  const resp = await fetch(apiRoot + 'AddBlogPost/All')
  const data = await resp.json()
  const posts = data.Items

  return (
    <>
      <div className="grid grid-cols-4 gap-4 pt-4">
        {posts.map(post => <PostCard key={post.postId} {...post} />)}
      </div>
    </>
  );
}