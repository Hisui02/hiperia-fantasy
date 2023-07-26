"use client";

const getMatchDetails = async (matchId: string) => {
  //TODO: Añadir el último timestamp del partido para tener el detalle completo y un timestamp variableç
  //      si es el directo, o gestionar otro fetch para cuando el partido ha acabado, intentar reutilizar
  //      esta página para ambos casos

  //El timestamp no funciona correctamente¿?

  //Añadiendo el startingTime nos aseguramos los últimos datos posibles

  const hoy = new Date();
  hoy.setSeconds(0, 0);
  hoy.setMinutes(hoy.getMinutes() - 1);

  // console.log(hoy.toISOString());
  // console.log(BigInt(matchId) + BigInt(1));

  //Calculo el gameId añadiendo 1 al matchId que llega por parámetros
  const gameId = (BigInt(matchId) + BigInt(1)).toString();

  const res = await fetch(
    `https://feed.lolesports.com/livestats/v1/window/${gameId}?startingTime?=${hoy.toISOString()}`
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
