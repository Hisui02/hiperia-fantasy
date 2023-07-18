"use client";

const getMatchDetails = async (matchId: string) => {
  //TODO: Añadir el último timestamp del partido para tener el detalle completo y un timestamp variableç
  //      si es el directo, o gestionar otro fetch para cuando el partido ha acabado, intentar reutilizar
  //      esta página para ambos casos

  const res = await fetch(
    `https://feed.lolesports.com/livestats/v1/window/${+matchId + 1}`
  );
  if (!res.ok) {
    throw new Error(`Could not fetch match details.`);
  } else {
    return res.json();
  }
};

interface Params {
  params: {
    matchId: string;
  };
}

export default async function Page({ params }: Params) {
  const matchDetails = await getMatchDetails(params.matchId);
  console.log(matchDetails);

  return <div>My Post: {params.matchId}</div>;
}
