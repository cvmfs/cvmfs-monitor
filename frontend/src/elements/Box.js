import styled from "styled-components";
import {
  black,
  shipGrey,
  athensGrey,
  grey,
  gravel,
  roboto,
  // green,
  red,
  // yellow,
  above,
  // white,
  // gray
} from "../utilities";

export default styled.div`
  max-width: 1200px;
  min-height: calc(100vh - 94px);
  margin: 0px 10px;
  ${above.desktop`
    margin: 0 auto;
  `}

  table {
    margin: 20px 0px;
    width: 100%;
    border-spacing: 0;
    overflow: hidden;
    border-radius: 10px;
    ${above.phone`
      border-radius: 20px;
    `}
  }
  th,
  td {
    text-align: left;
    border-bottom: 1px solid ${gravel};
    padding: 0.25rem;
    background: ${grey};
    ${roboto};
    padding: 10px 5px;
    font-size: 0.6em;
    ${above.smallPhone`
      font-size: 0.75em;
    `}
    ${above.phone`
      padding: 10px 12px;
      font-size: 1em;
    `}
  }
  tr td:first-child {
    width: 125px;
    ${above.phone`
      width: 150px;
    `};
    ${above.tablet`
      width: 300px;
    `}
  }
  .table-title {
    font-size: 1.25em;
    font-weight: 600;
    background: ${shipGrey};
    color: ${athensGrey};
    ${roboto};
    padding: 10px 15px;
  }
  .tabel-details {
    display: none;
  }
  .two-tab-elem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 5px;
    ${above.phone`
      padding: 10px 15px;
    `}
    &.error {
      color: ${red};
      font-weight: 600;
    }
  }
  .grid {
    ${above.tablet`
      display: flex;
      flex-wrap: wrap;
    `}
  }
  .card:nth-child(odd) {
    ${above.tablet`
      margin-right: 5px;
    `}
  }
  .card:nth-child(even) {
    ${above.tablet`
      margin-left: 5px;
    `}
  }
  .card-title {
    font-size: 0.9em;
    font-weight: 600;
    ${roboto};
    padding: 7px 0px;
    ${above.smallPhone`
      font-size: 1em;
    `}
    ${above.phone`
      padding: 10px 0px;
    `}
  }
  .card {
    display: flex;
    align-items: center;
    border-radius: 20px;
    margin-bottom: 10px;
    background: ${grey};
    flex: 1 1 calc(50% - 10px);
  }
  .img {
    padding: 1em;
    ${above.smallPhone`
      padding: 1.5em;
    `}
    ${above.tablet`
      padding: 2em;
    `}
  }
  .content {
    width: 100%;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    ${roboto};
  }
  .details {
    padding: 7px 0px;
    font-size: 0.65em;
    ${above.smallPhone`
      font-size: 0.75em;
    `}
    ${above.phone`
      font-size: 1em;
      padding: 10px 0px;
    `}
    &.revision {
      font-weight: 600;
    }
  }
  .revision {
    font-weight: normal;
  }
  .link {
    color: ${black};
    display: inline-block;
    width: 210px;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
    ${above.smallPhone`
      width: 250px;
    `}
    ${above.phone`
      width: 370px;
    `}
    ${above.tablet`
    width: 100%;
    `}
  }
`;