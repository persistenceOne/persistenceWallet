import React, { useEffect, useState } from "react";
import Button from "../../atoms/button";
import { Icon } from "../../atoms/icon";
import { createRandomWallet } from "../../../helpers/wallet";
import { randomNum } from "../../../helpers/utils";
import Copy from "../../molecules/copy";

const SeedCreation = ({ handleSteps }: any) => {
  const [mnemonicList, setMnemonicList] = useState([]);
  const [mnemonic, setMnemonic] = useState("");
  const [randomMnemonicList, setRandomMnemonicList] = useState([]);
  const [randomNumberList, setRandomNumberList] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [quiz, setQuiz] = useState(false);

  useEffect(() => {
    const getWallet = async () => {
      const response = await createRandomWallet();
      let mnemonic = response.mnemonic;
      setMnemonic(mnemonic);
      const mnemonicArray = mnemonic.split(" ");
      setMnemonicList(mnemonicArray);
      let randomNumbers = randomNum(1, 24);
      setRandomNumberList(randomNumbers);
      let newMnemonicList: any = [];
      mnemonicArray.map((key: any, index: number) => {
        if (randomNumbers.includes(index)) {
          newMnemonicList.push("");
        } else {
          newMnemonicList.push(key);
        }
      });

      setRandomMnemonicList(newMnemonicList);
      if (response.error) {
        setErrorMessage(response.error);
      }
    };
    getWallet();
  }, []);

  const handleQuiz = () => {
    setQuiz(true);
    console.log(randomMnemonicList, "randomMnemonicList", quiz);
  };

  const submitMnemonic = () => {
    for (let index = 0; index < randomNumberList.length; index++) {
      let phrase = document.getElementById(
        "mnemonicKey" + randomNumberList[index]
      ) as HTMLInputElement;
      if (mnemonicList[randomNumberList[index]] !== phrase?.value) {
        setErrorMessage("Mnemonic not matched");
        return;
      } else {
        if (index === randomNumberList.length - 1) {
          console.log("matched");
        }
      }
    }
  };

  const handleKeypress = (e: any) => {
    const regex = new RegExp("^[a-zA-Z0-9]+$");
    const key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (!regex.test(key) && e.key !== "Enter") {
      e.preventDefault();
      return false;
    } else {
      if (e.key === "Enter") {
      }
    }
  };

  return (
    <>
      <div className="px-8 pt-8 md:px-6 md:pt-6">
        <button
          className="absolute left-[50px] top-[40px]"
          onClick={() => handleSteps("1")}
        >
          <Icon viewClass="arrow-right" iconName="left-arrow" />
        </button>
        <p className="text-center text-light-high font-semibold text-2xl leading-normal">
          Create Wallet
        </p>
      </div>
      <div className="p-6">
        <div
          className="mb-2 text-center flex
                justify-center items-center relative"
        >
          <span className="mr-2 text-light-emphasis font-bold text-base leading-normaL">
            Mnemonic (Seed Phrase)
          </span>
          <Copy id={mnemonic} />
        </div>
        <div className="flex flex-wrap justify-center mb-4">
          {quiz ? (
            <>
              <p className={"mb-4 max-w-[80%] mx-auto text-center"}>
                Enter your mnemonics below to make sure you saved mnemonics
                correctly
              </p>
              <div className="flex flex-wrap justify-center">
                {randomNumberList.length &&
                  randomNumberList.map((number: any, index: null) => (
                    <div className="flex items-center">
                      <p>{number}</p>
                      <input
                        disabled={false}
                        key={index}
                        id={`mnemonicKey${number}`}
                        className="h-[40px] w-[100px] m-2 p-2 text-center rounded-sm"
                        type="text"
                        defaultValue=""
                        onKeyPress={handleKeypress}
                        required={true}
                      />
                    </div>
                  ))}
              </div>
            </>
          ) : (
            mnemonicList.map((seed, index) => {
              return (
                <input
                  disabled
                  key={index}
                  className="h-[40px] w-[100px] m-2 p-2 text-center rounded-sm"
                  type="text"
                  value={seed}
                  required={true}
                />
              );
            })
          )}
        </div>
        {errorMessage !== "" ? (
          <p className="text-base text-red text-center font-semibold mb-4 md:mb-3 md:text-sm">
            {errorMessage}
          </p>
        ) : null}
        <Button
          className="button w-full md:text-sm flex items-center
            justify-center w-[150px] md:w-[200px] mx-auto mb-4"
          type="primary"
          size="medium"
          content="Next"
          onClick={quiz ? submitMnemonic : handleQuiz}
        />
      </div>
    </>
  );
};

export default SeedCreation;
