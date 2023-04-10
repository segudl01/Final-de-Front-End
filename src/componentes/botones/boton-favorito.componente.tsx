import { addToFavorites, toggleFavorite } from '../../redux/reducer/characterReducer';
import { useAppDispatch } from '../../redux/hooks';
import { Character } from '../../types/characterAndEpisodesType';
import './boton-favorito.css';

/**
 * Boton que indica si un elemento es favorito o no, y da la posibilidad de marcarlo/desmarcarlo
 * 
 * Deberás tipar las propiedades si usas este componente
 * 
 * 
 * @returns un JSX element 
 */
interface Props {
    esFavorito : boolean,
    id: number,
    character: Character,
}
const BotonFavorito = ({esFavorito,id,character}: Props) => {
    
    const onClick = () : void => {
        dispatch(toggleFavorite(id))
        dispatch(addToFavorites(character))
    }

    const src = esFavorito ? "/imagenes/star-filled.png" : "/imagenes/star.png"
    const dispatch = useAppDispatch()

    return  <div className="boton-favorito" onClick={onClick} >
                <img src={src} alt={"favorito"} />
            </div>
}

export default BotonFavorito;