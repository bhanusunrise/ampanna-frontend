import { NumberInputInterface } from '../forms/number_input_interface';
import { TextInputInterface } from '../forms/text_input_interface';

export interface UpdateModelProps {
  modelName: string;
  textInputs?: TextInputInterface[];
  numberInputs?: NumberInputInterface[];
  updateFunction: () => void;
  show: boolean;
  handleClose: () => void;
}