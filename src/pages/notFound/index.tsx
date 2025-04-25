// pages/NotFound.tsx
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Typography variant="h2" color="error" gutterBottom>
        ۴۰۴
      </Typography>
      <Typography variant="h5" gutterBottom>
        صفحه‌ای که دنبال آن هستید پیدا نشد!
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        بازگشت به صفحه اصلی
      </Button>
    </div>
  );
}
