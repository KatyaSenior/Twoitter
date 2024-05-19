User Stories
🐿️ As a user, I am able to sign up for an account and create a user profile. ACHEIVED.
🐿️ As a user, I am able to log in and out of my account. ACHEIVED.
🐿️ As a user, I am able to create posts on my profile timeline. ACHEIVED.
Stretch Stories
🐿️ As a user, I am able to see a list of other user's posts and/or profiles on the site
🐿️ As a user, I am able able to visit other user profiles
🐿️ As a user, I am able to follow other users
🐿️ As a user, I am able to like posts I think are good, and see how many likes a post has

Requirements:

🎯 Use Clerk.com to set up user signup and login. ACHEIVED.

🎯 Use the Clerk userId to associate posts with a user. ACHEIVED.

🎯 Enable each user to create a profile associated with their userId, and a form to input their biography and location data, etc. with a URL similar to /user/[userId].

🎯 Enable users to create posts associated with the userId, and display those posts on the user's profile page.

🎯 Show a 404 error if a user profile doesn't exist. ACHEIVED.

🎯 Use at least 1 Radix UI Primitive or similar

Stretch Goals
🏹 Enable users to visit other user profiles after seeing their posts on a global timeline

🏹 Enable users to follow other users by creating a follower and follwee relationship between two user profiles

🏹 Enable users to like other users' posts by creating a user_id and liked_post relationship in a junction table

🏹 A user's biography cannot be blank. If a user logs in but doesn't have a biography set, they should be asked to fill one in

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
