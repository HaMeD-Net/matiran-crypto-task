import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useLogicDashboard } from "./useLogicDashboard";
import { Button, Stack, Typography } from "@mui/material";

export default function Dashboard() {
  const {
    selectedCoinStore,
    chartData,
    timeFrame,
    setTimeFrame,
    setStartOffset,
    canNavigate,
    chartType,
    setChartType,
  } = useLogicDashboard();

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col align-middle w-screen">
      <Typography variant="h5" gutterBottom color="#000" marginTop={2}>
        {selectedCoinStore?.label} نمودار
      </Typography>

      <Stack
        spacing={2}
        direction="row"
        justifyContent={"center"}
        sx={{ mb: 2 }}
      >
        <Button
          variant={timeFrame === "1" ? "contained" : "outlined"}
          onClick={() => setTimeFrame("1")}
        >
          روزانه
        </Button>
        <Button
          variant={timeFrame === "7" ? "contained" : "outlined"}
          onClick={() => setTimeFrame("7")}
        >
          هفتگی
        </Button>
        <Button
          variant={timeFrame === "30" ? "contained" : "outlined"}
          onClick={() => setTimeFrame("30")}
        >
          ماهانه
        </Button>
      </Stack>

      <Stack direction="row" justifyContent="center" spacing={2} sx={{ mb: 2 }}>
        <Button
          variant={chartType === "line" ? "contained" : "outlined"}
          onClick={() => setChartType("line")}
        >
          Line Chart
        </Button>
        <Button
          variant={chartType === "bar" ? "contained" : "outlined"}
          onClick={() => setChartType("bar")}
        >
          Bar Chart
        </Button>
      </Stack>

      <ResponsiveContainer width="100%" height={400}>
        {chartType === "line" ? (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#4caf50"
              strokeWidth={3}
            />
          </LineChart>
        ) : (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Bar dataKey="price" fill="darkred" barSize={6} />
          </BarChart>
        )}
      </ResponsiveContainer>
      <Stack
        direction="row"
        justifyContent={"center"}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={() => setStartOffset((s) => s + 1)}
          disabled={!canNavigate}
        >
          بازه قبلی
        </Button>
        <Button
          variant="contained"
          color="success"
          disabled={!canNavigate}
          onClick={() => setStartOffset((s) => Math.max(0, s - 1))}
        >
          بازه بعدی
        </Button>
      </Stack>
    </div>
  );
}
