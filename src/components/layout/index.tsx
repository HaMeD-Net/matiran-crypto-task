import { Alert, Snackbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useCryptoStore } from "@store/useCryptoStore";

const MainLayout = () => {
  const { alert, setAlert } = useCryptoStore();

  return (
    <>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={() =>
          setAlert({
            ...alert,
            open: false,
          })
        }
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
      <div className="min-h-screen bg-gray-100 p-6 w-screen ">
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-md flex text-center justify-center">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
