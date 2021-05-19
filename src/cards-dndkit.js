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

export function CardsWidget({ items, onCardsReorder, itemDetails }) {
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
          {itemsWithId.map(({ uid, span, position }) => (
            <SortableCard
              key={uid}
              uid={uid}
              span={span}
              position={position}
              cardDetails={itemDetails[uid]}
            />
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

function SortableCard({ uid, span, cardDetails, position }) {
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
      cardDetails={cardDetails}
      position={position}
    />
  );
}

function Card({ span, children, cardDetails, position, ...props }, ref) {
  const { title, imgUrl, description } = cardDetails;
  return (
    <SCard colSpan={span} {...props} ref={ref}>
      <h3>{title}</h3>
      <p>position: {position}</p>
      <p>image: {imgUrl}</p>
      <p>{description}</p>
    </SCard>
  );
}

const CardWithRef = forwardRef(Card);

const SCard = styled.div`
  height: 300px;
  border: 1px solid black;
  padding: 2rem;
  grid-column: span ${(p) => p.colSpan};
`;
