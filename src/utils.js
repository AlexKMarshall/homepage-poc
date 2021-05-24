import faker from "faker";
export { arrayMove } from "@dnd-kit/sortable";

export function arrayInsert(array, item, index) {
  const beginning = array.slice(0, index);
  const end = array.slice(index);

  return [...beginning, item, ...end];
}

export function serverRequest(item, canFail = true) {
  const willFail = canFail && Math.random() > 0.8;

  const success = (resolver) => {
    const savedItem = { ...item, uid: faker.datatype.uuid() };
    resolver(savedItem);
  };

  return new Promise((resolve, reject) =>
    setTimeout(willFail ? reject : () => success(resolve), 5000)
  );
}
