import { css } from "styled-components";

const size = {
  smallPhone : 365,
  phone: 600,
  tablet: 1000,
  desktop: 1200,

};

export const above = Object.keys(size).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${size[label]}px) {
      ${css(...args)}
    }
  `;
  return acc; // accumulator
}, {});