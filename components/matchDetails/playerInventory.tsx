import ItemImage from "./itemImage";

function countDuplicates(arr: any) {
  const counts = {} as any;
  const result = [];

  for (const item of arr) {
    if (counts[item]) {
      counts[item]++;
    } else {
      counts[item] = 1;
    }
  }

  for (const key in counts) {
    result.push({ item: parseInt(key), count: counts[key] });
  }

  return result;
}

export default function PlayerInventory(props: {
  PlayerInventory: Array<number>;
  ClassName?: string;
}) {
  //   console.log(props.PlayerInventory);

  const { PlayerInventory: inventory } = props;

  let ward = inventory.find((i) => {
    return (
      i == 3363 || //Blue Ward
      i == 3364 //Red Ward
    );
  });

  if (!ward) ward = 3340; //El ward estándar no viene en el inv, se aplica por defecto

  let items = inventory.filter((i) => {
    return i != ward;
  });

  let itemsWCuantity = countDuplicates(items);

  while (itemsWCuantity.length < 6) {
    itemsWCuantity.push({ item: -1, count: 1 });
  }

  console.log(itemsWCuantity);
  // console.log(inventory);
  // console.log(ward);

  return (
    <div className="flex flex-row">
      <div className="grid grid-cols-3 gap-1 w-fit">
        {itemsWCuantity.map((i) => {
          return (
            <ItemImage
              Item={i.item}
              Count={i.count}
              ClassName={props.ClassName}
            />
          );
        })}
      </div>
      <ItemImage
        Item={ward as number}
        ClassName={`h-fit ml-1 ${props.ClassName}`}
      />
    </div>
  );
}
