import { useEffect, useState, useRef } from "react";
import { providers, utils } from "ethers";
import dayjs from "dayjs";
const wsProvider = new providers.WebSocketProvider(
  process.env.REACT_APP_ETH_WS
);

export const useBlockNumber = () => {
  const [blockNumber, setBlockNumber] = useState([]);

  useEffect(() => {
    const ws = () => {
      wsProvider.on("block", (blockNumber) => {
        console.log(blockNumber);
        setBlockNumber(blockNumber);
      });
    };
    ws();
  }, []);
  useEthers(blockNumber);
};

export const useEthers = (blockNumber) => {
  const [blockData, setBlockData] = useState([]);
  const [error, isError] = useState(null);
  const isMounted = useRef();

  useEffect(() => {
    if (isMounted.current) return;
    const getData = async () => {
      isMounted.current = true;
      try {
        const block = await wsProvider.getBlock(blockNumber);
        const {
          number,
          timestamp: utc,
          transactions,
          gasUsed: gU,
          gasLimit: gL,
          baseFeePerGas: base,
          hash,
          nonce,
          parentHash,
          _difficulty: diff,
        } = block;

        setBlockData({
          Block: number,
          Timestamp: dayjs.unix(utc).format("YYYY-MM-DD HH:mm A"),
          Transactions: transactions,
          TxCount: transactions.length,
          Gas_Used: utils.commify(gU.toLocaleString("en-US")),
          Gas_Limit: utils.commify(gL.toLocaleString("en-US")),
          Base_Fee: utils.formatUnits(base, "gwei"),
          Difficulty: utils.commify(diff.toString()),
          nonce,
          hash,
          parentHash,
        });
        isError(null);
      } catch (err) {
        isError("Could not fetch");
        console.log(err.message);
      }
    };
    getData();
    return () => {
      isMounted.current = false;
      console.log("CLEANUP");
    };
  }, [blockNumber]);

  return { blockData, error };
};
