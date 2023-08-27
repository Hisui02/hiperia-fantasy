export default function ChampionImage(props: {
  Champion: string;
  Potion?: number;
}) {
  return (
    <div className="xl:w-1/5 p-1 flex justify-center text-center items-center ">
      <div className="relative">
        <img
          className="w-16 inline mt-auto mb-auto ml-1 mr-1"
          src={`http://ddragon.leagueoflegends.com/cdn/13.14.1/img/champion/${props.Champion}.png`}
          alt={props.Champion}
        />
        {props.Potion && (
          <img
            className="w-6 absolute bottom-0 right-0"
            src={`http://ddragon.leagueoflegends.com/cdn/13.15.1/img/item/${props.Potion}.png`}
            alt={props.Potion as unknown as string}
          />
        )}
      </div>
    </div>
  );
}
