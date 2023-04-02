import { useState, useEffect } from 'react';

const useFavorites = () => {
    const [favorites, setFavorites] = useState(null);

    const verifyFavorite = (id) =>{
        const stringId = id.toString()
        let isFavorite = false
        if(favorites){
            if(favorites.includes(stringId)){
                isFavorite = true;
            }
        }
        return isFavorite
    }

    const addFavorite = (id) =>{
        const stringId = id.toString()
        if(favorites){
            if(!favorites.includes(stringId)){
                setFavorites([...favorites, stringId])
            }
        }else{
            setFavorites([stringId])
        }
    }

    const removeFavorite = (id) =>{
        const stringId = id.toString()
        if(favorites){
            if(favorites.includes(stringId)){
                const filteredArray = favorites.filter((fav)=> fav !== stringId)
                setFavorites(filteredArray)
            }
        }
    }

    useEffect(() => {
        const item = localStorage.getItem('favorites')
        if (item) {
            setFavorites(item.split(","))
        }
      }, [])

      useEffect(() => {
        if(favorites && favorites.length > 0){
            localStorage.setItem("favorites", favorites)
        }
      }, [favorites])


    return [favorites, verifyFavorite, addFavorite, removeFavorite];
};

export default useFavorites;