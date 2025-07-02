import { Suspense } from "react";
import { Feed } from "./_shared/Feed";
import { CreatePostCard } from "./_shared/CreatePostCard";

export default function Home() {
  return <>
    <div className="p-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl inline">My Blog</h1>
      <CreatePostCard />
      <Suspense fallback={<p>Loading...</p>}>
        <Feed />
      </Suspense>
    </div>
  </>
}
