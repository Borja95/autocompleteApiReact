import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Autosuggest from 'react-autosuggest';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const[data, setData]= useState([]);
const[personajes, setPersonajes]= useState([]);
const[value, setValue]= useState("");
const[personajeSeleccionado, setPersonajeSeleccionado]= useState({});

const onSuggestionsFetchRequested=({value})=>{
  setPersonajes(filtrarPersonajes(value));
}

const filtrarPersonajes=(value)=>{
  const inputValue=value.trim().toLowerCase();
const inputLength=inputValue.length;

  var filtrado=data.filter((personaje)=>{
    var textoCompleto=personaje.name;

    if(textoCompleto.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .includes(inputValue)){
      return personaje;
    }
  });

  return inputLength===0 ? [] : filtrado;
}

const onSuggestionsClearRequested = () =>{
  setPersonajes([]);
}

const getSuggestionValue=(suggestion)=>{
  return `${suggestion.name}`;
}

const renderSuggestion=(suggestion)=>(
  <div className='sugerencia' onClick={()=>seleccionarPersonaje(suggestion)}>
    {`${suggestion.name}`}
  </div>
);

const seleccionarPersonaje=(personaje)=>{
  setPersonajeSeleccionado(personaje);
}

const onChange=(e, {newValue})=>{
  setValue(newValue);
}

const inputProps={
placeholder:"Nombre del Personaje",
value,
onChange
};

const eventEnter=(e)=>{
if(e.key == "Enter"){
  var personajeActual = data.filter(p => p.name == e.target.value.trim());

  //console.log(personajeActual);
  var personaje ={
    id: personajeActual[0].id,
    name: personajeActual[0].name,
    gender: personajeActual[0].gender,
    normalized_name: personajeActual[0].normalized_name,
  };
  seleccionarPersonaje(personaje);
}
}

const obtenerData=()=>{
  axios.get("https://api.sampleapis.com/simpsons/characters").then(response=>{
    //console.log(response.data);
    setPersonajes(response.data);
    setData(response.data);
  })
}

useEffect(()=>{
obtenerData();
}, []);

  return (
    <div className="App">
     <Autosuggest 
      suggestions={personajes}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      onSuggestionSelected={eventEnter}
     />
     <br />
     <button className='btn btn-primary' onClick={()=>console.log(personajeSeleccionado)}>Checar Estado</button>
    </div>
  );
}

export default App;
