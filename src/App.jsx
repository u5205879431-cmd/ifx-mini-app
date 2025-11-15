import { useState } from 'react'
import { useWorldID } from '@worldcoin/id/react'
import { ethers } from 'ethers'

const IFX = "0xebe8eA000BC7b51b05070003B07c0fEeB855A140"

export default function App() {
  const { isReady, isAuthenticated, open } = useWorldID()
  const [addr, setAddr] = useState('')

  const connect = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const address = await signer.getAddress()
      setAddr(address.slice(0,6) + "..." + address.slice(-4))
    }
  }

  return (
    <div style={{background:'#000', color:'#0ff', minHeight:'100vh', padding:'20px', textAlign:'center'}}>
      <h1 style={{fontSize:'60px', margin:'20px 0 0'}}>∞ IFX</h1>
      <p style={{fontSize:'20px', color:'#0af'}}>InfinichainX • Worldchain</p>

      {!isAuthenticated ? (
        <button onClick={open} style={{marginTop:'100px', background:'#0ff', color:'#000', fontWeight:'bold', padding:'18px 40px', fontSize:'22px', border:'none', borderRadius:'16px'}}>
          LOGIN CON WORLD ID
        </button>
      ) : (
        <>
          <p style={{color:'#0f0', fontSize:'18px'}}>✓ Verificado (solo humanos)</p>
          <button onClick={connect} style={{background:'transparent', border:'2px solid #0ff', color:'#0ff', padding:'12px 24px', borderRadius:'12px'}}>
            {addr || "CONECTAR WALLET"}
          </button>

          <div style={{marginTop:'50px', display:'grid', gap:'20px', maxWidth:'400px', margin:'50px auto'}}>
            <a href={`https://uno.world/swap?output=${IFX}`} style={{background:'#111', padding:'25px', borderRadius:'16px', fontSize:'20px', textDecoration:'none', color:'#0ff', border:'1px solid #0ff'}}>
              SWAP IFX
            </a>
            <a href="https://puf.world" style={{background:'#111', padding:'25px', borderRadius:'16px', fontSize:'20px', textDecoration:'none', color:'#0ff', border:'1px solid #0ff'}}>
              LANZAR TOKEN (fee en IFX pronto)
            </a>
            <div style={{background:'#111', padding:'25px', borderRadius:'16px', border:'1px solid #0ff'}}>
              <p style={{margin:0, fontSize:'18px'}}>Staking IFX + Revenue Share</p>
              <small>70% fees → holders IFX</small>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
