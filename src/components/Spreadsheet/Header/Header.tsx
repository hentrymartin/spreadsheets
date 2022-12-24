import { FC } from "react";
import { getColumns } from "../../../utils";
import { HeaderItem, HeaderWrapper } from "./Header.styles";

interface HeaderProps {
  columnsCount: number;
}

export const Header: FC<HeaderProps> = ({ columnsCount }) => {
  const columns = getColumns(columnsCount);
  return (
    <HeaderWrapper>
      {columns.map((column) => (
        <HeaderItem key={column}>{column}</HeaderItem>
      ))}
    </HeaderWrapper>
  );
};
