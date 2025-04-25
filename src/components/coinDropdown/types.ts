export type Coin = {
  label: string;
  value: string;
};

export interface Props {
  coinList: Coin[];
  selectedCoin: Coin;
  handleCoinSelect: () => void;
}
