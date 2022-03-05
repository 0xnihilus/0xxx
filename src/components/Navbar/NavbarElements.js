import styled from "styled-components";

export const Bg = styled.div`
  position: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  overflow: hidden;
  background: #ffd30b;
  
`;

export const Logo = styled.img`
  display: flex;
  height: 150px;
  margin-left: auto;
  margin-right: auto;
  background: #ffd30b;
  
  @media only screen and (max-width: 600px) {
  display: flex;
  height: 150px;
  
  margin-top: 10px;
  background: #ffd30b;
  }
`;

export const Opensea = styled.a`
  display: flex;
`;

export const Twitter = styled.a`
  display: flex;
`;

export const Img = styled.img`
  display: flex;
  height: 65px;
  right: 150px;
  margin-top: 14px;
  position: absolute;
  background: #ffd30b;

  @media only screen and (max-width: 600px) {
    display: flex;
    height: 65px;
    right: 65px;
    margin-top: 14px;
    
    position: absolute;
    background: #ffd30b;
  }
`;

export const Img2 = styled.img`
  display: flex;
  height: 50px;
  right: 80px;
  margin-top: 20px;
  position: absolute;
  background: #ffd30b;

  @media only screen and (max-width: 600px) {
    display: flex;
    height: 50px;
    right: 10px;
    margin-top: 20px;
    position: absolute;
    background: #ffd30b;
  }
`;