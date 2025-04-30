import { useEffect, useState } from "react";
import "./App.css";
import { getToken } from "./api/akeneoService";

import {
  // PreviewCard,
  // PreviewContainer,
  ProductsIllustration,
  TextInput,
  // LabelContainer,
} from "akeneo-design-system";

function App() {
  const [token, setToken] = useState<string>("No");

  useEffect(() => {
    const fetchToken = async () => {
      const res = await getToken();
      setToken(res?.access_token);
    };
    fetchToken();
  }, []);

  console.log({ token });

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
                      SKU
                    </label>
                  </div>
                  <div className="AknFieldContainer-inputContainer field-input">
                    <TextInput
                      className="AknTextField"
                      placeholder="Please enter the product SKU"
                      value=""
                    />
                  </div>
                </div>
                <div>
                  <div id="mandatory-categories"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="AknButtonList">
            <div className="AknButton AknButton--grey AknButtonList-item cancel">
              Clear
            </div>
            <button className="AknButton AknButtonList-item AknButton--apply ok">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
