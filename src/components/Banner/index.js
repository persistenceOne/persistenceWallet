import React, {useState} from 'react';
import Icon from "../Icon";

const Banner = () => {
    const [banner, setBanner] = useState(true);

    const closeBanner = () => {
        setBanner(false);
    };
    return (
        <div className={!banner ? 'd-none' : "top-banner-section"}>
            <a className="content" href=" https://blog.persistence.one/2022/07/14/coin-type-migration-from-750-to-118-for-persistence-core-1-chain-xprt/" target="_blank"
                rel="noopener noreferrer">
                <b>Note:</b> as part of the Persistence v3 chain upgrade, the default coin-type was changed from 750 to 118. Read all about it here.
                <Icon viewClass="right-arrow" icon="right-arrow"/>
            </a>
            <div onClick={closeBanner}>
                <Icon viewClass="close" icon="close"/>
            </div>
        </div>
    );
};

export default Banner;
