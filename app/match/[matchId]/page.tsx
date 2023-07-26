const getMatchDetails = async (matchId: string) => {
  const hoy = new Date(); //Añadiendo el startingTime nos aseguramos los últimos datos posibles
  hoy.setSeconds(0, 0);
  hoy.setMinutes(hoy.getMinutes() - 1);

  const gameId = BigInt(matchId) + BigInt(1); //Calculo el gameId como el matchId+1

  const res = await fetch(
    `https://feed.lolesports.com/livestats/v1/window/${gameId.toString()}?startingTime=${hoy.toISOString()}`
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
  // console.log(matchDetails);

  return <div>My Post: {params.matchId}</div>;
}
