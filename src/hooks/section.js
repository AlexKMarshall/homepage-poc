import { useCallback } from "react";
import { useHomepageData } from "../providers";

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

  return { section: homepageData.sectionDetails[id], setSection };
}
