import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { auth } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";
import ProfileForm from "./user/[userId]/page";

export default async function RootLayout({ children }) {
  const { userId } = auth();

  let hasUsername = false;

  if (userId) {
    const twoitterProfiles =
      await sql`SELECT * FROM twoitterProfiles WHERE clerk_id = ${userId}`;

    if (twoitterProfiles.rowCount === 0) {
      await sql`INSERT INTO twoitterProfiles (clerk_id) VALUES (${userId})`;
    } else {
      hasUsername = twoitterProfiles.rows[0]?.username !== null;
    }
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <main>
            <SignedOut>{children}</SignedOut>
            <SignedIn>{hasUsername ? children : <ProfileForm />}</SignedIn>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
