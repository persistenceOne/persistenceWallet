import React from 'react';
import loaderImage from "../../assets/images/loader.svg";
import {Modal} from "react-bootstrap";
import {useSelector} from "react-redux";

const Loader = () => {
    const inProgress = useSelector(state => state.common.inProgress);

    return (
        <Modal
            show={inProgress}
            backdrop="static"
            keyboard={false}
            centered
            className="loader"
        >
            <img src={loaderImage} alt="loader"/>
        </Modal>
    );
};

export default React.memo(Loader);
