export enum SaveStatus {
 IN_PROGRESS = 'IN_PROGRESS',
 DONE = 'DONE',
}

export interface SaveResponse {
  id: string;
  status: string;
  done_at: string;
}