import { db } from "@/lib/db";
import { sql } from "@vercel/postgres";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default function ProfileForm() {
  const { userId } = auth();

  async function handleUpdateProfile(formData) {
    "use server";
    const username = formData.get("username");
    const bio = formData.get("bio");

    await sql`UPDATE twoitterProfiles SET username = ${username}, bio = ${bio} WHERE clerk_id = ${userId}`;
    revalidatePath("/");
  }

  return (
    <div>
      <h2>Update Profile</h2>
      <p>Welcome to Twoitter, please choose your username!</p>
      <form action={handleUpdateProfile}>
        <input name="username" placeholder="Username" />
        <p>Tell us about yourself!</p>
        <input name="bio" placeholder="Bio" />
        <button>Submit</button>
      </form>
    </div>
  );
}
