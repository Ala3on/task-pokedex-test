import React, {useMemo} from 'react';

import {
    PokemonListItemWrapper, 
    Sprite, 
    Name, 
    IdxNumber, 
    TypesWrapper, 
    TypeTag, 
    InfoWrapper, 
    SpriteWrapper 
} from './PokemonListItemStyle';


export type PokemonType = 'grass' 
| 'fire' 
| 'water' 
| 'bug' 
| 'normal' 
| 'poison'
| 'electric' 
| 'ground' 
| 'fairy' 
| 'fighting' 
| 'psychic' 
| 'rock' 
| 'ghost' 
| 'ice' 
| 'dragon' 
| 'flying' 
| 'steel';


interface PkmnList {
    id: number;
    name: string;
    sprite: string;
    types: {
        slot: number;
        type: {
            name: PokemonType;
            url: string;
        }
    }[];
}

const padNumber = (n: number) => {
    let number  = n.toString();

    while(number.length < 3) {
        number = "0" + number;
    }
    return number;
}

const PokemonList: React.FC<PkmnList> = (props) => {
    
    const types = useMemo(() => (
            props.types.map(t => <TypeTag typename={t.type.name} key={t.slot}>{t.type.name}</TypeTag>)
        ), [props.types]);
    return (
        <PokemonListItemWrapper typename={props.types[0].type.name} to={`/${props.id}`}>
            <InfoWrapper>
                <IdxNumber>#{padNumber(props.id)}</IdxNumber>
                <SpriteWrapper><Sprite src={props.sprite} alt='sprite'/></SpriteWrapper>
                
                <Name>{props.name}</Name>
            </InfoWrapper>
            
            <TypesWrapper>{types}</TypesWrapper>
        </PokemonListItemWrapper>);
};

export default PokemonList; 