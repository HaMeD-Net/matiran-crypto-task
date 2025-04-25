import { JSX, Suspense } from "react";

export const withSuspense = (Component: JSX.Element) => (
  <Suspense fallback={<div>در حال بارگذاری...</div>}>{Component}</Suspense>
);
