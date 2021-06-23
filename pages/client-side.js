import {useState, useEffect} from 'react'
import axios from 'axios'

const url ="https://pokeapi.co/api/v2/pokemon?limit=151"
const clientside =  () => {
    const[pokemon,setPokemon]=useState([])
useEffect(()=>{
    const fetchPokemon = async() =>{
        const response= await axios.get(url)
        // console.log(response)
        // const promises = []
        // response.data.results.forEach(element => {
        //     promises.push(axios.get(element.url)) 
        // });
        const promesis = response.data.results.map((result) =>{
            return axios.get(result.url)
        })
        const responses = await Promise.all(promesis)
        const pokrData = responses.map((r)=>{
            return {
                name:r.data.name,
                imgUlr:r.data.sprites.front_default,
            }
        })
        // console.log(pokrData)
        setPokemon(pokrData)
    }
    fetchPokemon()
},[])
    console.log(pokemon)
    return pokemon.map((poke)=>{
        return (
            <div key={poke.name}>
           <p>{poke.name}</p>
           <img src={poke.imgUlr} />
           <hr />
            </div>
          )
    })
    
  
}

export default clientside
