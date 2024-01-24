import { useWallet, useAllWallets } from 'useink'

const WalletConnect = () => {
  const wallets = useAllWallets()
  const { isConnected, connect, disconnect, setAccount } = useWallet()

{ 
  if (!account) {
    return (
      <ul>
        {wallets.map((w) => (
          <li key={w.title}>
            {w.installed ? (
              <button onClick={() => connect(w.extensionName)}>
                <img src={w.logo.src} alt={w.logo.alt} />
                Connect to {w.title}
              </button>
            ) : (
              <a href={w.installUrl}>
                <img src={w.logo.src} alt={w.logo.alt} />
                Install {w.title}
              </a>
            )}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      <p>You are connected as {account?.name || account.address}</p>

      <button onClick={disconnect}>
        Disconnect Wallet
      </button>
    </>
  )
}
  
  /* }  if (isConnected) return <button onClick={disconnect}>Disconnect</button>

  return (
    <ul>
      {wallets.map(w => (
        <li key={w.title}>
          {w.installed ? (
            <button onClick={() => connect(w.extensionName)}>
              <img src={w.logo.src} alt={w.logo.alt} />
              Connect to {w.title}
            </button>
          ) : (
            <a href={w.installUrl}>
              <img src={w.logo.src} alt={w.logo.alt} />
              Install {w.title}
            </a>
          )}
        </li>
      ))}
    </ul>
  )
} */}
 }

export default WalletConnect;