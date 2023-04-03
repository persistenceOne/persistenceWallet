import React, {useState} from "react";
import Modal from "../../molecules/modal";

const CreateWallet = () => {
    const [steps, setSteps] = useState("");
    const handleClose = () =>{

    }

    const note = () => {

    }

    return (
        <Modal
            show={true}
            onClose={handleClose}
            header=""
            className="txnInfoModal"
            staticBackDrop={true}
            closeButton={true}
        >
            <p>sdfs</p>
        </Modal>
    );
};

export default CreateWallet;
