import { Stack } from "./stack";
import { useReorderWidgets, useSection } from "../hooks";
import { Widget } from "./widget";

export function Section({ id }) {
  const { section } = useSection(id);
  const { moveWidget } = useReorderWidgets(id);
  return (
    <Stack>
      <h2>{section.name}</h2>
      {section.widgetIds.map((id) => (
        <Widget key={id} id={id} moveWidget={moveWidget} />
      ))}
    </Stack>
  );
}
