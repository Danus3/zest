import { useAccount, useContractReads } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useWrappedWriteContract from "@hooks/useWrappedWriteContract.ts";
import { CONTRACT_ADDRESSES } from "@src/constants.ts";
import publicSaleABI from "@utils/ABIs/publicSaleABI.ts";
import DepositETHorStETHInput from "@components/DepositETHorStETHInput.tsx";
import { useMemo, useState } from "react";
import WrappedButton from "@components/WrappedButton.tsx";
import { prettyDate } from "@utils/time.ts";
import { formatEtherToFixed, formatEtherToNumber } from "@utils/number.tsx";

const PublicSale = () => {
  const { isConnected, address } = useAccount();

  const [mintValue, setMintValue] = useState(0n);

  const { data: saleData } = useContractReads({
    contracts: [
      // {
      //   address: CONTRACT_ADDRESSES.tokenSale,
      //   abi: publicSaleABI,
      //   functionName: "saleTimeData"
      // },
      {
        address: CONTRACT_ADDRESSES.tokenSale,
        abi: publicSaleABI,
        functionName: "saleTimeData"
      },
      {
        address: CONTRACT_ADDRESSES.tokenSale,
        abi: publicSaleABI,
        functionName: "cap"
      },
      {
        address: CONTRACT_ADDRESSES.tokenSale,
        abi: publicSaleABI,
        functionName: "getPrice"
      },
      {
        address: CONTRACT_ADDRESSES.tokenSale,
        abi: publicSaleABI,
        functionName: "totalSold"
      }
    ].concat(
      address
        ? [
            {
              address: CONTRACT_ADDRESSES.tokenSale,
              abi: publicSaleABI,
              functionName: "shares",
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              args: [address]
            }
          ]
        : []
    )
  });

  const saleDataFormatted = useMemo(() => {
    console.log(saleData);
    if (!saleData) return null;
    if (saleData.some(d => d.status === "failure")) return null;
    return {
      saleWhitelist: new Date(
        Number((saleData as any)[0].result[0] as bigint) * 1000
      ),
      salePublic: new Date(
        Number((saleData as any)[0].result[1] as bigint) * 1000
      ),
      saleDuration: Number((saleData as any)[0].result[2] as bigint),
      cap: (saleData as any)[1]["result"] as bigint,
      tokenPrice: (saleData as any)[2]["result"] as bigint,
      totalSold: (saleData as any)[3]["result"] as bigint,
      shares: (saleData as any)[4] ? (saleData as any)[4]["result"] : null
    } as const;
  }, [saleData]);

  const isPublicSalePhrase = saleDataFormatted
    ? new Date().getTime() > Number(saleDataFormatted.salePublic) * 1000
    : false;

  const { data: sign } = useQuery({
    queryKey: ["public-sale", "sign", address],
    queryFn: async () => {
      return axios
        .get("https://adscendo.pro/whitelist/", {
          params: {
            msg_sender: address
          }
        })
        .then(response => {
          return response.data;
        });
    },
    enabled: isConnected && !isPublicSalePhrase,
    refetchOnWindowFocus: false,
    cacheTime: Infinity
  });

  const writeEnabled =
    (isPublicSalePhrase ? true : !!sign) && isConnected && mintValue > 0n;

  const { write, isLoading, isLoadingWrite } = useWrappedWriteContract({
    address: CONTRACT_ADDRESSES.tokenSale,
    abi: publicSaleABI,
    functionName: "buy",
    enabled: writeEnabled,
    value: mintValue,
    args: [
      "0x0000000000000000000000000000000000000000",
      mintValue,
      0,
      isPublicSalePhrase ? "" : sign
    ]
  });

  if (!saleDataFormatted) {
    return (
      <div className={"page-content flex flex-col gap-4"}>
        <h1>Loading...</h1>
      </div>
    );
  }

  const saleEnd = new Date(
    saleDataFormatted.salePublic.getTime() + saleDataFormatted.saleDuration
  );

  const inSale =
    new Date().getTime() >= saleDataFormatted.saleWhitelist.getTime() &&
    new Date().getTime() <= saleEnd.getTime();

  const inWaiting =
    new Date().getTime() < saleDataFormatted.saleWhitelist.getTime();

  return (
    <div className={"page-content flex flex-col gap-4"}>
      <h1>Token Offering - Round 1</h1>
      <div className={"card grow"}>
        <div className={"flex flex-col gap-6"}>
          <div className={"flexRow justify-between items-center"}>
            <p>Sale Cap</p>
            <h3>
              {(
                formatEtherToNumber(saleDataFormatted.totalSold) *
                formatEtherToNumber(saleDataFormatted.tokenPrice)
              ).toFixed(4)}
              /
              {(
                formatEtherToNumber(saleDataFormatted.cap) *
                formatEtherToNumber(saleDataFormatted.tokenPrice)
              ).toFixed(0)}
              &nbsp; ETH
            </h3>
          </div>
          <div className={"flexRow justify-between items-center"}>
            <p>Price</p>
            <h3>
              {formatEtherToNumber(saleDataFormatted.tokenPrice)}
              ETH per ADO
            </h3>
          </div>
          <div className={"flexRow justify-between items-center"}>
            <p className={"whitespace-nowrap"}>Start Sale</p>
            <h3>{prettyDate(saleDataFormatted.saleWhitelist)}</h3>
          </div>
          <div className={"flexRow justify-between items-center"}>
            <p>Round Status</p>
            <h3
              className={
                inWaiting
                  ? "text-yellow-500"
                  : inSale
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {inWaiting ? "Not opened" : inSale ? "Open" : "Closed"}
            </h3>
          </div>
          {inSale && (
            <div className={"flexRow justify-between items-center"}>
              <p>Target</p>
              <h3>
                {new Date().getTime() < saleDataFormatted.salePublic.getTime()
                  ? "Whitelist"
                  : "Public"}
              </h3>
            </div>
          )}

          <div className={"flexRow justify-between items-center"}>
            <p>My Share</p>
            <h3>{formatEtherToFixed(saleDataFormatted.shares ?? 0n, 0)} ADO</h3>
          </div>
        </div>
      </div>
      <div className={"grow"}>
        <DepositETHorStETHInput value={mintValue} setValue={setMintValue} />
        <WrappedButton
          onClick={write}
          isLoading={isLoadingWrite || isLoading}
          className={"mt-4 w-full"}
          disabled={!writeEnabled || !write || !inSale}
        >
          {(isPublicSalePhrase
          ? true
          : sign)
            ? "Invest"
            : "You are not whitelisted"}
        </WrappedButton>
      </div>
    </div>
  );
};

export default PublicSale;
