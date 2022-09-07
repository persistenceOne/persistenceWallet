import React, {useState} from 'react';
import Icon from "../Icon";

const Banner = () => {
    const [banner, setBanner] = useState(true);

    const closeBanner = () => {
        setBanner(false);
    };
    return (
        <div className={!banner ? 'd-none' : "top-banner-section"}>
            <p className="content">
                <b>Note:</b> The support for 750 coin-type wallets is proposed to deprecate in December 2024
            </p>
            <div onClick={closeBanner}>
                <Icon viewClass="close" icon="close"/>
            </div>
        </div>
    );
};

export default Banner;
