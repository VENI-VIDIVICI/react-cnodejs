import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
type Item = {
  name: string;
  route: string;
};
type NavLinkProps = {
  children?: React.ReactNode;
  list: Array<Item>;
};

const NavWrapper = styled.div`
  display: flex;
  height: 50px;
  color: #ccc;
  background: rgb(50, 50, 50);
  padding: 0 10px;
`;
const NavItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0 20px;
`;
const NavLink: FC<NavLinkProps> = ({ children, ...props }) => {
  const history = useHistory();
  const clickHandle = (item: Item) => {
    history.push(item.route);
  };
  return (
    <NavWrapper>
      {props.list.map((item) => {
        return (
          <NavItem onClick={() => clickHandle(item)} key={item.name}>
            {item.name}
          </NavItem>
        );
      })}
    </NavWrapper>
  );
};

export default NavLink;
