import { useCallback } from "react";
import { useHomepageData } from "../providers";

export function useWidget(id) {
  const { homepageData, setHomepageData } = useHomepageData();

  const widget = homepageData.widgetDetails[id];

  const setWidget = useCallback(
    (updater) => {
      setHomepageData((oldHomepageData) => {
        const oldWidget = oldHomepageData.widgetDetails[id];
        const updatedWidget =
          typeof updater === "function" ? updater(oldWidget) : updater;

        return {
          ...oldHomepageData,
          widgetDetails: {
            ...oldHomepageData.widgetDetails,
            [id]: updatedWidget,
          },
        };
      });
    },
    [id, setHomepageData]
  );

  return { widget, setWidget };
}
