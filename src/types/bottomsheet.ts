import { SheetPosition, SHEETS_NAME } from "@/constants/bottomsheet";

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  initialPosition?: SheetPosition;
  className?: string;
}

export interface DragEvent {
  point: { x: number; y: number };
  offset: { x: number; y: number };
  velocity: { x: number; y: number };
}

export type SHEETS_NAME_TYPE = keyof typeof SHEETS_NAME;
export interface BottomSheetObjectType {
  sheetName: SHEETS_NAME_TYPE;
  props: Record<string, any>;
  title: string;
  initialPosition?: string;
}
