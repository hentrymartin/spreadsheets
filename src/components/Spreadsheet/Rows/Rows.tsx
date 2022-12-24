import { FC, useState } from "react";
import {
  API_URL,
  COLUMN_COUNT,
  MAX_RETRY,
  ROW_COUNT,
} from "../../../constants";
import { DataContext } from "../../../contexts/DataContext";
import { SaveResponse, SaveStatus } from "../../../types";
import { diffInMilliSeconds } from "../../../utils/date";
import { Cell } from "./Cell/Cell";
import { ColumnsWrapper, RowsWrapper } from "./Rows.styles";

interface RowsProps {
  loading: boolean;
  onLoading: (loading: boolean) => void;
}

let controller: AbortController | null = null;

export const Rows: FC<RowsProps> = ({ loading, onLoading }) => {
  const rows = new Array(ROW_COUNT).fill("");
  const columns = new Array(COLUMN_COUNT).fill("");
  const [spreadsheet, setSpreadsheet] = useState({});
  let retryAttempt: number = 0;

  const createCSV = (data: any) => {
    const csvMap: {
      [key: string]: string;
    } = {};
    for (const [key, value] of Object.entries(data)) {
      const row = key.replace(/[^\d.-]/g, "");
      const column = key.replace(/[0-9]/g, "");
      const data = `${row}:${value}`;
      if (!csvMap[column]) {
        csvMap[column] = `${column},${data}`;
      } else {
        csvMap[column] += `,${data}`;
      }
    }

    return Object.values(csvMap).join("\n");
  };

  const getStatus = (id: string) => {
    fetch(`${API_URL}/get-status?id=${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response: SaveResponse) => {
        if (response.status === SaveStatus.IN_PROGRESS && response.done_at) {
          followUpRequestInprogress(response);
        } else if (response.status === SaveStatus.DONE) {
          onLoading(false);
        }
      });
  };

  const followUpRequestInprogress = (response: SaveResponse) => {
    const milliSeconds = diffInMilliSeconds(
      new Date(),
      new Date(response.done_at)
    );
    // In case if the API still returns IN_PROGRESS after reaching the done_at time
    // Then retry in next 2500 milliseconds
    const retryIn = milliSeconds < 0 ? 2500 : milliSeconds;
    // This will retrigger saving CSV after some times
    setTimeout(getStatus.bind(response, response.id), retryIn);
  };

  const saveCSV = (csv: string) => {
    controller = new AbortController();
    onLoading(true);
    fetch(`${API_URL}/save`, {
      method: "POST",
      body: JSON.stringify({
        data: csv,
      }),
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((response: SaveResponse) => {
        if (response.status === SaveStatus.IN_PROGRESS && response.done_at) {
          followUpRequestInprogress(response);
        } else if (response.status === SaveStatus.DONE) {
          onLoading(false);
        }
        // Reset the retry attempt to zero
        retryAttempt = 0;
      })
      .catch((e) => {
        if (e.name !== "AbortError") {
          // In case of failure, retry to save the CSV
          if (retryAttempt < MAX_RETRY) {
            saveCSV(csv);
            retryAttempt++;
          } else {
            onLoading(false);
            console.log(
              "Reattempts exceeds the retry limit. Please wait for sometime and resave the document"
            );
          }
        }
      });
  };

  const saveData = (data: any) => {
    const csv = createCSV(data);
    saveCSV(csv);
  };

  const onSpreadsheetUpdated = (data: any, shouldSaveData: boolean) => {
    setSpreadsheet(data);
    // If there is already a save request in progress then cancel that and
    // create a new save request
    if (controller) {
      onLoading(false);
      controller.abort();
    }

    // Trigger the API call only when the data is changed
    if (shouldSaveData) {
      saveData(data);
    }
  };

  return (
    <DataContext.Provider
      value={{
        spreadsheet,
      }}
    >
      <RowsWrapper>
        {rows.map((row, rowNumber: number) => (
          <ColumnsWrapper>
            {columns.map((column, columnNumber: number) => (
              <Cell
                rowNumber={rowNumber}
                columnNumber={columnNumber}
                isLast={columnNumber === columns.length - 1}
                onBlur={onSpreadsheetUpdated}
              />
            ))}
          </ColumnsWrapper>
        ))}
      </RowsWrapper>
    </DataContext.Provider>
  );
};
