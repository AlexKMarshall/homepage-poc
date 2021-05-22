import { useHomepageData } from "../providers";

export function useCard(id) {
  const { homepageData } = useHomepageData();
  return { card: homepageData.itemDetails[id] };
}
