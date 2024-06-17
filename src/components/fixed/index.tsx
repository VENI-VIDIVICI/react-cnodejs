import React, { FC } from "react";
import styled from "styled-components";
type FixedProps = {
  children: React.ReactNode;
  top?: number;
};

const FixWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  overflow: hidden;
`;
const Fixed: FC<FixedProps> = (props) => {
  const { children } = props;
  return <FixWrapper>{children}</FixWrapper>;
};

export default Fixed;
