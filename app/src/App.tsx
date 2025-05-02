import { useEffect, useState } from "react";
import "./App.css";
import { ProductsIllustration, TextInput } from "akeneo-design-system";
import { CopyRequestBody } from "./common/lib/types";
import { copyContent, getToken } from "./api/akeneoService";

function App() {
  const [inputSku, setInputSku] = useState<string>("");
  const [manualSku, setManualSku] = useState<boolean>(false);
  const [currentSku, setCurrentSku] = useState<string>("");

  // Extract UUID once on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const identifier = params.get("product[identifier]") ?? "";

    setCurrentSku(identifier);
    setManualSku(identifier === "");
  }, []);

  const updateInputSku = (sku: string) => {
    setInputSku(sku);
  };

  const updateCurrentSku = (sku: string) => {
    setCurrentSku(sku);
  };

  const submitData = async () => {
    const tokenData = await getToken();
    const token: string = tokenData?.access_token;
    const data: CopyRequestBody = {
      source: inputSku,
      dest: currentSku,
    };

    const response = await copyContent(data, token);
    if (response === "ACCEPTED") {
      setInputSku("");
      console.log("Data Updated");
    } else {
      console.log("Data update Error");
    }
  };

  return (
    <div className="AknFullPage">
      <div className="AknFullPage-content AknFullPage-content--withIllustration">
        <div>
          <ProductsIllustration size={256} />
        </div>
        <div>
          <div className="AknFullPage-titleContainer">
            <div className="AknFullPage-subTitle">Products</div>
            <div className="AknFullPage-title">Copy Property</div>
          </div>

          <div className="modal-body creation">
            <div className="AknFormContainer AknFormContainer--withPadding">
              <div data-drop-zone="fields" className="AknFormContainer">
                <div className="AknFieldContainer">
                  <div className="AknFieldContainer-header">
                    <label
                      className="AknFieldContainer-label control-label"
                      htmlFor="s2id_autogen35"
                    >
                      Current Product
                    </label>
                  </div>
                  <div className="AknFieldContainer-inputContainer field-input">
                    <TextInput
                      className="AknTextField"
                      placeholder="Please enter the product SKU"
                      readOnly={!manualSku}
                      value={currentSku}
                      onChange={manualSku ? updateCurrentSku : undefined}
                    />
                  </div>
                </div>

                <div className="AknFieldContainer">
                  <div className="AknFieldContainer-header">
                    <label
                      className="AknFieldContainer-label control-label"
                      htmlFor="s2id_autogen35"
                    >
                      SKU
                    </label>
                  </div>
                  <div className="AknFieldContainer-inputContainer field-input">
                    <TextInput
                      className="AknTextField"
                      placeholder="Please enter the product SKU"
                      value={inputSku}
                      onChange={updateInputSku}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="AknButtonList">
            <button
              className="AknButton AknButton--grey AknButtonList-item cancel"
              onClick={() => updateInputSku("")}
            >
              Clear
            </button>
            <button
              className="AknButton AknButtonList-item AknButton--apply ok"
              onClick={submitData}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
