import { useCallback } from "react";
import { useHomepageData } from "../providers";

export function useCard(id) {
  const { homepageData, setHomepageData } = useHomepageData();

  const setCard = useCallback(
    (updater) => {
      setHomepageData((oldHomepage) => {
        const oldCard = oldHomepage.itemDetails[id];

        const updatedCard =
          typeof updater === "function" ? updater(oldCard) : updater;

        return {
          ...oldHomepage,
          itemDetails: {
            ...oldHomepage.itemDetails,
            [id]: updatedCard,
          },
        };
      });
    },
    [id, setHomepageData]
  );

  const updateCardField = useCallback(
    (field, value) => {
      setCard((oldCard) => ({
        ...oldCard,
        [field]: value,
      }));
    },
    [setCard]
  );

  return { card: homepageData.itemDetails[id], setCard, updateCardField };
}
