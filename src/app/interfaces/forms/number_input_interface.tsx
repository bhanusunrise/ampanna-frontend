import { ChangeEvent } from "react";

export interface NumberInputInterface {
  label: string;
  placeholder?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}