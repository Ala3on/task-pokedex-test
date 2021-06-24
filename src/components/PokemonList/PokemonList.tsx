import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './../../app/hooks';
import { fetchAllPokemon, pokemonSelector } from './../../app/slice/pokemonSlice';
import InfiniteScroll from 'react-infinite-scroll-component';

import {PokemonListWrapper} from './PokemonListStyle';
import PokemonListItem from './PokemonListItem/PokemonListItem';

const PokemonList: React.FC = () => {
    const dispatch = useAppDispatch();
    const pokemon = useAppSelector(pokemonSelector);
    const [limitNumber, setLimitNumber] = useState(20);
    const [offset, setOffset] = useState(0);
    //const nextUrl = useAppSelector(state => state.pokedex.nextUrl);
    //const initialUrl = 'https://pokeapi.co/api/v2/pokemon';

    useEffect(()=>{
      dispatch(fetchAllPokemon({}))
    }, [dispatch, pokemon]);
    console.log(pokemon)

    const fetchPokemonInfiniteHandler = () => {
      dispatch(fetchAllPokemon({limit: limitNumber+20, offset: offset}));
      setLimitNumber(limitNumber+20);
      setOffset(offset+20);
    }
  
    const poke = pokemon.map(p => (
    <PokemonListItem
        key={p.id}
        id={p.id}
        name={p.name}
        sprite={p.sprites.front_default}
        types={p.types}
     />
    ));
    return (
      <PokemonListWrapper>
        <InfiniteScroll
          dataLength={poke.length}
          next={fetchPokemonInfiniteHandler}
          loader={<h4>Loading...</h4>}
          hasMore={true}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {poke}
        </InfiniteScroll>
      </PokemonListWrapper>
    );
};

export default PokemonList; 