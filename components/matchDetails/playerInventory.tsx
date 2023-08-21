import ItemImage from "./itemImage";

export default function PlayerInventory(props: {
  PlayerInventory: Array<number>;
  ClassName?: string;
}) {
  //   console.log(props.PlayerInventory);

  const { PlayerInventory: inventory } = props;

  const ward = inventory.find((i) => {
    return (
      i == 3340 || //Stealth Ward
      i == 3363 || //Blue Ward
      i == 3364 //Red Ward
    );
  });

  let items = inventory.filter((i) => {
    return i != ward;
  });

  // items = items.slice(0, 4);

  while (items.length < 6) {
    items.push(-1);
  }

  // console.log(items);

  return (
    <div className="flex flex-row">
      <div className="grid grid-cols-3 gap-1 w-fit">
        {items.map((i) => {
          return <ItemImage item={i} ClassName={props.ClassName} />;
        })}
      </div>
      <ItemImage
        item={ward as number}
        ClassName={`h-fit ml-1 ${props.ClassName}`}
      />
    </div>
  );
}
