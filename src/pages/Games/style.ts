import styled from '@/utils/styled';

export const List = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(2, 1fr);
  margin: 0 auto;
  padding: 15px;
  max-width: 1000px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }
  > img {
    width: 100%;
  }
`;
