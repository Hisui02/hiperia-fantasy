//TODO: Añadir numero de items, si num>1

export default function ItemImage(props: {
  Item: number;
  Count?: number;
  ClassName?: string;
}) {
  let src = `http://ddragon.leagueoflegends.com/cdn/13.15.1/img/item/${props.Item}.png`;

  if (props.Item == -1) {
    src = "./../../public/no-item.png";
  }

  return (
    <img
      className={props.ClassName}
      src={src}
      alt={props.Item as unknown as string}
    />
  );
}
