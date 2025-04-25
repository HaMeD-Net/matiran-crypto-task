import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IProps, Coin } from "./types";

export default function CoinDropdown({
  coinList,
  selectedCoin,
  handleCoinSelect,
}: IProps) {
  return (
    <Box sx={{ minWidth: 320 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select A Coin</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCoin?.value}
          label="Coin"
          onChange={handleCoinSelect}
        >
          {coinList.map((coin: Coin) => (
            <MenuItem value={coin?.value} title={coin?.label}>
              {coin?.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
