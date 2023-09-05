import Image from "next/image";
import noItem from "./../../public/no-item.png";

export default function ItemImage(props: {
  Item: number;
  Count?: number;
  ClassName?: string;
}) {
  let src = `http://ddragon.leagueoflegends.com/cdn/13.15.1/img/item/${props.Item}.png`;

  if (props.Item == -1) {
    src = noItem.src;
  }

  return (
    <div className={`relative grid`}>
      <Image
        className={props.ClassName}
        src={src}
        alt={props.Item as unknown as string}
        width={5}
        height={5}
        unoptimized={true}
      />
      {props.Count && props.Count > 1 && (
        <span className="absolute text-lg text-white bottom-0 right-0 leading-3">
          {props.Count}
        </span>
      )}
    </div>
  );
}
