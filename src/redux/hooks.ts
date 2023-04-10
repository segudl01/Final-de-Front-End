import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { AppDispatch, RootState } from './store'
import { Character, Characters, Episode } from '../types/characterAndEpisodesType';
import axios from "axios";

const API_CHARACTRER = "https://rickandmortyapi.com/api/character/";
const API_EPISODE = "https://rickandmortyapi.com/api/episode/";

export const useGetAllCharacters = async (name: string,page: number) : Promise<Characters> => {
    const {data} = await axios.get(`${API_CHARACTRER}?page=${page}&name=${name}`)
    return data;
}

export const useGetCharacterById = async (id : number) : Promise<Character> =>{
    const {data} = await axios.get(`${API_CHARACTRER}${id}`)
    return data;
}

export const useGetEpisodesByCharacter = async (idArray : (string[] | number)) : Promise<Episode[]> =>{
    const {data} = await axios.get(API_EPISODE + idArray)
    return data;
    
}

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector