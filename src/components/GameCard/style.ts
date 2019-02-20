import styled from '@/utils/styled';

export const Card = styled.div`
  position: relative;
  padding-bottom: 75px;
`;

export const Img = styled.img`
  display: block;
  width: 100%;
`;

export const Text = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 15px;
  width: 100%;
  line-height: 20px;
  color: #fff;
  background: #161616;
  box-sizing: border-box;
  z-index: 1;
`;

export const Title = styled.p`
  margin: 0 0 5px;
  width: 100%;
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const Info = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 5px;
  justify-content: space-between;
  align-items: center;
`;

export const Rate = styled.div`
  > i + i {
    margin-left: 3px;
  }
`;
