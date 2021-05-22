import { useSortable } from "@dnd-kit/sortable";
import styled from "styled-components";
import { useEditMode } from "../providers";
import { useCard } from "../hooks";

export function Card({ id }) {
  const { isEditMode } = useEditMode();

  return isEditMode ? <CardEditMode id={id} /> : <CardViewMode id={id} />;
}

function CardEditMode({ id }) {
  const { card } = useCard(id);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : null,
    transition,
  };

  return (
    <SCard
      colSpan={card.span}
      ref={setNodeRef}
      style={style}
      {...attributes}
      isDragging={isDragging}
    >
      <CardHeader>
        <h3>{card.title}</h3>
        <button {...listeners}>drag</button>
      </CardHeader>
      <p>image: {card.imgUrl}</p>
      <p>{card.description}</p>
    </SCard>
  );
}
function CardViewMode({ id }) {
  const { card } = useCard(id);
  return (
    <SCard colSpan={card.span}>
      <h3>{card.title}</h3>
      <p>image: {card.imgUrl}</p>
      <p>{card.description}</p>
    </SCard>
  );
}

const SCard = styled.div`
  height: 300px;
  border: 1px solid black;
  padding: 2rem;
  grid-column: span ${(p) => p.colSpan};
  background-color: cornsilk;
  z-index: ${(p) => (p.isDragging ? 1 : 0)};
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
