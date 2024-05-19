import { sql } from "@vercel/postgres";
import Image from "next/image";
import "./globals.css";
import Link from "next/link";

export default async function Home() {
  const twoitterPosts = await sql`SELECT*FROM twoitterPosts`;
  const twoitterProfiles = await sql`SELECT*FROM twoitterProfiles`;
  console.log({ twoitterPosts });
  return (
    <div>
      <h1>Twoitter Posts</h1>
      {twoitterPosts.rows.map((twoitterPost) => {
        return (
          <div key={twoitterPost.id}>
            <h3>{twoitterPost.profile_id}</h3>
            <p>{twoitterPost.content}</p>
            <div key={twoitterProfiles.id}></div>
            <Link href={`/user/${encodeURIComponent(twoitterProfiles.id)}`}>
              View Profile
            </Link>
          </div>
        );
      })}
    </div>
  );
}
