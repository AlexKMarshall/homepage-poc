import { createContext, useContext, useState, useCallback } from "react";
import { queryFlatLayoutData } from "./mockData";

const HomepageDataContext = createContext();
HomepageDataProvider.displayName = "HomepageDataContext";

export function HomepageDataProvider({ children }) {
  const [homepageData, setHomepageData] = useState(() => queryFlatLayoutData());

  const value = { homepageData, setHomepageData };

  return (
    <HomepageDataContext.Provider value={value}>
      {children}
    </HomepageDataContext.Provider>
  );
}

export function useHomepageData() {
  const context = useContext(HomepageDataContext);
  if (context === undefined) {
    throw new Error(
      "useHompageData must be used within a HomepageDataProvider"
    );
  }
  return context;
}

const EditModeContext = createContext();
EditModeContext.displayName = "EditModeContext";

export function EditModeProvider({ children }) {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = useCallback(
    () => setIsEditMode((isEditMode) => !isEditMode),
    []
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
