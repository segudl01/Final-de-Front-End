import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente";
import { deleteAllFavs } from "../redux/reducer/characterReducer";
import { useAppDispatch } from "../redux/hooks";

/**
 * Esta es la pagina de favoritos. Aquí se deberan ver todos los personajes marcados como favoritos
 * 
 * Uso: 
 * ``` <PaginaFavoritos /> ```
 * 
 * @returns la pagina de favoritos
 */
const PaginaFavoritos = () => {
    
    const dispatch = useAppDispatch();

    const onClick = () => {
        dispatch(deleteAllFavs())
    }

    return <div className="container">
        <div className="actions">
            <h3>Personajes Favoritos</h3>
            <button className="danger" onClick={onClick}>Eliminar Todos</button>
        </div>
        <GrillaPersonajes />
    </div>
}

export default PaginaFavoritos