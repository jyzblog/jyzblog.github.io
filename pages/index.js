import React, { Fragment } from "react";
import Nav from "../components/nav";

import styles from "../styles/content.module.css";

function index() {
  return (
    <Fragment>
      <Nav />
      <div className={styles.content}>
        <h3>Mottos</h3>
        <ul>
          <li>Waking up without an alarm.</li>
          <li>Having space to think clearly.</li>
          <li>Living life at your own pace.</li>
          <li>Finding joy in quiet moments.</li>
          <li>Being surrounded by genuine love.</li>
          <li>Remaining curious.</li>
        </ul>
        <h3>My interests:</h3>
        <ul>
          <li>Economics</li>
          <li>History</li>
          <li>Psychology</li>
          <li>Cryptography</li>
          <li>Hard sciences</li>
        </ul>

        <h3>What I've done:</h3>
        <ul>
          <li>
            2x founder / exits, angel & LP.
          </li>
          <li>
            Advised various federal government agencies on modernization &
            security.
          </li>
          <li>
            Built matching engines, derivatives products, OTC platforms, credit
            card gateway, aml/kyc pipelines
          </li>
          <li>
            Dealt with clearing houses, custodians, private banks, shadow banks,
            dark pools
          </li>
          <li>Bluetooth, wifi protocols, nfc for IoT</li>
          <li>Bitcoin: btcd, p2sh, payment channels</li>
          <li>
            Ethereum: core dev in 2014, wrote first node implementation: geth,
            go-ethereum, cpp-ethereum/aleth
          </li>
        </ul>

        <h3>What I'm learning:</h3>
        <ul>
          <li>Exotic/unusual asset classes/commodities</li>
          <li>
            Angel investing: interested in niche businesses with persistent
            founders. Standard SAFE(yc)/KISS(500) possible
          </li>
        </ul>

        <h3>Socials:</h3>
        <ul>
          <li>
            <a href="https://linkedin.com/in/josephyzhou">LinkedIn</a>
          </li>
          <li>
            <a href="https://twitter.com/josephzhou">Twitter</a>
          </li>
        </ul>

        <p>Thanks for stopping by! - J.Z.</p>
      </div>
    </Fragment>
  );
}

export default index;
