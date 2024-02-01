import {
  PriceServiceConnection,
  HexString,
} from "@pythnetwork/price-service-client";
import { useQuery } from "@tanstack/react-query";
import { Buffer } from "buffer";
import { useEffect, useState } from "react";

export class EvmPriceServiceConnection extends PriceServiceConnection {
  /**
   * Gets price update data which then can be submitted to Pyth contract to update the prices.
   * This will throw an axios error if there is a network problem or the price service returns a non-ok response (e.g: Invalid price ids)
   *
   * @param priceIds Array of hex-encoded price ids.
   * @returns Array of price update data.
   */
  async getPriceFeedsUpdateData(priceIds: HexString[]): Promise<string[]> {
    const latestVaas = await this.getLatestVaas(priceIds);
    return latestVaas.map(
      (vaa) => "0x" + Buffer.from(vaa, "base64").toString("hex")
    );
  }
}
const connection = new EvmPriceServiceConnection("https://hermes.pyth.network"); // See Hermes endpoints section below for other endpoints

const useGetPythUpdateData = (value: bigint) => {
  const state = useQuery(
    ["PythUpdateData", String(value)],
    async () => {
      const priceIds = [
        // You can find the ids of prices at https://pyth.network/developers/price-feed-ids#pyth-evm-stable
        "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace", // ETH/USD price id
      ];

      // In order to use Pyth prices in your protocol you need to submit the price update data to Pyth contract in your target
      // chain. `getPriceFeedsUpdateData` creates the update data which can be submitted to your contract. Then your contract should
      // call the Pyth Contract with this data.
      const priceUpdateData = await connection.getPriceFeedsUpdateData(
        priceIds
      );
      return priceUpdateData;
    },
    {
      staleTime: 1000 * 30,
    }
  );

  return state;
};

export default useGetPythUpdateData;
