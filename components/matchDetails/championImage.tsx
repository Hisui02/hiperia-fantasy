export default function ChampionImage(props: {
  Champion: string;
  ClassName?: string;
}) {
  return (
    <img
      className={props.ClassName}
      src={`http://ddragon.leagueoflegends.com/cdn/13.14.1/img/champion/${props.Champion}.png`}
      alt={props.Champion}
    />
  );
}
