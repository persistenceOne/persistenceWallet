import React, {useContext} from "react";
import {Accordion, Card, useAccordionToggle, AccordionContext} from "react-bootstrap";
import {useTranslation} from "react-i18next";

function ContextAwareToggle({children, eventKey, callback}) {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
        eventKey,
        () => callback && callback(eventKey),
    );

    const isCurrentEventKey = currentEventKey === eventKey;

    return (
        <button
            type="button"
            className="accordion-button"
            onClick={decoratedOnClick}
        >
            {isCurrentEventKey ? "-" : "+"}

        </button>
    );
}

const WalletFaq = () => {
    const {t} = useTranslation();
    return (
        <Accordion>
            <Card>
                <Card.Header>
                    <p>
                        {t("FAQ1")}
                    </p>
                    <ContextAwareToggle eventKey="0">Click me!</ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body><p>{t("FAQ1A")}</p></Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                    <p>
                        {t("FAQ2")}
                    </p>
                    <ContextAwareToggle eventKey="1">Click me!</ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <p>{t("FAQ2_INFO")}
                        </p>
                        <br/>
                        <ul>
                            <li>
                                {t("FAQ21")}
                            </li>
                            <li>  {t("FAQ22")}
                            </li>
                            <li>  {t("FAQ23")}
                            </li>
                            <li>  {t("FAQ24")}
                            </li>
                            <li>  {t("FAQ25")}
                            </li>
                            <li>  {t("FAQ26")}
                            </li>
                            <p>  {t("FAQ27")}</p>
                            <li>  {t("FAQ28")}
                            </li>
                            <li>  {t("FAQ29")}
                            </li>
                            <li>  {t("FAQ210")}
                            </li>
                            <li>{t("FAQ211")}</li>
                        </ul>
                        <p>  {t("FAQ212")}</p>
                     </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                    <p>
                        {t("FAQ3")}
                    </p>
                    <ContextAwareToggle eventKey="2">Click me!</ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                    <Card.Body><ul>
                        <li>{t("FAQ31")}</li>
                        <li>{t("FAQ32")}
                        </li>
                        <li>{t("FAQ33")}
                        </li>
                        <li>{t("FAQ34")}</li>
                        <li>{t("FAQ35")}</li>
                        <li>{t("FAQ36")}
                        </li>
                        <li>{t("FAQ37")}
                        </li>
                        <li>{t("FAQ38")}</li>
                    </ul></Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                    <p>
                        {t("FAQ4")}
                    </p>
                    <ContextAwareToggle eventKey="3">Click me!</ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="3">
                    <Card.Body><p>{t("FAQ4A")}
                    </p></Card.Body>
                </Accordion.Collapse>
            </Card>

            <Card>
                <Card.Header>
                    <p>
                        {t("FAQ5")}
                    </p>
                    <ContextAwareToggle eventKey="5">Click me!</ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="5">
                    <Card.Body><p>{t("FAQ5A")}
                        <a href="https://t.me/PersistenceOneChat" rel="noopener noreferrer" target="_blank"
                           title="Community Chat"> (PersistenceOneChat)</a>
                    </p></Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>

    )
}
export default WalletFaq;