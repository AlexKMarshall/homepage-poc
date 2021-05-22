import {
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import styled from "styled-components";
import { useEditMode } from "../providers";
import { Card } from "./card";
import { useReorderWidgetItems } from "../hooks";
import { ConditionalWrapper } from "./conditional-wrapper";

export function Cards({ id, itemIds }) {
  const { isEditMode } = useEditMode();
  return (
    <SCards>
      <ConditionalWrapper
        condition={isEditMode}
        wrapper={(props) => (
          <CardsEditWrapper id={id} itemIds={itemIds} {...props} />
        )}
      >
        {itemIds.map((id) => (
          <Card key={id} id={id} />
        ))}
      </ConditionalWrapper>
    </SCards>
  );
}

const SCards = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 16px;
`;

function CardsEditWrapper({ id, itemIds, children }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const { reorderWidgetItems } = useReorderWidgetItems(id);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => reorderWidgetItems(active.id, over.id)}
    >
      <SortableContext items={itemIds} strategy={horizontalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}
