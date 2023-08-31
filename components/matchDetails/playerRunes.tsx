interface Props {
  perkMetadata: { styleId: number; subStyleId: number; perks: [] };
}

const getPerks = async () => {
  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/13.15.1/data/es_ES/runesReforged.json"
  );
  if (!res.ok) {
    throw new Error(`Could not fetch runes data.`);
  } else {
    return res.json();
  }
};

export default async function PlayerRunes(props: Props) {
  const { perkMetadata: perks } = props;
  const perksData = await getPerks();
  return (
    <div>
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7204_Resolve.png`}
        alt={`${perks.styleId}`}
      />
      <span>{perks.styleId}</span>
    </div>
  );
}
