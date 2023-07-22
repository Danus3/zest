import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
import Modal from "../../components/Modal.tsx";
import { useAtom } from "jotai";
import { connectWalletModalAtom } from "../../state";

const ConnectBtn = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const {
    connect,
    connectors,
    error,
    isLoading,
    pendingConnector
  } = useConnect();
  const { disconnect } = useDisconnect();
  const btnClassName = "bg-amber-600 rounded-2xl";

  const [isModalOpen, setIsModalOpen] = useAtom(connectWalletModalAtom);

  if (isConnected && address) {
    const slicedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
    return (
      <div className={"flex whitespace-nowrap items-center gap-2"}>
        <div>{ensName ? `${ensName} (${slicedAddress})` : slicedAddress}</div>
        <button onClick={() => disconnect()} className={btnClassName}>
          Disconnect
        </button>
      </div>
    );
  }
  return (
    <>
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        className={btnClassName}
      >
        Connect Wallet
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        title={"Connect Wallet"}
      >
        <div className={"flex flex-col gap-4"}>
          {connectors.map(connector => (
            <button
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
              className={btnClassName}
            >
              {connector.name}
              {!connector.ready && " (unsupported)"}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                " (connecting)"}
            </button>
          ))}

          {error && <div>{error.message}</div>}
        </div>
      </Modal>
    </>
  );
};

export default ConnectBtn;
