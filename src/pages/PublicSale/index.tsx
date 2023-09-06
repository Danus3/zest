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

const PublicSale = () => {
  const { isConnected, address } = useAccount();

  const [mintValue, setMintValue] = useState(0n);

  const { data: saleData } = useContractReads({
    contracts: [
      {
        address: CONTRACT_ADDRESSES.tokenSale,
        abi: publicSaleABI,
        functionName: "saleTimeData"
      },
      {
        address: CONTRACT_ADDRESSES.tokenSale,
        abi: publicSaleABI,
        functionName: "whitelistSaleCap"
      }
    ]
  });

  const saleDataFormatted = useMemo(() => {
    if (!saleData) return null;
    return {
      saleCap: saleData[1].result as bigint,
      saleWhitelist: (saleData as any)[0].result[0] as bigint,
      salePublic: (saleData as any)[0].result[1] as bigint,
      saleDuration: (saleData as any)[0].result[2] as bigint
    };
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

  return (
    <div className={"page-content flex flex-col gap-4"}>
      <h1>Token Sale - Round 1</h1>
      <div className={"card grow"}>
        <div
          className={
            "grid md:grid-cols-2 md:grid-rows-2 grid-cols-1 grid-rows-4 gap-x-8 gap-y-4"
          }
        >
          <div className={"flexRow justify-between items-center"}>
            <p>Sale Cap</p>
            <h3>30ETH</h3>
          </div>
          <div className={"flexRow justify-between items-center"}>
            <p>Private Sale</p>
            <p>
              {saleDataFormatted
                ? prettyDate(Number(saleDataFormatted.saleWhitelist) * 1000)
                : "Loading..."}
            </p>
          </div>
          <div className={"flexRow justify-between items-center"}>
            <p>Public Sale</p>
            <p>
              {saleDataFormatted
                ? prettyDate(Number(saleDataFormatted.salePublic) * 1000)
                : "Loading..."}
            </p>
          </div>
          <div className={"flexRow justify-between items-center"}>
            <p>End of Sale</p>
            <p>
              {" "}
              {saleDataFormatted
                ? prettyDate(
                    Number(
                      saleDataFormatted.salePublic +
                        saleDataFormatted.saleDuration
                    ) * 1000
                  )
                : "Loading..."}
            </p>
          </div>
        </div>
      </div>
      <div className={"grow"}>
        <DepositETHorStETHInput value={mintValue} setValue={setMintValue} />
        <WrappedButton
          onClick={write}
          isLoading={isLoadingWrite || isLoading}
          className={"mt-4 w-full"}
          disabled={!writeEnabled || !write}
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
