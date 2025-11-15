import { useState } from 'react'
import { IDKitWidget } from '@worldcoin/idkit'
import { ethers } from 'ethers'

const IFX = "0xebe8eA000BC7b51b05070003B07c0fEeB855A140"
const UNO_SWAP = "https://uno.world/swap"

export default function App() {
  const [verified, setVerified] = useState(false)
  const [wallet, setWallet] = useState('')

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = await provider.getSigner()
      const addr = await signer.getAddress()
      setWallet(addr.slice(0, 6) + "..." + addr.slice(-4))
    }
  }

  const swapLink = `${UNO_SWAP}?output=${IFX}&input=0x0000000000000000000000000000000000000000`

  return (
    <div style={{background:'#000', color:'#0ff', minHeight:'100vh', padding:'20px', textAlign:'center'}}>
      <h1 style={{fontSize:'70px', margin:'30px 0 0', fontWeight:'bold'}}>∞ IFX</h1>
      <p style={{fontSize:'22px', color:'#0af', margin:'10px'}}>InfinichainX • Worldchain</p>

      {!verified ? (
        <div style={{marginTop:'120px'}}>
          <IDKitWidget
            app_id="app_staging_8b9e9f8e9f8e9f8e9f8e9f8e9f8e9f8e"
            action="ifx-login"
            onSuccess={() => setVerified(true)}
          >
            {({ open }) => (
              <button onClick={open} style={{
                background:'#0ff', color:'#000', fontWeight:'bold',
                padding:'20px 50px', fontSize:'24px', border:'none',
                borderRadius:'20px', cursor:'pointer'
              }}>
                LOGIN CON WORLD ID
              </button>
            )}
          </IDKitWidget>
        </div>
      ) : (
        <>
          <p style={{color:'#0f0', fontSize:'20px', margin:'20px'}}>Verificado con World ID</p>
          
          <button onClick={connectWallet} style={{
            background:'transparent', border:'3px solid #0ff', color:'#0ff',
            padding:'14px 30px', fontSize:'18px', borderRadius:'12px', margin:'10px'
          }}>
            {wallet || "CONECTAR WALLET"}
          </button>

          <div style={{marginTop:'60px', display:'grid', gap:'25px', maxWidth:'420px', margin:'0 auto'}}>
            <a href={swapLink} style={{
              background:'linear-gradient(135deg, #0ff, #00f)', color:'#000',
              padding:'30px', borderRadius:'20px', fontSize:'24px', fontWeight:'bold',
              textDecoration:'none', boxShadow:'0 0 20px #0ff'
            }}>
              SWAP IFX (UNO Router)
            </a>

            <div style={{background:'#111', padding:'30px', borderRadius:'20px', border:'2px solid #0ff'}}>
              <p style={{margin:'0', fontSize:'20px'}}>Launchpad propio</p>
              <small>Fee 1000 IFX → quemado (próximas 24h)</small>
            </div>

            <div style={{background:'#111', padding:'30px', borderRadius:'20px', border:'2px solid #0ff'}}>
              <p style={{margin:'0', fontSize:'20px'}}>Staking IFX</p>
              <small>70% fees → holders (próximas 24h)</small>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
