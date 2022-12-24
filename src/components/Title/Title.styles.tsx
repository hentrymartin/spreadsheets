import styled from "styled-components";
import { FONT_FAMILY } from "../../styles/variables/font";
import { DARK_GREY } from "../../styles/variables/pallete";

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const H1 = styled.h1`
  font-family: ${FONT_FAMILY};
`;

export const LoadingWrapper = styled.div`
  margin-left: 24px;
  font-family: ${FONT_FAMILY};
  display: flex;
  align-items: center;
`;

export const AutoSaveText = styled.span`
  margin-right: 6px;
  font-size: 12px;
  color: ${DARK_GREY};
`