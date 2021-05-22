import { useSortable } from "@dnd-kit/sortable";
import styled from "styled-components";
import { useEditMode } from "../providers";
import { useCard } from "../hooks";
import { useCallback, useState } from "react";

export function Card({ id }) {
  const { isEditMode } = useEditMode();

  return isEditMode ? <CardEditMode id={id} /> : <CardViewMode id={id} />;
}

function CardEditMode({ id }) {
  const { card, updateCardField } = useCard(id);
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
      ? `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${
          isDragging ? 1.05 : 1
        })`
      : null,
    transition,
  };

  const updateTitle = useCallback(
    (newTitle) => {
      updateCardField("title", newTitle);
    },
    [updateCardField]
  );

  return (
    <SCard
      colSpan={card.span}
      ref={setNodeRef}
      style={style}
      {...attributes}
      isDragging={isDragging}
    >
      <CardHeader>
        <EditableText defaultValue={card.title} onSave={updateTitle} />
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
  background-color: ${(p) => (p.isDragging ? "red" : "cornsilk")};
  z-index: ${(p) => (p.isDragging ? 1 : 0)};
  ${(p) =>
    p.isDragging
      ? `box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
    0px 15px 15px 0 rgba(34, 33, 81, 0.25)`
      : undefined};
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

function EditableText({ defaultValue, onSave }) {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const saveChange = useCallback(() => {
    setIsEdit(false);
    onSave(value);
  }, [onSave, value]);

  const cancelChange = useCallback(() => {
    setIsEdit(false);
    setValue(defaultValue);
  }, [defaultValue]);

  return isEdit ? (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={saveChange}>save</button>
      <button onClick={cancelChange}>cancel</button>
    </div>
  ) : (
    <div>
      <h3>{value}</h3>
      <button onClick={() => setIsEdit(true)}>edit</button>
    </div>
  );
}
