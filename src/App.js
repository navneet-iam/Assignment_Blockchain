import './App.css';
import React, {useState, useEffect, text } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

function App() {
  const [address,setAddress] = useState("");
  const [prov, setprovider] = useState("");
  const [val, setVal] = useState("");
  const [strg, setstring] = useState("");
  const [contra, setContract] = useState("");
  const [temp, settemp] = useState("");
  const [currown, setCurrOwn] = useState("0x684A80F3C892bCEb737E62727A6Db81Ae8Bc6749");
  
  async function owner(){
    const contractAddress = "0x58B56dd3D7381aB1e29d1D7DE76073F1bD3162e1";
    const contractAbi = 
      [
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "s",
              "type": "string"
            }
          ],
          "name": "setName",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "str",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
        const Contract = new ethers.Contract(contractAddress, contractAbi, prov);
        setContract(Contract);
        const data = await Contract.str();
        console.log(data);
        setVal(data);
  }
  return (
    <div className="App">
      <h1>arufa's assignment</h1>
      <h3>Connect your wallet</h3>
      <button onClick={async () =>{
        if(window.ethereum){
          // const b = await window.ethereum.enable();
          const web3Modal = new Web3Modal();
          const connection = await web3Modal.connect();
          const provider = new ethers.providers.Web3Provider(connection);
          const Signer = provider.getSigner();
          setprovider(Signer);
          const a = await Signer.getAddress();
          const sign = await Signer.signMessage("Hello World");
          // console.log(provider);
          // console.log(Signer);
          // console.log(a);
          setAddress(a);
        }
        else{
          alert("add metamask extension to your browser");
        }
      }}>Connect</button>
      {address === "" ? " ": <h2>Account: {address}</h2>}
      {val === "" ? " ": <h2>Owner's string: {val}</h2>}

      <button onClick={()=>{owner()}}>display string</button>
      <h4>change the string?</h4>
      <input type="text" placeholder="enter the string" onChange={(e)=>{
          const temp = e.target.value;
          setstring(temp);
      }}/>
      <button onClick={() =>{
        if(currown === address){
          const t = contra.setName(strg);
        }
        else{
          alert("only owner can change the string");
        }
      }}>set string</button>
      <br />
      <br />
      <h4>Transfer ownership?</h4>
      <h5>current owner: {currown}</h5>
      <br/>
      <span>enter address of other account  </span>
      <input type="text" placeholder="enter address" onChange={(e)=>{
          const tp = e.target.value;
          settemp(tp);
      }}/>
      <button onClick={() =>{
          if(currown === address){
            setCurrOwn(temp);
        }
        else{
          alert("only owner can transfer the ownership");
        }
      }}>Change owner</button>
    </div>  

  );
}

export default App;
