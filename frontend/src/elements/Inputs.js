import styled from "styled-components";
import { roboto, whiteSmoke, above } from "../utilities";

export const Input = styled.input`
  background-color: ${whiteSmoke};
  border-radius: 10px;
  font-size: 1.25em;
  line-height: 2em;
  font-weight: 400;
  border: none;
  padding: 0 10px;
  ${roboto};
  width: 100%;
  box-sizing: border-box;
  ${above.smallPhone`
    font-size: 1.5em;  
  `}
  ${above.desktop`
    width: 50%;
  `}
`;
