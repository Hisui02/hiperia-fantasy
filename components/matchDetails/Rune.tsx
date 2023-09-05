"use client";

import Image from "next/image";

interface Props {
  Rune: {
    id: number;
    key: string;
    icon: string;
    name: string;
    shortDesc: string;
    longDesc: string;
  };
  IsMainRune?: boolean;
}

function eliminarEtiquetasHTML(cadena: string) {
  return cadena.replace(/<[^>]*>/g, "");
}

export default function Rune(props: Props) {
  return (
    <div className="flex justify-center items-center flex-col-reverse sm:flex-row sm:justify-end">
      <div className="flex flex-col text-center sm:p-2 sm:text-right sm:w-5/6">
        <span className="font-semibold hidden sm:inline">
          {props.Rune?.name}
        </span>
        {props.Rune?.shortDesc && (
          <span className="text-sm hidden sm:inline">
            {eliminarEtiquetasHTML(props.Rune?.shortDesc)}
          </span>
        )}
      </div>
      <div className="flex justify-center sm:w-1/6">
        <Image
          className={`${
            props.IsMainRune ? "w-24" : "w-12"
          } m-auto aspect-square`}
          src={`https://ddragon.leagueoflegends.com/cdn/img/${props.Rune?.icon}`}
          alt={props.Rune?.id as unknown as string}
          width={5}
          height={5}
          unoptimized={true}
        />
      </div>
    </div>
  );
}
