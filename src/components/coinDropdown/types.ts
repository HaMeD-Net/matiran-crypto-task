// import { SelectChangeEvent } from "@mui/material";

export type Coin =
  | {
      label: string;
      value: string;
    }
  | undefined;

export interface IProps {
  coinList: Coin[];
  selectedCoin: Coin;
  handleCoinSelect: (event: any) => void;
}
