import { useCryptoStore } from "@store/useCryptoStore";
import { useEffect, useState } from "react";
import { apiRequest } from "@api/apiService";
import { useNavigate } from "react-router-dom";

const CURRENCY = "usd";

const timeFrameToDaysMap = {
  "1": 30,
  "7": 84,
  "30": 360,
};

export const useLogicDashboard = () => {
  const navigate = useNavigate();
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  const { selectedCoinStore, setAlert } = useCryptoStore();
  const [chartData, setChartData] = useState<{ name: string; price: string }[]>(
    []
  );
  const [timeFrame, setTimeFrame] = useState<"1" | "7" | "30">("1");
  const [startOffset, setStartOffset] = useState(0);

  const aggregatePrices = (
    prices: [number, number][],
    timeFrame: "1" | "7" | "30"
  ) => {
    const grouped: Record<string, number[]> = {};
    const labelDates: Record<string, string> = {};

    prices.forEach(([timestamp, price]) => {
      const dateObj = new Date(timestamp);

      let key = "";
      let label = "";

      if (timeFrame === "1") {
        key = dateObj.toLocaleDateString("fa-IR");
        label = key;
      } else if (timeFrame === "7") {
        const weekStart = new Date(dateObj);
        const day = weekStart.getDay();
        weekStart.setDate(weekStart.getDate() - day);
        key = `${weekStart.getFullYear()}-${weekStart.getMonth()}-${weekStart.getDate()}`;
        label = weekStart.toLocaleDateString("fa-IR");
      } else if (timeFrame === "30") {
        const monthStart = new Date(
          dateObj.getFullYear(),
          dateObj.getMonth(),
          1
        );
        key = `${monthStart.getFullYear()}-${monthStart.getMonth()}`;
        label = monthStart.toLocaleDateString("fa-IR");
      }

      if (!grouped[key]) {
        grouped[key] = [];
        labelDates[key] = label;
      }

      grouped[key].push(price);
    });

    return Object.entries(grouped).map(([key, prices]) => {
      const avg = prices.reduce((sum, val) => sum + val, 0) / prices.length;
      return {
        name: labelDates[key],
        price: avg.toFixed(2),
      };
    });
  };
  const fetchData = async () => {
    if (!selectedCoinStore) return;

    const totalDays = timeFrameToDaysMap[timeFrame];
    const offsetInDays = startOffset * totalDays;

    const endDate = new Date();
    endDate.setDate(endDate.getDate() - offsetInDays);

    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - totalDays);

    const fromTimestamp = Math.floor(startDate.getTime() / 1000);
    const toTimestamp = Math.floor(endDate.getTime() / 1000);

    try {
      const response = await apiRequest<{ prices: [number, number][] }>({
        method: "get",
        url: `coins/${selectedCoinStore.label}/market_chart/range`,
        params: {
          vs_currency: CURRENCY,
          from: fromTimestamp,
          to: toTimestamp,
        },
      });

      const prices = response?.prices ?? [];
      const formatted = aggregatePrices(prices, timeFrame);

      setChartData(formatted);
    } catch (error) {
      console.error("خطا در دریافت داده‌های چارت:", error);
      setChartData([]);
      setAlert({
        open: true,
        message: "!خطا در دریافت داده‌های چارت",
      });
    }
  };
  useEffect(() => {
    if (!selectedCoinStore) navigate("/");
  }, [selectedCoinStore]);
  useEffect(() => {
    fetchData();
  }, [selectedCoinStore, timeFrame, startOffset]);

  return {
    selectedCoinStore,
    chartData,
    timeFrame,
    setTimeFrame: (frame: "1" | "7" | "30") => {
      setTimeFrame(frame);
      setStartOffset(0);
    },
    setStartOffset,
    canNavigate: chartData.length > 0,
    chartType,
    setChartType,
  };
};
