import { arrayMove } from "@dnd-kit/sortable";
import { useCallback } from "react";
import { useSection } from "./section";
import { useWidget } from "./widget";

export function useReorderWidgetItems(widgetId) {
  const { widget, setWidget } = useWidget(widgetId);

  const reorderWidgetItemsIndex = useCallback(
    (oldIndex, newIndex) => {
      if (oldIndex === newIndex) return;

      setWidget((oldWidget) => {
        const oldItemIds = oldWidget.itemIds;

        const updatedItemIds = arrayMove(oldItemIds, oldIndex, newIndex);

        return { ...oldWidget, itemIds: updatedItemIds };
      });
    },
    [setWidget]
  );

  const { itemIds } = widget;

  const reorderWidgetItemsDrag = useCallback(
    (activeId, overId) => {
      if (activeId === overId) return; // nothing changed
      const oldIndex = itemIds.indexOf(activeId);
      const newIndex = itemIds.indexOf(overId);
      reorderWidgetItemsIndex(oldIndex, newIndex);
    },
    [itemIds, reorderWidgetItemsIndex]
  );

  return { reorderWidgetItemsDrag };
}

export function useReorderWidgets(sectionId) {
  const { section, setSection } = useSection(sectionId);

  const reorderWidgetsIndex = useCallback(
    (oldIndex, newIndex) => {
      if (oldIndex === newIndex) return; //nothing moved

      setSection((oldSection) => {
        const widgetsArray = oldSection.widgetIds;

        const updatedWidgetsArray = arrayMove(widgetsArray, oldIndex, newIndex);

        return { ...oldSection, widgetIds: updatedWidgetsArray };
      });
    },
    [setSection]
  );

  const { widgetIds } = section;

  const moveWidget = useCallback(
    (widgetId, direction) => {
      const oldIndex = widgetIds.indexOf(widgetId);
      const indexOffset = direction === "up" ? -1 : 1;
      const newIndex = oldIndex + indexOffset;
      if (newIndex < 0 || newIndex >= widgetIds.length) return; // don't move outside array

      reorderWidgetsIndex(oldIndex, oldIndex + indexOffset);
    },
    [reorderWidgetsIndex, widgetIds]
  );

  return { moveWidget };
}
