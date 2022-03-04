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
  margin-left: -30px;
  margin-top: 10px;
  background: #ffd30b;
  }
`;
