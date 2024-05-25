export interface CouchDBResponse<T> {
    total_rows: number;
    offset: number;
    rows: Array<{ id: string; key: string; value: { rev: string }; doc: T }>;
  }