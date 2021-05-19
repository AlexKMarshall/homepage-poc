import React, { useCallback, useContext, useState } from "react";
import styled from "styled-components";
import { arrayMove } from "./utils";
import { queryLayoutData, querySingleWidget } from "./mockData";
import { CardsWidget } from "./cards-dndkit";

const EditModeContext = React.createContext();
EditModeContext.displayName = "EditModeContext";

export function EditModeProvider({ children }) {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = useCallback(() =>
    setIsEditMode((isEditMode) => !isEditMode)
  );

  const value = {
    isEditMode,
    toggleEditMode,
  };

  return (
    <EditModeContext.Provider value={value}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  const context = useContext(EditModeContext);
  if (context === undefined) {
    throw new Error("useEditMode must be used within an EditModeProvider");
  }
  return context;
}

export default function Homepage() {
  const [layoutData, setLayoutData] = useState(() => queryLayoutData());
  const {
    data: {
      project_homepage: { project, sections },
    },
  } = layoutData;

  const { isEditMode, toggleEditMode } = useEditMode();

  function handleWidgetItemsReorder(sectionId, widgetId, { activeId, overId }) {
    if (activeId === overId) return; // nothing changed

    setLayoutData((oldLayout) => {
      const itemsArray = oldLayout.data.project_homepage.sections
        .find((section) => section.uid === sectionId)
        .widgets.find((widget) => widget.uid === widgetId).items;

      const oldIndex = itemsArray.findIndex(({ uid }) => uid === activeId);
      const newIndex = itemsArray.findIndex(({ uid }) => uid === overId);

      const updatedItemsArray = arrayMove(itemsArray, oldIndex, newIndex);
      const updatedItemsArryWithPositions = updatedItemsArray.map(
        (item, index) => ({ ...item, position: index + 1 })
      );

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
                            items: updatedItemsArryWithPositions,
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

  function handleWidgetReorder(sectionId, { activeId, direction }) {
    setLayoutData((oldLayout) => {
      const widgetsArray = oldLayout.data.project_homepage.sections.find(
        (section) => section.uid === sectionId
      ).widgets;

      const oldIndex = widgetsArray.findIndex(({ uid }) => uid === activeId);
      const newIndex = oldIndex + (direction === "up" ? -1 : 1);

      const updatedWidgetsArray = arrayMove(widgetsArray, oldIndex, newIndex);
      const updatedWidgetsArryWithPositions = updatedWidgetsArray.map(
        (widget, index) => ({ ...widget, position: index + 1 })
      );

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
                    widgets: updatedWidgetsArryWithPositions,
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
      <button onClick={toggleEditMode}>
        {isEditMode ? "Editing" : "Read-Only"}
      </button>
      {sections.map((section) => (
        <Stack key={section.uid}>
          <h2>{section.name}</h2>

          {section.widgets.map((widget, index, arr) => (
            <div key={widget.uid}>
              <Widget
                {...widget}
                onWidgetItemsReorder={({ activeId, overId }) =>
                  handleWidgetItemsReorder(section.uid, widget.uid, {
                    activeId,
                    overId,
                  })
                }
              />
              {index !== 0 && isEditMode && (
                <button
                  key={`${widget.uid}-upbutton`}
                  onClick={() =>
                    handleWidgetReorder(section.uid, {
                      activeId: widget.uid,
                      direction: "up",
                    })
                  }
                >
                  Move up
                </button>
              )}
              {index !== arr.length - 1 && isEditMode && (
                <button
                  key={`${widget.uid}-downbutton`}
                  onClick={() =>
                    handleWidgetReorder(section.uid, {
                      activeId: widget.uid,
                      direction: "down",
                    })
                  }
                >
                  Move down
                </button>
              )}
            </div>
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
