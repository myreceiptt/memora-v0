import { client } from "@/consts/client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { resolveName } from "thirdweb/extensions/ens";

export function useGetENSName({ address }: { address: string | undefined }) {
  return useQuery(
    queryOptions({
      queryKey: ["ensName", address || "0x0"] as const,
      queryFn: async () => {
        if (!client) {
          throw new Error("client is required");
        }
        if (!address) return;
        return resolveName({ client, address });
      },
      enabled: !!address,
    })
  );
}
