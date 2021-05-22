import React from "react";
import { Section } from "./components/section";
import { useEditMode, useHomepageData } from "./providers";

export default function Homepage() {
  const { homepageData } = useHomepageData();

  const {
    homepageDetails: { project: projectNew, sectionIds },
  } = homepageData;

  const { isEditMode, toggleEditMode } = useEditMode();

  return (
    <div>
      <h1>{projectNew.name}</h1>
      <button onClick={toggleEditMode}>
        {isEditMode ? "Editing" : "Read-Only"}
      </button>
      {sectionIds.map((id) => (
        <Section key={id} id={id} />
      ))}
    </div>
  );
}
