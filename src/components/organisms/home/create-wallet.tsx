import React, {useState} from "react";
import { useAppStore } from "../../../../store/store";
import Modal from "../../molecules/modal";
import Button from "../../atoms/button";
import {CreateWalletSteps} from "./types";
import SeedCreation from "./seed-creation";

const CreateWallet = () => {
    const [steps, setSteps] = useState<CreateWalletSteps>("1");
    const handleCreateWalletModal = useAppStore((state) => state.handleCreateWalletModal);
    const modal = useAppStore((state) => state.createWallet.modal.show);

    const handleClose = () =>{
        handleCreateWalletModal(false)
    }

    const handleSteps = (step:CreateWalletSteps) => {
        setSteps(step)
    }

    const noteContent = (
        <>
            <p
                className="text-light-high text-center font-semibold text-lg leading normal px-8 pt-8 md:px-6 md:pt-6
       md:text-base"
            >
                Bond LP Tokens
            </p>
            <div className={`px-8 py-6 m-0`}>
                <div className="p-6 bg-[#383838] mb-6">
                <p className="text-light-emphasis font-bold text-base leading-normal mb-2">Take a moment to read through this content for your own safety</p>
                <ul className="list-disc pl-8">
                    <li className="text-light-mid font-normal text-base leading-normal mb-2">Users need to securely store their Mnemonic (seed phrase) to prevent loss of funds. Losing or exposing
                        this phrase could potentially lead to users' funds being stolen.</li>
                    <li className="text-light-mid font-normal text-base leading-normal">Users can view and save their mnemonic while creating a wallet.</li>
                </ul>
                </div>
                <Button
                    className="button w-full md:text-sm flex items-center
            justify-center w-[150px] md:w-[200px] mx-auto mb-4"
                    type="primary"
                    size="medium"
                    content="Next"
                    onClick={()=>{handleSteps("2")}}
                />
            </div>
        </>
    )
    return (
        <Modal
            show={modal}
            onClose={handleClose}
            header=""
            modalBodyClassName={"!p-0"}
            modalDialogClassName={"!max-w-[600px]"}
            staticBackDrop={true}
            closeButton={true}
        >
            {steps === "1" ?
                noteContent
                : steps === '2' ?
                    <SeedCreation handleSteps={handleSteps}/>
                    : ""
            }
        </Modal>
    );
};

export default CreateWallet;
