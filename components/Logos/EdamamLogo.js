export default function EdamamLogo({ color }) {
  const colorChoices = ["white", "badge", "light", "transparent"];
  if (!colorChoices.includes(color))
    throw Error(`Invalid color prop ${color} for Edamam Logo`);
  return <div id="edamam-badge" data-color={color}></div>;
}
