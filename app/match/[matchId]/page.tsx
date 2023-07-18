"use client";

export default function Page({ params }: { params: { matchId: string } }) {
  return <div>My Post: {params.matchId}</div>;
}
