import React from "react";

import * as S from "./styles";

import LogoImg from "../../assets/logo.png";

const Header: React.FC = ({ children }) => {
  return (
    <S.Container>
      <S.Img source={LogoImg} />
      {children}
    </S.Container>
  );
};

export default Header;
