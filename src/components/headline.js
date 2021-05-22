import styled from "styled-components";

export function Headline({ title, description }) {
  return (
    <SHeadline>
      <h2>Headline Widget "{title}"</h2>
      <p>{description}</p>
    </SHeadline>
  );
}

const SHeadline = styled.div`
  padding: 2rem;
  border: 1px solid black;
`;
