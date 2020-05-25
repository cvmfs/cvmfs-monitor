import styled from "styled-components";
import { applyStyleModifiers } from "styled-components-modifiers";
import { shadows, white, shipGrey } from "../utilities";

const BUTTON_MODIFIERS = {
  more: () => `
    font-weight: 600;
    border-radius: 10px;
    `
};

export const Button = styled.button`
  padding: 5px 10px;
  border-radius: 4px;
  border: none;
  color: ${white};
  font-size: 1em;
  transition: 0.3s ease box-shadow background;
  background: ${shipGrey};
  ${shadows[1]};
  &:hover {
    ${shadows[2]};
  }
  ${applyStyleModifiers(BUTTON_MODIFIERS)};
`;
