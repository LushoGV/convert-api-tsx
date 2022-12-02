import axios from "axios";
import { useEffect, useState } from "react";

const App: React.FC = () => {
  const [dolarValue, setDolarValue] = useState<number>(0);
  const [inputContent, setInputContent] = useState({
    inputDolar: 0,
    inputPeso: 0,
  });

  const getDolarValue = async () => {
    const { data } = await axios.get(
      "https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/dolaroficial"
    );
    setDolarValue(Number(data.venta));
  };
  useEffect(() => {
    getDolarValue();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputContent({
      ...inputContent,
      [e.target.name]: e.target.value,
      inputPeso: dolarValue * 1.75 * Number(e.target.value),
    });
  };

  return (
    <div className="bg-gray-900 rounded-lg ">
      <header className="px-6 md:px-28 text-center">
        <h1 className="font-bold text-lg my-4 text-blue-500">
          Dolar tarjeta a peso argentino
        </h1>
      </header>
      <main className="m-7 mb-8 flex flex-col items-center justify-center ">
        <div className="flex flex-col bg-gray-700 bg-opacity-80 py-3 px-3 rounded-md mb-4 w-full border-2 border-gray-600 border-opacity-80">
          <span className="text-blue-500  first-letter:uppercase font-semibold">
            dolar tarjeta
          </span>
          <div className="flex items-center justify-between">
            <input
              onBlur={(e) => {
                e.target.value === "" && setInputContent({   ...inputContent,
                [e.target.name]: 0}) 
              }}
              type="number"
              name="inputDolar"
              value={inputContent.inputDolar}
              onChange={(e) => handleChange(e)}
              className="bg-sky-50 bg-opacity-0 text-white font-semibold text-xl outline-0 px-[1px] p-2"
            />
            <span className="font-semibold text-white px-2 rounded-lg py-1 ml-1 mr-2 bg-gray-600 bg-opacity-80">
              USD
            </span>
          </div>
        </div>
        <div className="absolute bg-gray-900 border-gray-600 text-blue-500 border-opacity-80 font-semibold border-4 px-4 pb-1 text-3xl rounded-xl">
          <span>↓</span>
        </div>
        <div className="flex flex-col bg-gray-700 bg-opacity-80 py-3 px-3 rounded-md w-full border-2 border-gray-600 border-opacity-80">
          <span className="text-blue-500 first-letter:uppercase font-semibold">
            pesos argentinos
          </span>
          <div className="flex items-center justify-between">
          <input
            type="number"
            name="inputPeso"
            value={inputContent.inputPeso}
            className="bg-sky-50 bg-opacity-0 font-semibold text-xl px-[1px] text-white  p-2"
            disabled={true}
          />
          <span className="font-semibold text-white px-2 rounded-lg py-1 ml-1 mr-2 bg-gray-600 bg-opacity-80">
              ARS
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
