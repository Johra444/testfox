import React, { useEffect, useState } from "react";
import { useWallet, useAllWallets } from "useink";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { formatWallet, getBalances } from "../functions/index";
import Image from "next/image";
import Link from "next/link";

export const ConnectWallet = ({ children }) => {
  const { account, connect, disconnect } = useWallet();
  const wallets = useAllWallets();
  const [shouldRender, setShouldRender] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [api, setApi] = useState();

  var wsProvider;

  useEffect(() => {
    let connect = async () => {
      let wsProvider = new WsProvider("wss://ws.test.azero.dev");
      let _api = await ApiPromise.create({ provider: wsProvider });
      setApi(_api);
    };
    connect();
    const shouldRenderConnectWallet = true;
    setShouldRender(shouldRenderConnectWallet);
  }, []);

  const handleWalletConnect = (wallet) => {
    connect(wallet.extensionName);
    setIsModalOpen(false); // Close the modal after connecting
  };

  if (!shouldRender) return null;

  if (!account) {
    return (
      <>
        <button
          className="border-2 border-white rounded-full font-VT323 lg:text-2xl text-white px-4 py-1"
          onClick={() => setIsModalOpen(true)}
        >
          Connect Wallet
        </button>

        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full"
            id="my-modal"
          >
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white bg-opacity-70">
              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-medium text-black">
                  Select a Wallet
                </h3>
                <div className="mt-2 px-7 py-3">
                  <ul className="flex flex-col">
                    {wallets.map((wallet, index) => (
                      <li key={wallet.title} className="my-2">
                        {wallet.installed ? (
                          <button
                            className="border-2 border-gray-300 rounded-md font-medium text-black px-4 py-2 w-full"
                            onClick={() => handleWalletConnect(wallet)}
                          >
                            Connect {wallet.title}
                          </button>
                        ) : (
                          <a
                            href={wallet.installUrl}
                            target="_blank"
                            className="border-2 border-gray-300 rounded-md block font-medium text-black px-4 py-2 w-full"
                          >
                            Install {wallet.title}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="items-center px-4 py-3">
                  <button
                    id="ok-btn"
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <button
        className="border-2 border-white rounded-full tracking-widest font-VT323 lg:text-2xl text-white px-4 py-1"
        onClick={disconnect}
      >
        {formatWallet(account.address)}
      </button>
    </>
  );
};

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.height = "100vh";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.height = "unset";
      document.body.style.overflow = "auto";
    }
  }, [isNavOpen]);

  function handleNavClick() {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <header className="flex z-50 w-full h-20 absolute top-0 bg-transparent font-VT323">
      {/* ... Mobile menu code starts ... */}
      <section className="MOBILE-MENU flex lg:hidden overflow-y-hidden white text-white mt- mx-2">
        <div className="mt-4">
          <ConnectWallet />
        </div>
        <div
          className="HAMBURGER-ICON cursor-pointer space-y-2 mr-4 mt-4 absolute right-0"
          onClick={() => handleNavClick()}
        >
          <span className="block h-1 w-8  bg-white rounded-md"></span>
          <span className="block h-1 w-8  bg-white rounded-md"></span>
          <span className="block h-1  w-8  bg-white rounded-md"></span>
        </div>

        <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
          <div
            className="absolute top-0 right-0 px-8 py-8"
            onClick={() => handleNavClick()}
          >
            <svg
              className="h-8 w-8  cursor-pointer"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <ul className="flex flex-col items-center justify-between min-h-[250px] text-5xl font-bold drop-shadow-xl">
            <li className="my-8  hover:underline">
              <Link href="/mint">MINT</Link>
            </li>
            <li className="my-8 hover:underline">
              <Link href="/coop">COOP</Link>
            </li>

            <li className=" my-8 flex">
              <a href="" target="blank" rel="noreferrer" className="px-4 mt-2">
                <Image src="/twitter.png" width={35} alt="twitter" height={35} />
              </a>

              <a href="" target="blank" rel="noreferrer" className="px-4	">
                <Image src="/discord.png" width={50} alt="discord" height={50} />
              </a>
            </li>
          </ul>
        </div>
      </section>
      {/* ... Mobile menu code ends ... */}

      {/* ... Existing desktop header code ... */}

      <div className=" w-full justify-between items-end mx-8 pt-8 relative hidden lg:flex">
        <div className="flex">
          <Link href="/coop">
            <button className="mt-1 mx-auto h-11  bg-white rounded-full text-2xl text-black px-6 flex items-center">
              <span className=" ">Bring me to the coop !</span>
            </button>
          </Link>

          <a href="" target="blank" rel="noreferrer" className="px-4 mt-2">
            <Image src="/twitter.png" alt="twitter" width={35} height={35} />
          </a>

          <a href="" target="blank" rel="noreferrer" className="fill-white	">
            <Image src="/discord.png" alt="discord" width={50} height={50} />
          </a>
        </div>

        <ConnectWallet />
      </div>

      <style jsx>{`
        .hideMenuNav {
          display: none;
        }
        .showMenuNav {
          display: block;
          position: absolute;
          width: 100%;
          height: 100vh;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.85);
          z-index: 50;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </header>
  );
}
