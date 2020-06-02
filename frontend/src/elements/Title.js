import styled from "styled-components";
import {
  black,
  shipGrey,
  athensGrey,
  grey,
  gravel,
  roboto,
  green,
  red,
  yellow,
  above,
  white,
  gray
} from "../utilities";

export default styled.div`
padding-top: 20px;
color: ${black};
font-size: 1.75em;
font-weight: 500;
${roboto};
${above.smallPhone`
  font-size: 2em;
`}
${above.phone`
  font-size: 2.75em;
`}
&.page404 {
  padding-top: 0px;
  font-size: 7.5em;
  ${above.phone`
    font-size: 10em;
  `}
}
`;