import React from "react";
import logo from "../../images/logo.png";
import { Bg, Logo, Twitter, Opensea, Img, Img2 } from "./NavbarElements";
import tw from "../../images/tw.png"
import os from "../../images/os.png"

function Navbar() {
  return (
    <Bg>
      <Twitter  href="https://twitter.com/0xPals">
      <Img src={tw}>
      
      </Img>
      </Twitter>
      <Opensea  href="https://opensea.io/collection/0xpals">
      <Img2 src={os}>
      
      </Img2>
      </Opensea>
    
      <Logo src={logo} />
    </Bg>
    
  );
}

export default Navbar;