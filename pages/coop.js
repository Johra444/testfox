import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Header from "@/components/Header";
import { ApiPromise, WsProvider } from '@polkadot/api';
import React, { useEffect, useState } from "react";
import { useWallet } from "useink";
import { getBalances, getTokenIdsForBoth, PSP34_approve, PSP34_allowance, stake, unstake } from "../functions/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Coop() {
    const scrollSections = [0, 1, 2];
  const { account, connect, disconnect } = useWallet();
  const [balances, setBalances] = useState([0, 0, 0]);
  const [IDs, setIDs] = useState([]);
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFoxApproved, setIsFoxApproved] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [currentSection, setCurrentSection] = useState(scrollSections[0]);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);


  const handleScroll = () => {
    if (window.scrollY > 0) {
      const windowHeight = window.innerHeight;
      const scrollHeight = Math.max(
        1,
        document.documentElement.scrollHeight - windowHeight
      );

      const scrollPercentage = (window.scrollY / scrollHeight) * 100;

      const minScrollPos = 0;
      const newScrollPos = Math.max(minScrollPos, scrollHeight);

      setScrollPos(newScrollPos);

      let sectionIndex = Math.floor(scrollPercentage / 30);
      sectionIndex = Math.min(sectionIndex, scrollSections.length - 1);
      console.log('sectionIndex is ' + sectionIndex);
      setSectionIndex(sectionIndex);

      setCurrentSection(scrollSections[sectionIndex]);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPos]);

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  var api;
  var wsProvider;



  const handleApprove = async (animal) => {
    try {

      wsProvider = new WsProvider('wss://ws.test.azero.dev');
      api = await ApiPromise.create({ provider: wsProvider });
      await PSP34_approve(api, account, animal);
      const approvalStatus = await PSP34_allowance(api, account, animal);
      if (animal == "chickens") {
        setIsApproved(approvalStatus);
      }
      else {
        setIsFoxApproved(approvalStatus);
      }
    } catch (error) {
      toast.error("Approval failed: " + error.message);
    } 
  };

  const handleStake = async (animal) => {
    try {

      wsProvider = new WsProvider('wss://ws.test.azero.dev');
      api = await ApiPromise.create({ provider: wsProvider });
     
      const stakeStatus = await stake(api, account, animal);
     console.log(stakeStatus);
     let result = await getBalances(api, account);
     setBalances(result);
    } catch (error) {
      toast.error("Approval failed: " + error.message);
    } 
  };
  const handleUnstake = async (animal) => {
    try {

      wsProvider = new WsProvider('wss://ws.test.azero.dev');
      api = await ApiPromise.create({ provider: wsProvider });
     
      const stakeStatus = await unstake(api, account, animal);
     console.log(stakeStatus);
     let result = await getBalances(api, account);
     setBalances(result);
    } catch (error) {
      toast.error("Approval failed: " + error.message);
    } 
  };
  useEffect(() => {
    if (account) {
      setIsLoading(true);
      const call = async () => {
        wsProvider = new WsProvider('wss://ws.test.azero.dev');
        api = await ApiPromise.create({ provider: wsProvider });

        let result = await getBalances(api, account);
        let approvalStatus = await PSP34_allowance(api, account, 'chickens');
        setIsApproved(approvalStatus);
        setBalances(result);
        let foxApprovalStatus = await PSP34_allowance(api, account, 'foxes'); 

        setIsFoxApproved(foxApprovalStatus);

        setIsLoading(false);
      };
      call();
    }
  }, [account]);

const renderStakeButtons = (animalType) => {
  const isAnimalApproved = animalType === "chicken" ? isApproved : isFoxApproved;
  const approveFunction = animalType === "chicken" ? () => handleApprove('chickens') : () => handleApprove('foxes');
  const stakeFunction = animalType === "chicken" ? () => handleStake('chicken') : () => handleStake('fox');
  const unstakeFunction = animalType === "chicken" ? () => handleUnstake('chicken') : () => handleUnstake('fox');

  if (isLoading) {
    return <p className="text-center text-3xl text-white mt-3">Loading...</p>;
  }

  if (isAnimalApproved) {
    return (
      <>
        <button onClick={stakeFunction} className="relative mx-auto mt-8 border-2 border-black bg-white rounded-full text-2xl lg:text-4xl text-black px-4 flex items-center">
          <span className="relative font-VT323">{`Stake ${animalType === "chicken" ? "a Chicken" : "a Fox"}`}</span>
        </button>
        <button onClick={unstakeFunction} className="relative mx-auto mt-4 border-2 border-black bg-white rounded-full text-2xl lg:text-4xl text-black px-4 flex items-center">
          <span className="relative font-VT323">{`Unstake ${animalType === "chicken" ? "Chickens" : "Foxes"}`}</span>
        </button>
      </>
    );
  } else {
    return (
      <button onClick={approveFunction} className="relative mx-auto mt-8 border-2 border-black bg-white rounded-lg text-2xl lg:text-4xl text-black px-8 flex items-center">
        <span className="relative font-VT323">Approve</span>
      </button>
    );
  }
};

  
  

  return (
    <>
      <Head>
        <title>Crypto</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-[200vh] absolute font-VT323">
        <div className={styles.pageBackground2}></div>
        <div className="w-full  h-[100dvh] sm:h-[100vh] fixed bottom-[0%] z-50">
        <h1 className="pt-20 font-VT323 text-white text-3xl lg:text-5xl text-center">
        Your $EGGS balance: <br />{balances[2].toLocaleString()} $EGGS
          </h1>
          <Header />
            {/* BUBBLE */}
          <div
            className={` w-full transition-opacity duration-1000 ${
              sectionIndex === 0 ? "opacity-100" : "opacity-0"
            }`}
          >
            <div class="flex items-center justify-start absolute lg:left-1/2 left-[20%] top-48">
              <div
                className={`lg:text-lg xl:text-3xl max-w-[650px] px-12 py-6
                 text-center rounded-full ${styles.bubble} ${styles["bubble-bottom-left"]}`}
              >
                <div className="flex">Here you can stake your NFTs to earn
$EGGS rewards !
$EGGS can be used to mint more NFTs
and increase your chances of getting a
fox ! They can also be sold for profit. </div>
                
             

                
              </div>
            </div>
            <div className="absolute bottom-20 lg:right-1/2">
              <Image
                src="/farmer2.png"
                width={150}
                height={600}
                alt="logo"
                className="mx-4"
              />
            </div>
        </div>
         {/* CHICKEN */}
        <div className={`absolute w-full h-full flex items-center pt-12 flex-col	transition-opacity duration-1000 ${
              sectionIndex === 1 ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex mx-6">
                <Image src="/chicken.png" width={350} height={600} alt="logo" />
            </div>
            {!account ? <p className="text-white text-3xl pt-4">First, connect your wallet</p> :   renderStakeButtons("chicken")}
            <button className="relative mx-auto mt-8 border-2 border-black bg-white rounded-lg text-2xl lg:text-4xl text-black px-8 flex items-center">
           <span className="relative font-VT323">You own {balances[0]} {(balances[0] === 1) ? "chicken" : "chickens"}.</span>
           </button>
          </div>
           {/* FOX */}
           <div className={`absolute  w-full h-full flex items-center pt-12 flex-col	transition-opacity duration-1000 ${
              sectionIndex === 2 ? "opacity-100" : "opacity-0"
            }`}
          >
              <div className="flex mx-6">
                <Image src="/fox.png" width={350} height={600} alt="logo" />
            </div>
            {!account ? <p className="text-white text-3xl pt-4">First, connect your wallet</p> :   renderStakeButtons("fox")}
            <button className="relative mx-auto mt-8 border-2 border-black bg-white rounded-lg text-2xl lg:text-4xl text-black px-8 flex items-center">
           <span className="relative font-VT323">You own {balances[1]} {(balances[1] === 1) ? "fox" : "foxes"}.</span>
           </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
