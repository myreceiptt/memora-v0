// import MarketplaceProvider from "@/hooks/useMarketplaceContext";
import type { ReactNode } from "react";

export default async function CollectionLayout(props: {
  children: ReactNode;
  params: Promise<{ contractAddress: string; chainId: string }>;
}) {
  const params = await props.params;

  const { children } = props;

  return (
    // <MarketplaceProvider
    //   chainId={params.chainId}
    //   contractAddress={params.contractAddress}
    // >
    { children }
    // </MarketplaceProvider>
  );
}
