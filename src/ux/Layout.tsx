import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import classNames from "classnames";
import { isApp, isLocalhost } from "@src/config";
import { useAtomValue } from "jotai/index";
import { transactionsToastAtom } from "@src/state/ui.ts";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { useChains } from "connectkit";

// import homepageBg from "@assets/homepage-bg.webp";

const defaultTxUrl = "https://etherscan.io";

const Layout = () => {
  const sentHashes = useAtomValue(transactionsToastAtom);

  let txUrl = defaultTxUrl;

  const [chain] = useChains();

  if (chain) {
    txUrl = chain?.blockExplorers?.default?.url || defaultTxUrl;
  }

  return (
    <div
      className={classNames("text-center text-white pb-16", {
        [isApp || isLocalhost ? "md:pt-32 pt-16" : "pt-0"]: true
      })}
      style={{
        background:
          isApp || isLocalhost
            ? "radial-gradient(50% 50% at 100% 0%, #111111 0%, black 100%)"
            : undefined
      }}
    >
      <NavBar />
      <Outlet></Outlet>

      {sentHashes.map(hash => {
        return (
          <ToastPrimitive.Root
            key={hash.hash + hash.status}
            className="bg-neutral-900 text-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
          >
            <ToastPrimitive.Description>
              {hash.status === "init"
                ? "Transaction sent!"
                : "Transaction completed!"}{" "}
              <br />
              <a
                className={"underline"}
                href={`${txUrl}/tx/${hash}`}
                target={"_blank"}
              >
                View on Chain Explorer{" "}
                <ExternalLinkIcon className={"inline-block"} />
              </a>
            </ToastPrimitive.Description>
            <ToastPrimitive.Close className={"emphasis"}>
              Dismiss
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        );
      })}
    </div>
  );
};

export default Layout;
