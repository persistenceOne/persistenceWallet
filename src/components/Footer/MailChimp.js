import React, {useEffect, useState} from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import {Button, Spinner} from "react-bootstrap";

let mailURl = process.env.REACT_APP_MAIL_CHIMP_URL;

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 500));
}

const CustomForm = ({status, onValidated}) => {
    const [isLoading, setLoading] = useState(false);
    const [disable, setDisable] = useState(true);
    let email;
    const onKeyPress = (e) => {
        if (e.which === 13) {
            submit();
        }
    };

    const handleChange = (e) => {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (pattern.test(e.target.value)) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    };


    useEffect(() => {
        if (isLoading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
                setDisable(true);
            });
        }
    }, [isLoading]);

    const submit = () => {
        setLoading(true);
        email &&
        email.value.indexOf("@") > -1 &&
        onValidated({
            EMAIL: email.value,
        });
        document.getElementById('email').value = '';
    };
    return (
        <div>
            <div className="subscription-result">
                {status === "error" && (
                    <div
                        style={{color: "red"}}
                        className="show-message"
                    >

                        Email already subscribed.</div>
                )}
                {status === "success" && (
                    <div
                        style={{color: "green"}}
                        className="show-message"
                    >Thank you for subscribing!
                    </div>
                )}
            </div>
            <div className="mail-chimp-section">
                <input
                    ref={node => (email = node)}
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                    onKeyPress={onKeyPress}
                />
                <Button className="btn-subscribe" onClick={!isLoading ? submit : null} disabled={disable}>
                    {isLoading ?
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        : 'Subscribe'}
                </Button>
            </div>
        </div>
    );
};

const Mailchimp = () => {
    const url = mailURl;
    return (
        <MailchimpSubscribe
            url={url}
            render={({subscribe, status, message}) => (
                <CustomForm
                    status={status}
                    message={message}
                    onValidated={formData => subscribe(formData)}
                />
            )}
        />
    );
};

export default Mailchimp;