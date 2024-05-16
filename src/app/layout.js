import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { sql } from "@vercel/postgres";

export default async function RootLayout({ children }) {
  const { userId } = auth();

  const profiles = await sql`SELECT * FROM profile WHERE clerk_id = ${userId}`;
  if (profiles.rowCount === 0 && userId) {
    await db.query(`INSERT INTO profile (clerk_id) VALUES ('${userId}')`);
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
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
