import React, { useState } from 'react';

function Favorites(props: any) {
    const [favorited, setFavorited] = useState(false);
    const [heart, setHeart] = useState('🤍');
    const notes = props.notes;
    const id = props.id;
    
    const handleClick = () => {
        if (favorited == false) {
            setFavorited(true);
            setHeart('❤️');
            notes.find((note: { id: any; }) => note.id == id).favorited = true;
        } 
        else {
            setFavorited(false);
            setHeart('🤍');
            notes.find((note: { id: any; }) => note.id == id).favorited = false;
        }
    }

    return (
        <div>
            <button className='favorite' onClick={handleClick}>{heart}</button>
        </div>
    );
}

export default Favorites;