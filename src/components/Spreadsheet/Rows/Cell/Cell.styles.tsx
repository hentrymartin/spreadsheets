import styled from "styled-components";
import {
  BLACK_WITH_ALPHA,
  LIGHT_GREY,
} from "../../../../styles/variables/pallete";

interface CellWrapperProps {
  isLast: boolean;
  error: boolean;
  focused: boolean;
}

export const CellWrapper = styled.div`
  width: 160px;
  background-color: ${LIGHT_GREY};
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: ${(props: CellWrapperProps) =>
    !props.isLast && `1px solid ${BLACK_WITH_ALPHA}`};
  border: ${(props: CellWrapperProps) => props.error && '1px solid red'};
  position: relative;
  border: ${(props: CellWrapperProps) => props.focused && '1px dotted #04cbda'};
`;

export const CellContent = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
`;

export const IconWrapper = styled.div`
  margin-right: 6px;
`;

export const Input = styled.input`
  border-color: transparent;
  background-color: ${LIGHT_GREY};
  outline: none;
  margin-left: 6px;
  width: 80%;
`;
