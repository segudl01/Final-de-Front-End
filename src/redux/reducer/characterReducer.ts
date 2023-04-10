import { Character, Episode } from '../../types/characterAndEpisodesType';
import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'
import { Characters } from '../../types/characterAndEpisodesType'
import { useGetAllCharacters, useGetCharacterById,useGetEpisodesByCharacter  } from '../hooks'


interface initialType {
    data:Characters | null
    page: number
    name: string
    character :Character | null
    id : number
    favorites: Character[] 
    episodesByCharacter: Episode[] | Episode
}

const initialState: initialType = {
    data: null,
    page: 1,
    name: "",
    character: null,
    id: 0,
    favorites: [],
    episodesByCharacter: []
}

export const getCharacter = createAsyncThunk(
    'personajes',
    async (page: number) => {
        const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
        const parseRes = await res.json();
        return parseRes.results;
    }
);

export const getCharacterFiltrados = createAsyncThunk(
    'personajesFiltrados',
    async (name: string) => {
        const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
        const parseRes = await res.json();
        return parseRes.results;
    }
);

export const getPersonaje = createAsyncThunk(
    'personaje',
    async (id: number) => {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const parseRes = await res.json();
        return parseRes;
    }
);


export const getAllCharacters = createAsyncThunk(
    "characters/allCharacters",
    async({name, page} : {name: string, page: number})=>{
        const res = await useGetAllCharacters(name, page)
        return res;
    },
);

export const getCharacterById = createAsyncThunk(
    "characters/charactersByID",
    async (id: number)=>{
        const res = await useGetCharacterById(id);
        return res;
    }
);

export const getEpisodesByCharacter = createAsyncThunk(
    "characters/characterEpidoses",
    async (id: (string[] | number))=>{
        const res = await useGetEpisodesByCharacter(id)
        return res;
    }
)

const characterReducer = createSlice({
    name: 'characters',
    initialState,
    reducers:{
        incrementPage:(state) =>{
            state.page += 1
        },
        decrementPage:(state) =>{
            state.page -= 1
        },
        searchingValue:(state,action: PayloadAction<string>) =>{
            state.name = action.payload
        },
        idSetter:(state,action: PayloadAction<number>) =>{
            state.id = action.payload;
        },
        searchCharacter: (state, action) => {
            state.name = action.payload;
        },
        deleteSearch: (state) => {
            state.name = initialState.name;
        },
        toggleFavorite: (state, action: PayloadAction<number>) => {
            const character = state.data?.results.find((c) => c.id === action.payload);
            if (character) {
                character.esFavorito = !character.esFavorito;
            }
        },
        addToFavorites:(state, action : PayloadAction<Character>)=>{
            const character = state.data?.results.find((c) => c.id === action.payload.id);
            if (character) {
                const index = state.favorites.findIndex((c) => c.id === character.id);
                if (index !== -1) {
                    state.favorites.splice(index, 1);
                } else {
                    state.favorites.push(character);
                }
            }
        },
        deleteAllFavs:(state)=>{
            state.favorites = []
        },

    },
        extraReducers:(builder) => {
            builder
                .addCase(getAllCharacters.pending, state => {
                })
                .addCase(getAllCharacters.fulfilled, (state,action: PayloadAction<Characters>) => {
                    state.data = action.payload;
                })
                .addCase(getAllCharacters.rejected,(state) => {
                })
                .addCase(getCharacterById.pending, state =>{
                })
                .addCase(getCharacterById.fulfilled, (state,action : PayloadAction<Character>) =>{
                    state.character = action.payload;
                })
                .addCase(getCharacterById.rejected,(state) => {
                })
                .addCase(getEpisodesByCharacter.pending, state =>{
                })
                .addCase(getEpisodesByCharacter.fulfilled, (state,action : PayloadAction<Episode[] | Episode>) =>{;
                    state.episodesByCharacter = action.payload;
                })
                .addCase(getEpisodesByCharacter.rejected,(state) => {
                })
                .addCase(getPersonaje.pending, (state) => {
                    state.character = initialState.character;
                })
                .addCase(getPersonaje.fulfilled, (state, action) => {
                    state.character = action.payload;
                })
                .addCase(getPersonaje.rejected, (state) => {
                    state.character = initialState.character;
                })
                .addCase(getCharacterFiltrados.pending, (state) => {
                    state.character = initialState.character;
                })
                .addCase(getCharacterFiltrados.fulfilled, (state, action) => {
                    state.character = action.payload;
                })
                .addCase(getCharacterFiltrados.rejected, (state) => {
                    state.character = initialState.character;
                })
                .addCase(getCharacter.pending, (state) => {
                    state.character = initialState.character;
                })
                .addCase(getCharacter.fulfilled, (state, action) => {
                    state.character = action.payload;
                })
                .addCase(getCharacter.rejected, (state) => {
                    state.character = initialState.character;
                })

    },

})

export const {incrementPage,decrementPage,searchingValue,idSetter,toggleFavorite,addToFavorites,deleteAllFavs, searchCharacter, deleteSearch} = characterReducer.actions;

export default characterReducer.reducer;