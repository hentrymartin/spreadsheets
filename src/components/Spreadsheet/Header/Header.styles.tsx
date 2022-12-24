import styled from "styled-components";
import { FONT_FAMILY } from "../../../styles/variables/font";
import { GREY } from "../../../styles/variables/pallete";

export const HeaderWrapper = styled.div`
  display: flex;
  background-color: ${GREY};
  height: 32px;
  align-self: flex-start;
`;

export const HeaderItem = styled.div`
  width: 160px;
  font-family: ${FONT_FAMILY};
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  align-items: center;
  display: flex;
  justify-content: center;
  border-right: 1px solid transparent;
`;
