import React from 'react';
import {Modal} from "react-bootstrap";
import {useSelector} from "react-redux";
import Image from 'next/image';

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
            <Image src="/images/loader.svg" alt="loader" width={50} height={50}/>
        </Modal>
    );
};

export default React.memo(Loader);
