import React, { useState } from "react";
import styled from "styled-components";
import { arrayMove } from "./utils";
import { mockLayoutData } from "./mockData";
import { CardsWidget } from "./cards-dndkit";

export default function Homepage() {
  const [layoutData, setLayoutData] = useState(mockLayoutData);
  const {
    data: {
      project_homepage: { project, sections },
    },
  } = layoutData;

  function handleWidgetReorder(sectionId, widgetId, { activeId, overId }) {
    if (activeId === overId) return; // nothing changed

    setLayoutData((oldLayout) => {
      const itemsArray = oldLayout.data.project_homepage.sections
        .find((section) => section.uid === sectionId)
        .widgets.find((widget) => widget.uid === widgetId).items;

      const oldIndex = itemsArray.findIndex(({ uid }) => uid === activeId);
      const newIndex = itemsArray.findIndex(({ uid }) => uid === overId);

      const updatedItemsArray = arrayMove(itemsArray, oldIndex, newIndex);

      return {
        ...oldLayout,
        data: {
          ...oldLayout.data,
          project_homepage: {
            ...oldLayout.data.project_homepage,
            sections: oldLayout.data.project_homepage.sections.map((section) =>
              section.uid === sectionId
                ? {
                    ...section,
                    widgets: section.widgets.map((widget) =>
                      widget.uid === widgetId
                        ? {
                            ...widget,
                            items: updatedItemsArray,
                          }
                        : widget
                    ),
                  }
                : section
            ),
          },
        },
      };
    });
  }

  return (
    <div>
      <h1>{project.name}</h1>
      {sections.map((section) => (
        <Stack key={section.uid}>
          <h2>{section.name}</h2>

          {section.widgets.map((widget) => (
            <Widget
              key={widget.uid}
              {...widget}
              handleWidgetReorder={({ activeId, overId }) =>
                handleWidgetReorder(section.uid, widget.uid, {
                  activeId,
                  overId,
                })
              }
            />
          ))}
        </Stack>
      ))}
    </div>
  );
}

function Widget({ uid, type, items, handleWidgetReorder }) {
  switch (type) {
    case "cards":
      return (
        <CardsWidget items={items} handleWidgetReorder={handleWidgetReorder} />
      );
    case "headline":
      return <Headline />;
    case "hero":
      return <Hero />;
    default:
      throw new Error(`Unexpected widget type "${type}"`);
  }
}

function Headline() {
  return <div>Headling</div>;
}

function Hero() {
  return <div>Hero</div>;
}

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
