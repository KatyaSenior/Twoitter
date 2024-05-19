import { db } from "@/lib/db";
import { sql } from "@vercel/postgres";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Posts() {
  const { userId } = auth();

  const twoitterPosts = await sql`
    SELECT 
      twoitterPosts.id,
      twoitterPosts.content,
      twoitterProfiles.username
    FROM twoitterPosts
    INNER JOIN twoitterProfiles ON twoitterPosts.profile_id = twoitterProfiles.id;
  `;

  async function handleAddPost(formData) {
    "use server";
    const content = formData.get("content");

    try {
      const result =
        await sql`SELECT id FROM twoitterProfiles WHERE clerk_id = ${userId}`;

      if (result.rows.length === 0) {
        console.error(`No profile found for user ID: ${userId}`);
        return;
      }

      const profileId = result.rows[0].id;
      await sql`
    INSERT INTO twoitterPosts (profile_id, content) VALUES (${profileId}, ${content})
  `;
      console.log("Post saved!");
      revalidatePath("/");
      console.log("Post saved!");
      redirect("/");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  }

  return (
    <div>
      <h2>Posts</h2>
      <SignedIn>
        <h3>Create new post</h3>
        <form action={handleAddPost}>
          <textarea name="content" placeholder="New post"></textarea>
          <button>Submit</button>
        </form>
      </SignedIn>

      <SignedOut>
        <p>You need to sign in to add a post</p>
        <SignInButton />
      </SignedOut>

      <h3>All posts</h3>
      <div className="posts">
        {twoitterPosts.rows.map((twoitterPost) => {
          return (
            <div key={twoitterPost.id}>
              <h4>{twoitterPost.username} says...</h4>
              <p>{twoitterPost.content}</p>
              <div key={userId}></div>
              <Link href={`/user/${encodeURIComponent(userId)}`}>
                See Post Profile
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
