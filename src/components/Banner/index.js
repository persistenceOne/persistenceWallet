import React, {useState} from 'react';
import Icon from "../Icon";

const Banner = () => {
    const [banner, setBanner] = useState(true);

    const closeBanner = () => {
        setBanner(false);
    };
    return (
        <div className={!banner ? 'd-none' : "top-banner-section"}>
            <a className="content" href="https://forum.persistence.one/t/discussion-migrating-to-coin-type-118-from-coin-type-750-for-persistence-core-1-chain-xprt/72" target="_blank"
                rel="noopener noreferrer">
                <b>Note:</b> The support for 750 coin-type wallets is proposed to deprecate in December 2024
                <Icon viewClass="right-arrow" icon="right-arrow"/>
            </a>
            <div onClick={closeBanner}>
                <Icon viewClass="close" icon="close"/>
            </div>
        </div>
    );
};

export default Banner;
