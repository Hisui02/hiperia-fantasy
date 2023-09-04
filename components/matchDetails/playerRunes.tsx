"use client";

import { StyleRuneInterface, RuneInterface } from "@/Interfaces";

import RuneStyle from "./RuneStyle";
import Rune from "./Rune";
interface Props {
  PerkMetadata: {
    styleId: number;
    subStyleId: number;
    perks: number[];
  };
  Perks: StyleRuneInterface[];
}

// const getPerks = async () => {
//   const res = await fetch(
//     "https://ddragon.leagueoflegends.com/cdn/13.15.1/data/es_ES/runesReforged.json"
//   );
//   if (!res.ok) {
//     throw new Error(`Could not fetch runes data.`);
//   } else {
//     return res.json();
//   }
// };

export default function PlayerRunes(props: Props) {
  const { PerkMetadata: perkMetadata, Perks: perksData } = props;
  // const perksData: [StyleRuneInterface] = await getPerks();

  // if (!perkMetadata) return <div></div>;

  // console.log(perkMetadata);

  const styleRune = perksData.find((p) => {
    return p.id == perkMetadata.styleId;
  });

  const subStyleRune = perksData.find((p) => {
    return p.id == perkMetadata.subStyleId;
  });

  const buscarRuna = (runeId: number) => {
    let encontrada: boolean = false;
    let runabuscada;
    let contador1 = 0;
    let contador2 = 0;
    while (!encontrada) {
      runabuscada = perksData[contador1].slots[contador2].runes.find((rune) => {
        return rune.id == runeId;
      });

      contador2++;

      if (contador1 == perksData.length) return;

      if (contador2 == 4) {
        contador2 = 0;
        contador1++;
      }

      if (runabuscada != undefined) encontrada = true;
    }
    return runabuscada;
  };

  let runenumber = 0;

  return (
    <>
      <RuneStyle Rune={styleRune as StyleRuneInterface} />
      <div className="flex sm:flex-col justify-evenly p-2">
        {styleRune?.slots.map((slot) => {
          const rune = slot.runes.find((rune) => {
            return rune.id == perkMetadata.perks[runenumber];
          });
          runenumber++;
          return (
            <Rune
              key={rune?.id}
              Rune={rune as RuneInterface}
              IsMainRune={runenumber == 1 ? true : false}
            />
          );
        })}
      </div>
      <RuneStyle Rune={subStyleRune as StyleRuneInterface} />
      <div className="flex sm:flex-col justify-evenly p-2">
        <Rune Rune={buscarRuna(perkMetadata.perks[4]) as RuneInterface} />
        <Rune Rune={buscarRuna(perkMetadata.perks[5]) as RuneInterface} />
      </div>
    </>
  );
}
