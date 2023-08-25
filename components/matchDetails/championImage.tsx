export default function ChampionImage(props: { Champion: string }) {
  return (
    <div className="xl:w-1/5  flex justify-center text-center">
      <img
        className="w-20 inline mt-auto mb-auto ml-1 mr-1"
        src={`http://ddragon.leagueoflegends.com/cdn/13.14.1/img/champion/${props.Champion}.png`}
        alt={props.Champion}
      />
    </div>
  );
}
