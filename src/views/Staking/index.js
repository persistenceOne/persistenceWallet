import React from "react";
import Staking from "../../containers/Staking";
import DashboardHeader from "../../containers/Common/DashboardHeader";
import GenerateKeyStore from "../../containers/GenerateKeyStore";
import ChangeKeyStorePassword from "../../containers/ChangeKeyStorePassword";

const DashboardStaking = () => {

    return (
        <div className="main-section">
            <DashboardHeader/>
            <GenerateKeyStore/>
            <ChangeKeyStorePassword/>
            <div className="content-section container">
                <Staking/>
            </div>
        </div>
    );
};
export default DashboardStaking;