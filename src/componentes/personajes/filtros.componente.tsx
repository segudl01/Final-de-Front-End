import { useEffect, useRef, useState } from 'react';
import './filtros.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllCharacters, searchingValue } from '../../redux/reducer/characterReducer';


interface FiltrosProps {
    inputRef: React.RefObject<HTMLInputElement>;
    busqueda: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

/**
 * Filtro de personajes para la página de inicio
 * 
 * @returns {JSX.Element} Filtro de personajes
 */

const Filtros = ({inputRef, busqueda, value}:FiltrosProps): JSX.Element => {

    return <div className="filtros">
        <label htmlFor="nombre">Filtrar por nombre:</label>
        <input 
        type="text" 
        placeholder="Rick, Morty, Beth, Alien, ...etc" 
        name="nombre"
        value={value}
        onChange={busqueda}
        ref={inputRef}/>
    </div>
}

export default Filtros;