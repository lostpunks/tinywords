import React, { useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import "./App.css";
import ConnectButton from "./components/ConnectWallet";
import DisconnectButton from "./components/DisconnectWallet";
import qrcode from "qrcode-generator";
import UpdateContract from "./components/UpdateContract";
import Transfers from "./components/Transfers";

enum BeaconConnection {
  NONE = "",
  LISTENING = "Listening to P2P channel",
  CONNECTED = "Channel connected",
  PERMISSION_REQUEST_SENT = "Permission request sent, waiting for response",
  PERMISSION_REQUEST_SUCCESS = "Wallet is connected"
}

const App = () => {
  const [Tezos, setTezos] = useState<TezosToolkit>(
    new TezosToolkit("https://mainnet.api.tez.ie")
  );
  const [contract, setContract] = useState<any>(undefined);
  const [publicToken, setPublicToken] = useState<string | null>("");
  const [wallet, setWallet] = useState<any>(null);
  const [userAddress, setUserAddress] = useState<string>("");
  const [userBalance, setUserBalance] = useState<number>(0);
  const [storage, setStorage] = useState<number>(0);
  const [copiedPublicToken, setCopiedPublicToken] = useState<boolean>(false);
  const [beaconConnection, setBeaconConnection] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("transfer");

  // Granadanet Increment/Decrement contract
  // const contractAddress: string = "KT1K3XVNzsmur7VRgY8CAHPUENaErzzEpe4e";
  // Hangzhounet Increment/Decrement contract
  const contractAddress: string = "KT1HMi71JTTfjiko8KnUL8RftewW6WGkAUqV";

  const generateQrCode = (): { __html: string } => {
    const qr = qrcode(0, "L");
    qr.addData(publicToken || "");
    qr.make();

    return { __html: qr.createImgTag(4) };
  };

  let mintCount;
  if (storage) {
    mintCount = <span className="minted"><strong>{storage}/100 minted</strong></span>;
  } else {
    mintCount = <span/>;
  }

  let buttons;
  if (userAddress) {
    buttons = (
    <div className="buttons">
      <UpdateContract
        contract={contract}
        setUserBalance={setUserBalance}
        Tezos={Tezos}
        userAddress={userAddress}
        setStorage={setStorage}
      />
      <DisconnectButton
        wallet={wallet}
        setPublicToken={setPublicToken}
        setUserAddress={setUserAddress}
        setUserBalance={setUserBalance}
        setWallet={setWallet}
        setTezos={setTezos}
        setBeaconConnection={setBeaconConnection}
      />
    </div>
    );
  } else {
    buttons = (
    <div className="buttons">
      <ConnectButton
        Tezos={Tezos}
        setContract={setContract}
        setPublicToken={setPublicToken}
        setWallet={setWallet}
        setUserAddress={setUserAddress}
        setUserBalance={setUserBalance}
        setStorage={setStorage}
        contractAddress={contractAddress}
        setBeaconConnection={setBeaconConnection}
        wallet={wallet}
      />
    </div>
    );
  }
  return (
    <div className="main-box">
      <div id="row">
        <div id="dialog">
          <div className="artist">
            <img src="avatar.png"></img>
            <a href="https://twitter.com/lostpunks"><strong>devnull</strong></a>
          </div>
          <div className="title">
            <h1>tiny words</h1>
          </div>
          <div id="content">
            {mintCount}
            {buttons}
            <p>
              <strong>Published on 10/04/2021 at 17:11</strong>
            </p>
            <p>
              Tiny words is a generative art project where 4-letter words are rendered in a colorful grid of 8x8 pixels.
              Each token is fully generated on-chain with a <a href="https://tzkt.io/KT1HMi71JTTfjiko8KnUL8RftewW6WGkAUqV/storage/">custom contract</a> and minted to <a href="https://www.8bidou.com/">8bidou</a> in a single transaction.
            </p>
            <p>
              Forever limited to 100 editions on the Tezos blockchain. London, April 2022.
            </p>
            <p>
              You can see all previously minted editions <a href="https://8x8.teztok.com/user/KT1HMi71JTTfjiko8KnUL8RftewW6WGkAUqV">here</a> (or <a href="https://8bidou.clxn.art/?address=KT1HMi71JTTfjiko8KnUL8RftewW6WGkAUqV&p=profile#page-top">here</a>).
            </p>
            <p>
              <strong>Editions:</strong> 100
              <br/>
              <strong>Price:</strong> 0 tez (gas & storage only)
              <br/>
              <strong>Royalties:</strong> 10%
            </p>
          </div>
          <div id="footer">
            Not affiliated with fxhash or 8bidou. Please mint at your own risk.
          </div>
        </div>
        <div id="image-box">
          <div id="image">
            <img src="sample.png"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
