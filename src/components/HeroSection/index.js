import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import contract from "../../contracts/0xInvisibleFriends.json";
import bg from "../../images/left.png";
import bg2 from "../../images/right.png";

import {
  HeroContainer,
  HeroBg,
  ImageBg,
  HeroContent,
  MiniAbout,
  MintInput,
  Price,
  Minted,
  Button,
  MyNFT,
  First,
  Then,
  Plus,
  Input,
  Minus,
  NewDiv,
  Spacer,
  PriceText,
  MintCText,
  PriceText2,
  MintCText2,
  ImageBg2,
  MintDiv,
} from "./HeroElements";

const contractAddress = "0xd809775d11ae44d5b7d0301e99b3b1a5199ac4fa";
const abi = contract.abi;

const HeroSection = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [amount, setAmount] = useState(1);
  const [supply, setSupply] = useState("0");
  const [feedback, setFeedback] = useState("Mint");
  const [walletBalance, setWalletBalance] = useState("0");

  const connect = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Metamask is isntalled! We're ready to go!");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("no authorized accounts");
    }
  };

  const mintNft = async (_amount) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);
        const supply = await nftContract.totalSupply();
        const num = Number(supply);
        const ethAmount = (0.0069 * _amount).toString();
        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (num >= 999) {
          setFeedback("starting payment...");
          let mintNft = await nftContract.mint(accounts[0], _amount, {
            value: ethers.utils.parseEther(ethAmount),
          });

          setFeedback("Minting your NFT...");
          await mintNft.wait();

          setFeedback("Finished! NFTs will be revealed soon!");
        } else {
          setFeedback("starting free mint...");
          let mintNft = await nftContract.mint(accounts[0], _amount, {
            value: ethers.utils.parseEther("0.00"),
          });

          setFeedback("Minting your NFT...");
          await mintNft.wait();

          setFeedback("Finished! NFTs will be revealed soon!");
        }
      } else {
        console.log("Ethereum object does not exist!");
      }
    } catch (err) {
      setFeedback("Not enough ETH! please adjust your amount and try agian.");
    }
  };

  const supplyLeft = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const nftContract = new ethers.Contract(contractAddress, abi, provider);
        const bigNumber = await nftContract.totalSupply();

        setSupply(bigNumber.toString());
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (err) {
      return;
    }
  };

  const balance = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        const accounts = await ethereum.request({ method: "eth_accounts" });

        const balance = await nftContract.balanceOf(accounts[0]);

        setWalletBalance(balance.toString());
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (err) {
      return;
    }
  };

  const incrementCount = () => {
    if (amount <= 24) {
      setAmount(amount + 1);
    }
  };

  const decrementCount = () => {
    if (amount >= 2) {
      setAmount(amount - 1);
    }
  };

  const connectWalletButton = () => {
    return (
      <Button onClick={connect} className="cta-button connect-wallet-button">
        Connect Wallet
      </Button>
    );
  };

  const mintNftButton = () => {
    return (
      <Button
        onClick={(e) => {
          e.preventDefault();
          mintNft(amount);
        }}
      >
        {feedback}
      </Button>
    );
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    supplyLeft();
    balance();
  }, []);

  return (
    <HeroContainer>
      <HeroBg>
        <ImageBg src={bg} />

        <ImageBg2 src={bg2} />
      </HeroBg>
      <HeroContent>
        <MintDiv>
          <MiniAbout>0xWonderPals is an expansion collection of 10K unique reconstructed cute NFTs. There are no duplicates of the original project. </MiniAbout>
          <First>#YellowArmy</First>
          <Then>0.0069Ξ each (max 25 NFT / tx.)</Then>
          <Minted>
            <MintCText>Minted</MintCText>
            <MintCText2>{supply}/10000</MintCText2>
          </Minted>
          <Price>
            <PriceText>Price</PriceText>
            <PriceText2>0.0069Ξ</PriceText2>
          </Price>

          <NewDiv>
            <MintInput>
              <Minus onClick={decrementCount}>-</Minus>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Plus onClick={incrementCount}>+</Plus>
            </MintInput>
            <Spacer></Spacer>
            <Button>
              {currentAccount ? mintNftButton() : connectWalletButton()}
            </Button>
          </NewDiv>
          <MyNFT>My total NFT minted: {walletBalance}</MyNFT>
        </MintDiv>
      </HeroContent>
    </HeroContainer>
  );
};
export default HeroSection;
