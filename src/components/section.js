import { Stack } from "./stack";
import { useReorderWidgets, useSection } from "../hooks";
import { Widget } from "./widget";
import { useEditMode } from "../providers";
import React from "react";
import { buildWidget } from "../mockData";

export function Section({ id }) {
  const { section, addWidget } = useSection(id);
  const { moveWidget } = useReorderWidgets(id);
  const { isEditMode } = useEditMode();

  function addHeroWidget(index) {
    addWidget(buildWidget({ type: "hero" }), index);
  }

  return (
    <Stack>
      <h2>{section.name}</h2>
      {section.widgetIds.map((widgetId, index) => (
        <React.Fragment key={`${widgetId}-fragment`}>
          <Widget key={widgetId} id={widgetId} moveWidget={moveWidget} />
          {isEditMode && (
            <button
              key={`add-widget-after-${widgetId}`}
              onClick={() => addHeroWidget(index + 1)}
            >
              Add new Widget
            </button>
          )}
        </React.Fragment>
      ))}
    </Stack>
  );
}
