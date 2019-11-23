import styled from 'styled-components';

export const Message = styled.div<{ show: boolean }>`
  position: fixed;
  top: ${props => (props.show ? '20px' : '-100%')};
  left: 0;
  right: 0;
  padding: 8px;
  text-align: center;
  transition: top 0.3s ease-in-out;
  z-index: 9999;
`;

export const MessageContent = styled.div`
  display: inline-block;
  padding: 8px 16px;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const Text = styled.p`
  display: inline-block;
  margin: 0 0 0 5px;
  line-height: 20px;
`;
