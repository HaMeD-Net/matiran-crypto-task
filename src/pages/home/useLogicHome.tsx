import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material";
import { useCryptoStore } from "@store/useCryptoStore";
import { apiRequest } from "@api/apiService";
import { CoinMarketData, PriceResponse } from "./types";

const useLogicHome = () => {
  const navigate = useNavigate();
  const { setSelectedCoinStore, alert, setAlert } = useCryptoStore();
  const [selectedCoin, setSelectedCoin] = useState<{
    label: string;
    value: string;
  }>();
  const [price, setPrice] = useState<{
    loading: boolean;
    price: { usd: string; eur: string; jpy: string; gbp: string } | null;
  }>({
    loading: false,
    price: null,
  });
  const [coinList, setCoinList] = useState<{ label: string; value: string }[]>(
    []
  );

  const fetchCoinPrice = async (symbol: string): Promise<PriceResponse> => {
    return await apiRequest<PriceResponse>({
      method: "get",
      url: "simple/price",
      params: {
        ids: symbol.toLowerCase(),
        vs_currencies: "usd,eur,jpy,gbp",
      },
    });
  };

  const fetchTopCoins = async (
    page: number = 1,
    perPage: number = 10,
    currency: string = "usd"
  ): Promise<CoinMarketData[]> => {
    return await apiRequest<CoinMarketData[]>({
      method: "get",
      url: "coins/markets",
      params: {
        vs_currency: currency,
        order: "market_cap_desc",
        per_page: perPage,
        page,
        sparkline: false,
        price_change_percentage: "24h",
      },
    });
  };
  const loadCoins = async () => {
    try {
      const coins = await fetchTopCoins(1, 20, "usd");
      console.log("Top Coins:", coins);
      const newCoins = coins.map(({ id, symbol }) => ({
        label: id,
        value: symbol,
      }));
      setCoinList(newCoins);
    } catch (err) {
      console.error("خطا در دریافت کوین‌ها:", err);
      setPrice({
        loading: false,
        price: null,
      });
      setAlert({
        ...alert,
        open: true,
      });
    }
  };

  const handleCoinSelect = (event: SelectChangeEvent) => {
    const symbol = event.target.value;
    const coinData = coinList.filter((item) => item.value === symbol);
    setSelectedCoin(coinData[0]);
    setSelectedCoinStore(coinData[0]);
  };
  const loadPrice = async (symbol: string) => {
    const coinId = symbol.toLowerCase();
    setPrice({
      loading: true,
      price: null,
    });

    try {
      const data = await fetchCoinPrice(coinId);
      setPrice({
        loading: false,
        price: data[coinId],
      });
    } catch (error) {
      setPrice({
        loading: false,
        price: null,
      });
      setAlert({
        ...alert,
        open: true,
      });
    }
  };

  useEffect(() => {
    let interval: any;
    if (selectedCoin) {
      loadPrice(selectedCoin.label);
      interval = setInterval(() => {
        loadPrice(selectedCoin.label);
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [selectedCoin]);

  useEffect(() => {
    loadCoins();
  }, []);
  return {
    navigate,
    selectedCoin,
    handleCoinSelect,
    price,
    coinList,
  };
};
export default useLogicHome;
