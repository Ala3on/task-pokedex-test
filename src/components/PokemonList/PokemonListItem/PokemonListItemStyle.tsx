import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

import type { PokemonType } from './PokemonListItem'

interface TypeName {
    typename: PokemonType;
} 

const colorMap = {
    grass: '#78c850',
    fire: '#f08030',
    water: '#6890f0',
    bug: '#a8b820',
    normal: '#a8a878',
    poison: '#a040a0',
    electric: '#f8d030',
    ground: '#e0c068',
    fairy: '#ee99ac',
    fighting: '#c03028',
    psychic: '#f85888',
    rock: '#b8a038',
    ghost: '#705898',
    ice: '#98d8d8',
    dragon: '#7038f8',
    flying: '#A98FF3',
    steel: '#B7B7CE',
    dark: '#705746'
}


export const PokemonListItemWrapper = styled(NavLink)<TypeName>`
    display: flex;
    
    padding: 0 8px;
    margin: 8px;
    border: 3px solid rgb(97,97,97);
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    text-transform: capitalize;
    background-color: ${props => colorMap[props.typename]};


    &:hover,
    &:link,
    &:visited {
        text-decoration: none;
        color: unset;
    }
`;

// /////////////////////
//      INFO
// /////////////////////
export const InfoWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

export const SpriteWrapper = styled.div`
    @media (max-width: 500px) {
        width: 100%;
        order: -1;
    }
`;
export const Sprite = styled.img``;


export const Name = styled.h2`
    font-size: 20px;
    margin-left: 15px;
    @media (max-width: 500px) {
        margin: 0 3px; 
    }
`;
export const IdxNumber = styled.h3`
    @media (max-width: 500px) {
        margin: 0 3px;
    }
`;

// /////////////////////
//      TYPES
// /////////////////////

export const TypesWrapper = styled.div``;
export const TypeTag = styled.div<TypeName>`
    font-weight: 600;
    color: white;
    padding: 8px;
    background-color: ${props => colorMap[props.typename]};
    min-width: 82px;
    text-align: center;
    border-radius: 8px;
    margin: 3px;
    border: 2px solid white;
`;

