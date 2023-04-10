import Filtros from "../componentes/personajes/filtros.componente"
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente"
import Paginacion from "../componentes/paginacion/paginacion.componente";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { searchCharacter, deleteSearch, getCharacter, getCharacterFiltrados } from '../redux/reducer/characterReducer';

/**
 * Esta es la pagina principal. Aquí se debera ver el panel de filtros junto con la grilla de personajes.
 * 
 * Uso: 
 * ``` <PaginaInicio /> ```
 * 
 * @returns la pagina de inicio
 */
const PaginaInicio = () => {
    const {data} = useAppSelector(state => state.character);
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const value = useAppSelector(state => state.character.name);
    const [filtro, setFiltro] = useState<string>(value);

    useEffect(() => {
        dispatch(searchCharacter(filtro));
        dispatch(getCharacterFiltrados(filtro));
    }, [filtro]);

    const limpiarFiltro = () => {
        setFiltro('');
        dispatch(deleteSearch());
        inputRef?.current?.focus();
        dispatch(getCharacter(1));
    }

    return  <div className="container">
                <div className="actions">   
                    <h3>Catálogo de Personajes</h3>
                    <button className="danger" onClick={() => limpiarFiltro()}>Limpiar filtro</button>
                </div>
                <Filtros inputRef={inputRef} busqueda={(e: ChangeEvent<HTMLInputElement>) => setFiltro(e.target.value)} value={filtro}/>
                <Paginacion />
                <GrillaPersonajes />
                <Paginacion />
            </div>
}

export default PaginaInicio