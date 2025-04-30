import { useEffect, useState } from "react";
import "./App.css";
import { getToken } from "./api/akeneoService";

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
    <>
      <h1>Copy Content from SKU</h1>
      <div className="card">
        <form>
          <div>
            <p>Source SKU</p>
            <input type="text"></input>
          </div>

          <div>
            <p>Destination SKU</p>
            <input type="text"></input>
          </div>

          <div>
            <input type="submit" value="Submit"></input>
          </div>
        </form>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
