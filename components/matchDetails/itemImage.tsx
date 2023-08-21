export default function ItemImage(props: { item: number; ClassName?: string }) {
  let src = `http://ddragon.leagueoflegends.com/cdn/13.15.1/img/item/${props.item}.png`;

  if (props.item == -1) {
    src = "./../../public/no-item.png";
  }

  return (
    <img
      className={props.ClassName}
      src={src}
      alt={props.item as unknown as string}
    />
  );
}
