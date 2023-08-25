import ItemImage from "./itemImage";

function countDuplicates(arr: any) {
  const result = [];
  let count2055 = 0;

  for (const item of arr) {
    if (item === 2055) {
      count2055++;
    } else {
      result.push({ item: item, count: 1 });
    }
  }

  if (count2055 > 0) {
    result.push({ item: 2055, count: count2055 });
  }

  return result;
}

export default function PlayerInventory(props: {
  PlayerInventory: Array<number>;
  ItemSize: string;
  Team: string;
}) {
  //   console.log(props.PlayerInventory);

  const manageOrientation = (teamColor: string) => {
    if (teamColor == "red") {
      return "flex-row-reverse";
    } else {
      return "flex-row";
    }
  };

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

  // console.log(itemsWCuantity);
  // console.log(inventory);
  // console.log(ward);

  return (
    <div
      className={`flex ${manageOrientation(
        props.Team
      )} justify-center xl:w-2/5 ml-1 mr-1`}
    >
      <div className="grid grid-cols-3 gap-2 ml-1 mr-1">
        {itemsWCuantity.map((i) => {
          return (
            <ItemImage
              Item={i.item}
              Count={i.count}
              ClassName={`w-${props.ItemSize}`}
            />
          );
        })}
      </div>
      <ItemImage Item={ward as number} ClassName={`w-${props.ItemSize}`} />
    </div>
  );
}
