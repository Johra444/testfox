import '@/styles/globals.css'
import { UseInkProvider } from 'useink';
import { RococoContractsTestnet, ShibuyaTestnet } from 'useink/chains'


export default function App({ Component, pageProps }) {
  return (
    <UseInkProvider 
      config={{ 
        dappName: 'Flipper', 
        chains: [RococoContractsTestnet, ShibuyaTestnet] ,
      }}
    >
     <Component {...pageProps} />
    </UseInkProvider>
  );
}

