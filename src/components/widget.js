import { Cards } from "./cards";
import { Headline } from "./headline";
import { Hero } from "./hero";
import { useWidget } from "../hooks";
import styled from "styled-components";
import { useEditMode } from "../providers";
import { ConditionalWrapper } from "./conditional-wrapper";

export function Widget({ id, moveWidget }) {
  const { widget } = useWidget(id);
  const { isEditMode } = useEditMode();

  return (
    <ConditionalWrapper
      condition={isEditMode}
      wrapper={(props) => (
        <WidgetEditWrapper id={id} moveWidget={moveWidget} {...props} />
      )}
    >
      <WidgetSelector widget={widget} />
    </ConditionalWrapper>
  );
}

function WidgetSelector({ widget }) {
  switch (widget.type) {
    case "cards":
      return <Cards id={widget.uid} itemIds={widget.itemIds} />;
    case "headline":
      return <Headline title={widget.title} description={widget.description} />;
    case "hero":
      return (
        <Hero
          title={widget.title}
          imgUrl={widget.imgUrl}
          status={widget.status}
        />
      );
    default:
      throw new Error(`Unexpected widget type "${widget.type}"`);
  }
}

function WidgetEditWrapper({ id, moveWidget, children }) {
  return (
    <SEditOutline>
      {children}
      <button onClick={() => moveWidget(id, "up")}>Move up</button>
      <button onClick={() => moveWidget(id, "down")}>Move down</button>
    </SEditOutline>
  );
}

const SEditOutline = styled.div`
  outline: 1px red dashed;
  outline-offset: 8px;
`;
