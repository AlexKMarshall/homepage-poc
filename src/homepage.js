import React, { useState } from "react";
import styled from "styled-components";
import { arrayMove } from "./utils";
import { queryLayoutData, querySingleWidget } from "./mockData";
import { CardsWidget } from "./cards-dndkit";

export default function Homepage() {
  const [layoutData, setLayoutData] = useState(() => queryLayoutData());
  const {
    data: {
      project_homepage: { project, sections },
    },
  } = layoutData;

  function handleWidgetItemsReorder(sectionId, widgetId, { activeId, overId }) {
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
              onWidgetItemsReorder={({ activeId, overId }) =>
                handleWidgetItemsReorder(section.uid, widget.uid, {
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

function Widget({ uid, type, items, onWidgetItemsReorder }) {
  const widgetDetails = querySingleWidget(uid);

  switch (type) {
    case "cards":
      return (
        <CardsWidget
          items={items}
          itemDetails={widgetDetails.itemDetails}
          onCardsReorder={onWidgetItemsReorder}
        />
      );
    case "headline":
      return (
        <Headline
          title={widgetDetails.title}
          description={widgetDetails.description}
        />
      );
    case "hero":
      return <Hero title={widgetDetails.title} imgUrl={widgetDetails.imgUrl} />;
    default:
      throw new Error(`Unexpected widget type "${type}"`);
  }
}

function Headline({ title, description }) {
  return (
    <SHeadline>
      <h2>Headline Widget "{title}"</h2>
      <p>{description}</p>
    </SHeadline>
  );
}

const SHeadline = styled.div`
  padding: 2rem;
  border: 1px solid black;
`;

function Hero({ title, imgUrl }) {
  return (
    <SHero>
      <h2>Hero Widget "{title}"</h2>
      <p>img url {imgUrl}</p>
    </SHero>
  );
}

const SHero = styled.div`
  padding: 2rem;
  border: 1px solid black;
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
