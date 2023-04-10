import { decrementPage, incrementPage } from '../../redux/reducer/characterReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import './paginacion.css';

/**
 * Componente que contiene los botones para paginar
 * 
 * Deberás agregar las propiedades necesarias para que funcione correctamente
 * 
 * 
 * @returns un JSX element 
 */
const Paginacion = () => {

    const {data} = useAppSelector(state => state.character)
    const dispatch = useAppDispatch();
    
    const onClickPrevious = () : object => dispatch(decrementPage()) 
    const onClickNext = () : object => dispatch(incrementPage())


    return  <div className="paginacion">
                <button onClick={onClickPrevious} disabled={data?.info.prev === null ? true: false} className={"primary"}>Anterior</button>
                <button onClick={onClickNext}disabled={data?.info.next  === null ? true : false} className={"primary"}>Siguiente</button>
            </div>
}

export default Paginacion;