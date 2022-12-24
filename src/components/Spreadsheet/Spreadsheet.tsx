import { FC, useState } from "react";
import { COLUMN_COUNT } from "../../constants";
import { Title } from "../Title/Title";
import { Header } from "./Header/Header";
import { Rows } from "./Rows/Rows";
import { SpreadsheetWrapper } from "./Spreadsheet.styles";

export const Spreadsheet: FC = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Title title="UI Spreadsheet" loading={loading} />
      <SpreadsheetWrapper>
        <Header columnsCount={COLUMN_COUNT} />
        <Rows onLoading={setLoading} loading={loading} />
      </SpreadsheetWrapper>
    </>
  );
};
