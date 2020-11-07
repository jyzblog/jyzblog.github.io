import React, { Fragment } from 'react';
import Nav from '../components/nav';

import styles from '../styles/content.module.css';

function index() {
  return <Fragment>
    <Nav />
    <div className={styles.content}>
      <p>Congrats, you've found me!</p>
      <p>My interests: <br />
        - economics<br />
        - psychology<br />
        - cryptography<br />
        - cybersecurity<br />
        - hard sciences</p>
      <p>
        What I've done:<br />
          - Advised various federal government agencies on modernization & security.<br />
            - Built matching engines, derivatives products, OTC platforms, credit card gateway, aml/kyc pipelines<br />
              - Dealt with clearing houses, custodians, private banks, shadow banks, dark pools<br />
                - Bluetooth, wifi protocols, nfc for IoT<br />
                  - Bitcoin: btcd, p2sh, payment channels<br />
                    - Ethereum: core dev in 2014, wrote first node implementation: geth, go-ethereum, cpp-ethereum/aleth</p>
                  <p>
                    What I do:<br />
- Golang, Rust, Node.js, Swift, React / React Native<br />
- Exotic/unusual asset classes/commodities<br />
- Federal Contracting: Interesting in prime/sub/joint ventures in the areas of modernization, cloud, security<br />
- Angel investing: interested in niche businesses with persistent founders. Standard SAFE(yc)/KISS(500) possible</p>

                  <p>Thanks for stopping by, you can reach me at: <br /> <a href="https://linkedin.com/in/josephyzhou">LinkedIn</a> | <a href="https://twitter.com/josephzhou">Twitter</a></p>
    </div>
  </Fragment>
}

export default index;
