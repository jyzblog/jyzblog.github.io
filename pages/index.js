import React, { Fragment } from 'react';
import Nav from '../components/nav';

import styles from '../styles/content.module.css';

function index() {
  return (
    <Fragment>
      <Nav />
      <div className={styles.content}>
        <h3>My interests:</h3>
        <ul>
          <li>Economics</li>
          <li>History</li>
          <li>Psychology</li>
          <li>Cryptography</li>
          <li>Cybersecurity</li>
          <li>Hard sciences</li>
        </ul>

        <h3>What I've done:</h3>
        <ul>
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

        <h3>What I do:</h3>
        <ul>
          <li>Golang, Rust, Node.js, Swift, React / React Native</li>
          <li>Exotic/unusual asset classes/commodities</li>
          <li>
            Federal Contracting: Interesting in prime/sub/joint ventures in the
            areas of modernization, cloud, security
          </li>
          <li>
            Angel investing: interested in niche businesses with persistent
            founders. Standard SAFE(yc)/KISS(500) possible
          </li>
        </ul>

        <h3>Social:</h3>
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
