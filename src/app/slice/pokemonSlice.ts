import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';
import { act } from '@testing-library/react';


/* interface Pokemon {
      key: string;
      id: string;
      name: string;
      expTimestamp: number;
      retailer: {
          id: string;
          name: string;
          distance: number;
          priority: number;
          images: {
              xs: string
              sm: string
              md: string
              lg: string
          };
      };
} */

function encodeQueryData(params: any) {
  const ret = [];
  for (let p in params) {
    ret.push('?' + encodeURIComponent(p) + '=' + encodeURIComponent(params[p]));
  }
  return ret.join('&');
}

export interface pokedexState {
    pokemon: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    searchText: string;
    nextUrl: string;
}

const initialState: pokedexState = {
    pokemon: [],
    status: 'idle',
    searchText: '',
    nextUrl: ''
};


const fetchPokemonDetails = async (pokemonData: any) => {
    const pokemon = await Promise.all(
        pokemonData.map( async (pokemon: { url: string; }) => {
            let poke = await axios.get(pokemon.url);
            return poke.data;
        })
    )
    return pokemon;
};

export const fetchAllPokemon = createAsyncThunk(
  'leaflets/fetchPokemon',
  async (params: any) => {
    const query=encodeQueryData(params);
    const url = `https://pokeapi.co/api/v2/pokemon${query}`;
    // const url = params;
    const response = await axios.get(url);
    const nextUrl = response.data.next
    const pokemon = await fetchPokemonDetails(response.data.results)
    return { pokemon, nextUrl};
  }
);

export const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {
    onSearchInputChange: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPokemon.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllPokemon.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pokemon = action.payload.pokemon;
        state.nextUrl = action.payload.nextUrl;
      })
      .addCase(fetchAllPokemon.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const pokemonSelector = (state: RootState) => state.pokedex.pokemon;

export const { onSearchInputChange } = pokedexSlice.actions;

export default pokedexSlice.reducer;
