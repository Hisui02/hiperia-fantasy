"use client";

import { useRouter } from "next/navigation";

interface Params {
  params: {
    matchId: string;
  };
}

export default function Page({ params }: Params) {
  const router = useRouter();

  const gameId = BigInt(params.matchId) + BigInt(1);
  router.replace(`/match/${params.matchId}/game/${gameId}`);
}
