import styled from "styled-components";

export function Hero({ title, imgUrl }) {
  return (
    <SHero>
      <h2>Hero Widget "{title}"</h2>
      <p>img url {imgUrl}</p>
    </SHero>
  );
}

const SHero = styled.div`
  padding: 2rem;
  border: 1px solid black;
`;
