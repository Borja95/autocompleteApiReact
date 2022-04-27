import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Autosuggest from 'react-autosuggest';
import { useState } from 'react';

const data = [
  { pais: "Brasil", presidente: "Jair Messias Bolsonaro" },
  { pais: "México", presidente: "Andrés Manuel López Obrador" },
  { pais: "Argentina", presidente: "Alberto Ángel Fernández" },
  { pais: "Colombia", presidente: "Iván Duque Márquez" },
  { pais: "Chile", presidente: "Gabriel Boric Font" },
  { pais: "Perú", presidente: "José Pedro Castillo Terrones" },
  { pais: "Ecuador", presidente: "Guillermo Alberto Santiago Lasso Mendoza" },
  { pais: "República Dominicana", presidente: "Luis Rodolfo Abinader Corona" },
  { pais: "Guatemala", presidente: "Alejandro Eduardo Giammattei Falla" },
  { pais: "Costa Rica", presidente: "Carlos Andrés Alvarado Quesada" },
];

function App() {
const[presidentes, setPresidentes]= useState(data);
const[value, setValue]= useState("");
const[presidenteSeleccionado, setPresidenteSeleccionado]= useState({});

const onSuggestionsFetchRequested=({value})=>{
  setPresidentes(filtrarPresidentes(value));
}

const filtrarPresidentes=(value)=>{
  const inputValue=value.trim().toLowerCase();
const inputLength=inputValue.length;

  var filtrado=data.filter((presidente)=>{
    var textoCompleto=presidente.presidente + " - " +presidente.pais;

    if(textoCompleto.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .includes(inputValue)){
      return presidente;
    }
  });

  return inputLength===0 ? [] : filtrado;
}

const onSuggestionsClearRequested = () =>{
  setPresidentes([]);
}

const getSuggestionValue=(suggestion)=>{
  return `${suggestion.presidente} - ${suggestion.pais}`;
}

const renderSuggestion=(suggestion)=>(
  <div className='sugerencia' onClick={()=>seleccionarPresidente(suggestion)}>
    {`${suggestion.presidente} - ${suggestion.pais}`}
  </div>
);

const seleccionarPresidente=(presidente)=>{
  setPresidenteSeleccionado(presidente);
}

const onChange=(e, {newValue})=>{
  setValue(newValue);
}

const inputProps={
placeholder:"País o Nombre del Presidente",
value,
onChange
};

const eventEnter=(e)=>{
if(e.key == "Enter"){
  var split = e.target.value.split('-');
  var presidente ={
    presidente: split[0].trim(),
    pais: split[1].trim(),
  };
  seleccionarPresidente(presidente);
}
}

  return (
    <div className="App">
     <Autosuggest 
      suggestions={presidentes}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      onSuggestionSelected={eventEnter}
     />
     <br />
     <button className='btn btn-primary' onClick={()=>console.log(presidenteSeleccionado)}>Checar Estado</button>
    </div>
  );
}

export default App;
