import React, { useState } from "react";
import { Horizen } from "../../baseUI/horizen-item";
import { categoryTypes, alphaTypes } from "../../api/config";
import styled from "styled-components";

export const NavContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`;

const Singers = () => {
  let [category, setCategory] = useState("");
  let [alpha, setAlpha] = useState("");

  let handleUpdateAlpha = (val) => {
    setAlpha(val);
  };

  let handleUpdateCatetory = (val) => {
    setCategory(val);
  };

  return (
    <NavContainer>
      <Horizen
        list={categoryTypes}
        oldVal={category}
        handleClick={(val) => handleUpdateCatetory(val)}
        title={"分类 (默认热门):"}
      />
      <Horizen
        list={alphaTypes}
        oldVal={alpha}
        handleClick={(val) => handleUpdateAlpha(val)}
        title={"首字母:"}
      />
    </NavContainer>
  );
};

export default Singers;
