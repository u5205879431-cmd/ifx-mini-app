import { IDKitWidget } from 'https://esm.sh/@worldcoin/idkit@1.3.0'
import { ethers } from 'https://esm.sh/ethers@6.13.4'

const IFX = "0xebe8eA000BC7b51b05070003B07c0fEeB855A140"
const UNO = "https://uno.world/swap"

export default function App() {
  const [verified, setVerified] = React.useState(false)
  const [wallet, setWallet] = React.useState('')

  const connect = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const addr = await (await provider.getSigner()).getAddress()
      setWallet(addr.slice(0,6)+"..."+addr.slice(-4))
    }
  }

  return (
    <div style={{background:'#000',color:'#0ff',minHeight:'100vh',padding:'20px',textAlign:'center'}}>
      <h1 style={{fontSize:'70px',margin:'30px 0 0'}}>∞ IFX</h1>
      <p style={{fontSize:'22px',color:'#0af'}}>InfinichainX • Worldchain</p>

      {!verified ? (
        <div style={{marginTop:'120px'}}>
          <IDKitWidget app_id="app_staging_8b9e9f8e9f8e9f8e9f8e9f8e9f8e9f8e" action="login" onSuccess={()=>setVerified(true)}>
            {({open})=><button onClick={open} style={{background:'#0ff',color:'#000',padding:'20px 50px',fontSize:'24px',border:'none',borderRadius:'20px'}}>
              LOGIN CON WORLD ID
            </button>}
          </IDKitWidget>
        </div>
      ) : (
        <>
          <p style={{color:'#0f0',fontSize:'20px'}}>Verificado</p>
          <button onClick={connect} style={{background:'transparent',border:'3px solid #0ff',color:'#0ff',padding:'14px 30px',borderRadius:'12px'}}>
            {wallet || "CONECTAR"}
          </button>

          <div style={{marginTop:'60px',display:'grid',gap:'25px',maxWidth:'420px',margin:'0 auto'}}>
            <a href={`${UNO}?output=${IFX}`} style={{background:'linear-gradient(135deg,#0ff,#00f)',color:'#000',padding:'30px',borderRadius:'20px',fontSize:'24px',fontWeight:'bold',textDecoration:'none'}}>
              SWAP IFX
            </a>
            <div style={{background:'#111',padding:'30px',borderRadius:'20px',border:'2px solid #0ff'}}>
              <p style={{margin:0,fontSize:'20px'}}>Launchpad propio</p>
              <small>próximas 24h</small>
            </div>
            <div style={{background:'#111',padding:'30px',borderRadius:'20px',border:'2px solid #0ff'}}>
              <p style={{margin:0,fontSize:'20px'}}>Staking + Revenue</p>
              <small>70% fees → holders</small>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
