import { useCallback } from "react";
import { useHomepageData } from "../providers";
import { arrayInsert, serverRequest } from "../utils";

export function useSection(id) {
  const { homepageData, setHomepageData } = useHomepageData();

  const setSection = useCallback(
    (updater) => {
      setHomepageData((oldHomepageData) => {
        const oldSection = oldHomepageData.sectionDetails[id];
        const updatedSection =
          typeof updater === "function" ? updater(oldSection) : updater;

        return {
          ...oldHomepageData,
          sectionDetails: {
            ...oldHomepageData.sectionDetails,
            [id]: updatedSection,
          },
        };
      });
    },
    [id, setHomepageData]
  );

  const addWidget = useCallback(
    (widget, index) => {
      function onMutate() {
        setHomepageData((oldHomepageData) => ({
          ...oldHomepageData,
          widgetDetails: {
            ...oldHomepageData.widgetDetails,
            [widget.uid]: { ...widget, status: "pending" },
          },
        }));
        setSection((oldSection) => ({
          ...oldSection,
          widgetIds: arrayInsert(oldSection.widgetIds, widget.uid, index),
        }));
      }

      function onSuccess(savedWidget) {
        console.log("success", { savedWidget });
        const oldWidgetId = widget.uid;

        // add the new widget to the cache
        setHomepageData((oldHomepageData) => {
          const widgetDetails = { ...oldHomepageData.widgetDetails };
          widgetDetails[savedWidget.uid] = {
            ...savedWidget,
            status: "success",
          };
          return {
            ...oldHomepageData,
            widgetDetails,
          };
        });

        // update the layout array to point the server generated ID
        setSection((oldSection) => {
          const indexToUpdate = oldSection.widgetIds.indexOf(oldWidgetId);
          const widgetIds = [...oldSection.widgetIds];
          widgetIds[indexToUpdate] = savedWidget.uid;

          return {
            ...oldSection,
            widgetIds,
          };
        });

        // remove the widget with temporary id from the cache
        // however, this isn't ideal if the user has updated the widget before
        // as their changes will be lost
        setHomepageData((oldHomepageData) => {
          const widgetDetails = { ...oldHomepageData.widgetDetails };
          delete widgetDetails[oldWidgetId];
          return {
            ...oldHomepageData,
            widgetDetails,
          };
        });
      }
      function onError() {
        console.log("error");
        setHomepageData((oldHomepageData) => ({
          ...oldHomepageData,
          widgetDetails: {
            ...oldHomepageData.widgetDetails,
            [widget.uid]: {
              ...oldHomepageData.widgetDetails[widget.uid],
              status: "error",
            },
          },
        }));
      }

      onMutate();
      serverRequest(widget).then(onSuccess).catch(onError);
    },
    [setHomepageData, setSection]
  );

  return { section: homepageData.sectionDetails[id], setSection, addWidget };
}
