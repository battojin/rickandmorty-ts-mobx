import React from 'react'
import { observer } from 'mobx-react-lite'

const Character = observer(({char, handleFavorites}: any) =>
        <div className="character">
            <div>
                <p>{char.name}</p>
                <p>{char.gender}</p>
                <p>{char.status}</p>
                <button type="button" onClick={() => handleFavorites(char)}>Add to Favs</button>
            </div>
            <img src={char.image} alt="character" />
        </div>
)

export default Character
