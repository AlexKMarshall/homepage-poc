import { forwardRef, useMemo } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import styled from "styled-components";

export function CardsWidget({ items, onCardsReorder }) {
  const itemsWithId = useMemo(
    () => items.map((item) => ({ ...item, id: item.uid })),
    [items]
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    onCardsReorder({ activeId: active.id, overId: over.id });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={itemsWithId}
        strategy={horizontalListSortingStrategy}
      >
        <SCards>
          {itemsWithId.map(({ uid, span }) => (
            <SortableCard key={uid} uid={uid} span={span} />
          ))}
        </SCards>
      </SortableContext>
    </DndContext>
  );
}

const SCards = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 16px;
`;

function SortableCard({ uid, name, span }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: uid });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : null,
    transition,
  };
  return (
    <CardWithRef
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      colSpan={span}
    >
      {uid}
    </CardWithRef>
  );
}

function Card({ uid, span, children, ...props }, ref) {
  return (
    <SCard colSpan={span} {...props} ref={ref}>
      {children}
    </SCard>
  );
}

const CardWithRef = forwardRef(Card);

const SCard = styled.div`
  height: 300px;
  border: 1px solid black;
  grid-column: span ${(p) => p.colSpan};
`;
