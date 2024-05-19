"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>Well. This is awkward.</h2>
        <p>{error.message}</p>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
