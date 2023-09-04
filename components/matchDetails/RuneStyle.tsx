"use client";

import { StyleRuneInterface } from "@/Interfaces";

interface Props {
  Rune: StyleRuneInterface;
}

export default function RuneStyle(props: Props) {
  return (
    <div className="flex justify-end items-center border-b-2 border-secondary p-2">
      <span className="text-right font-bold inline-block w-5/6 p-2">
        {props.Rune?.name}
      </span>
      <div className="flex justify-center w-1/6">
        <img
          className="w-10"
          src={`https://ddragon.leagueoflegends.com/cdn/img/${props.Rune?.icon}`}
          alt={`${props.Rune.id}`}
        />
      </div>
    </div>
  );
}
