import CoinDropdown from "@components/coinDropdown";
import useLogicHome from "./useLogicHome";
import { Button } from "@mui/material";

export default function Home() {
  const { handleCoinSelect, navigate, price, coinList, selectedCoin } =
    useLogicHome();
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 flex-col">
        <CoinDropdown
          coinList={coinList}
          handleCoinSelect={handleCoinSelect}
          selectedCoin={selectedCoin}
        />
        <div className="rounded-xl bg-white p-6 shadow-md space-y-6">
          <h1 className="text-2xl font-bold text-center">قیمت ارز دیجیتال</h1>

          <div className="text-center">
            {price.price !== null ? (
              <div className="grid grid-cols-2 gap-4 text-md">
                <p>
                  💵 USD:
                  <span className="text-green-600">${price?.price.usd}</span>
                </p>
                <p>
                  💶 EUR:
                  <span className="text-green-600">€{price?.price.eur}</span>
                </p>
                <p>
                  💴 JPY:
                  <span className="text-green-600">¥{price?.price.jpy}</span>
                </p>
                <p>
                  💷 GBP:
                  <span className="text-green-600">£{price?.price.gbp}</span>
                </p>
              </div>
            ) : price.loading ? (
              <p className="text-red-600"> ... در حال دریافت قیمت</p>
            ) : (
              <></>
            )}
          </div>

          <div className="text-center">
            <Button
              onClick={() => navigate("/dashboard")}
              variant="contained"
              color="success"
              className="w-full rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 transition"
              disabled={!price.price}
            >
              ورود به داشبورد
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
