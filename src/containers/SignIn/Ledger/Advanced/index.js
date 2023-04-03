import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import Icon from "../../../../components/Icon";
import {Card} from "react-bootstrap";
import AccountNumber from "./AccountNumber";
import AccountIndex from "./AccountIndex";
import ButtonSubmit from "./ButtonSubmit";
import {setAccountIndex, setAccountNumber} from "../../../../store/actions/signIn/ledger";
import {useDispatch} from "react-redux";

const Advanced = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [advanceMode, setAdvanceMode] = useState(false);

    const handleAccordion = () => {
        if (advanceMode) {
            dispatch(setAccountIndex({
                value: "",
                error: {
                    message: ""
                }
            }));
            dispatch(setAccountNumber({
                value: "",
                error: {
                    message: ""
                }
            }));
        }
        setAdvanceMode(!advanceMode);
    };

    return (
        <div className="advanced-wallet-accordion">
            <Card>
                <Card.Header>
                    <p>
                        {t("ADVANCED")}
                    </p>
                    <button
                        type="button"
                        className="accordion-button"
                        onClick={handleAccordion}
                    >
                        {advanceMode ?
                            <Icon
                                viewClass="arrow-right"
                                icon="up-arrow"/>
                            :
                            <Icon
                                viewClass="arrow-right"
                                icon="down-arrow"/>}

                    </button>
                </Card.Header>
                {advanceMode ?
                    <div className="collapse show">
                        <AccountNumber/>
                        <AccountIndex/>
                        <div className="buttons">
                            <ButtonSubmit/>
                        </div>
                    </div>
                    : ""
                }
            </Card>
        </div>
    );
};


export default Advanced;
