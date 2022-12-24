import {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  useContext,
  useRef,
  useState,
} from "react";

import { EditIcon } from "../../../../assets";
import { DataContext } from "../../../../contexts/DataContext";
import { toAlphabet } from "../../../../utils";
import { ExpressParser } from "../../../../utils/ExpressionParser";
import {
  collectAllVariables,
  modifyExpression,
} from "../../../../utils/parsing";
import { CellContent, CellWrapper, IconWrapper, Input } from "./Cell.styles";

interface CellProps {
  isLast: boolean;
  onBlur: (data: any, shouldSaveData: boolean) => void;
  columnNumber: number;
  rowNumber: number;
}

const expressionParser = new ExpressParser();

export const Cell: FC<CellProps> = ({
  isLast,
  columnNumber,
  rowNumber,
  onBlur,
}) => {
  const [cellData, setCellData] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const { spreadsheet } = useContext(DataContext);
  const ref = useRef<HTMLInputElement | null>(null);
  const [focused, setFocused] = useState<boolean>(false);
  // 0 means cell is not edited
  // 1 means cell is just added with fresh data
  // 2 means cell is edited with previously added data
  const [editState, setEditState] = useState<number>(0);

  const onCellContentChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setError(false);
    setCellData(e.target.value);
  };

  /**
   * This event would handle parsing of the express and evaluating the parsed expression
   * Along, with this it will auto save the content in CSV format
   * @returns
   */
  const onInputBlur: FocusEventHandler<HTMLInputElement> = () => {
    try {
      setFocused(false);
      if (!cellData) {
        return;
      }

      // If the expression doesn't start with "=" then return error
      if (
        isNaN(parseInt(cellData, 10)) &&
        isNaN(parseFloat(cellData)) &&
        cellData.charAt(0) !== "="
      ) {
        setError(true);
        return;
      }

      // Check if the cellData is an expression else no need to replace "="
      const isExpression =
        isNaN(parseInt(cellData, 10)) &&
        isNaN(parseFloat(cellData)) &&
        cellData.charAt(0) === "=";
      const expression = isExpression
        ? cellData.toString().substring(1)
        : cellData.toString();

      // Parse the expression to find all the nodes in the written expression
      const parsed = expressionParser.parse(expression);

      // Collect only the variables from the expression
      const variablesInTheExpression = collectAllVariables(parsed);

      // Modify invalid cell names like A000 to A0 or B0010 to B10
      const modifiedExpression = modifyExpression(
        variablesInTheExpression,
        expression
      );

      // Finally, evaluate the expression with the scope, in this case scope
      // would be the collection of cell data in map
      const evaluated = expressionParser.evaluate(
        modifiedExpression,
        spreadsheet
      );
      setCellData(evaluated);
      const data = {
        ...spreadsheet,
        [`${toAlphabet(columnNumber + 1)}${rowNumber}`]: evaluated,
      };

      const shouldSaveData = evaluated !== cellData;
      onBlur(data, shouldSaveData);

      if (shouldSaveData) {
        if (editState === 0) {
          setEditState(1);
        } else if (editState >= 1) {
          setEditState(2);
        }
      }
    } catch (e) {
      setError(true);
    }
  };

  const onFocus = () => {
    setFocused(true);
  };

  return (
    <CellWrapper error={error} isLast={isLast} focused={focused}>
      <CellContent>
        <Input
          value={cellData}
          onChange={onCellContentChange}
          autoFocus={columnNumber === 0 && rowNumber === 0}
          onFocus={onFocus}
          onBlur={onInputBlur}
          ref={ref}
        />
      </CellContent>
      {editState > 1 && (
        <IconWrapper>
          <EditIcon />
        </IconWrapper>
      )}
    </CellWrapper>
  );
};
