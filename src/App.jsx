import React, { useState } from 'react';
import { data } from "./data/data";
import ImcCalc from './components/ImcCalc';
import ImcTable from "./components/ImcTable";
import './App.css';

function App() {
  const [imc, setImc] = useState("");
  const [info, setInfo] = useState("");
  const [infoClass, setInfoClass] = useState("");

  const calcImc = (e, height, weight) => {
    e.preventDefault();
  
    if (!weight || !height) return;
  
    const weightFloat = parseFloat(weight.replace(",", "."));
    const heightFloat = parseFloat(height.replace(",", "."));
  
    const imcResult = (weightFloat / (heightFloat * heightFloat)).toFixed(1);
  
    setImc(imcResult);
  
    let foundInfo = false;
  
    data.forEach((item) => {
      console.log('IMC Result:', imcResult);
      console.log('Item Min:', item.min);
      console.log('Item Max:', item.max);
  
      if (imcResult >= item.min && imcResult <= item.max) {
        console.log('Match Found!');
        console.log('Info:', item.info);
        console.log('Info Class:', item.infoClass);
  
        setInfo(item.info);
        setInfoClass(item.infoClass);
        foundInfo = true;
      }
    });
  
    if (!foundInfo) {
      setInfo("");
      setInfoClass("");
    }
  };
  
  function resetCalc(e) {
    e.preventDefault();
    setImc("");
    setInfo("");
    setInfoClass("");
  }

  return (
    <div className='container'>
      {!imc ? <ImcCalc calcImc={calcImc} /> : <ImcTable data={data} imc={imc} info={info} infoClass={infoClass} resetCalc={resetCalc} />}
    </div>
  );
}

export default App;
