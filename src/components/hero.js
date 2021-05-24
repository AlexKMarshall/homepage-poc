import styled from "styled-components";

export function Hero({ title, imgUrl, status }) {
  return (
    <SHero status={status}>
      <h2>Hero Widget "{title}"</h2>
      <p>img url {imgUrl}</p>
    </SHero>
  );
}

const SHero = styled.div`
  padding: 2rem;
  border: 1px solid black;
  background-color: ${(p) =>
    p.status === "pending"
      ? "orange"
      : p.status === "error"
      ? "red"
      : p.status === "success"
      ? "green"
      : ""};
`;
