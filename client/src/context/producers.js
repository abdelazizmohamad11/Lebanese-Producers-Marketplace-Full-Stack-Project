import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
export const ProducersContext = createContext({
  producers: null,
  getAllProducers: () => { },
  isLoading: true,
  locations: null,
  isLoadingLocations: true,
  bussinessCategories:null,
  isLoadingCategories:true
})


const ProducersProvider = (props) => {
  const [producers, setProducers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState(null);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);
  const [bussinessCategories, setBussinessCategories] = useState(null);
  const [isLoadingCategories, setIsLoadingCategries] = useState(true);


  axios.defaults.withCredentials = true;
  const getAllProducers = async () => {
    axios.get('http://localhost:8000/producers').then(
      res => {
        setProducers(res.data)
        setIsLoading(false);
      }
    ).catch(err => {
      console.log(err);
      return null
    })
  }

  const getUniqueLocations = async () => {
    axios.get('http://localhost:8000/producers/unique-locations').then(
      res => {
        setLocations(res.data.locations);
        setIsLoadingLocations(false);
      }
    ).catch(
      err => console.log(err)
    )
  }

  const getBussinessCategories=async()=>{
    axios.get('http://localhost:8000/producers/bussiness-categories').then(
      res=>{
        setBussinessCategories(res.data.bussinessCategories);
        setIsLoadingCategries(false);
      }
    ).catch(
     err=> console.log(err)
    )
  }

  useEffect(() => {
    getAllProducers();
    getUniqueLocations();
    getBussinessCategories()
  }, [])

  return <ProducersContext.Provider value={{ producers, isLoading ,locations,isLoadingLocations,bussinessCategories,isLoadingCategories}}>{props.children}</ProducersContext.Provider>
}

export default ProducersProvider