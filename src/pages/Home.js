import React, { useEffect, useState } from "react";
import { Link,useNavigate,useLocation } from "react-router-dom";
import ThumbDetail from "../components/ThumbDetail";
import axios from "axios";


function Home() {
    const navigate = useNavigate()
    const location = useLocation()
    // console.log(location);
  const [countries, setCountries] = useState([]);
  const [mode, setMode] = useState(true);
  const [id,setId] = useState(null)
  const [toggleBtn, setToggleBtn] = useState(
    '<i class="far fa-sun"></i> Light Mode'
  );
  
  const redirect = (id)=>{
    setId(id)
    navigate('/details', {state: { test: id}})
  }
  const result = async () => {
    
    axios
      .get("https://restcountries.com/v2/all")
      .then((res) => {
        setCountries(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    result();
  }, []);



  const toggleDarkMode = () => {
    if (mode) {
      document.documentElement.classList.add("dark");
      setToggleBtn('<i class="fas fa-moon"></i> Dark Mode');
      setMode((current) => (current = !current));
    }
    if (!mode) {
      document.documentElement.classList.remove("dark");
      setToggleBtn('<i class="far fa-sun"></i> Light Mode');
      setMode((current) => (current = !current));
    }
  };
/*filter operation based on region */
  const filterByRegion = async (region) => {
    if (region === "") return;
    const res = await axios(`https://restcountries.com/v2/region/${region}`);
    await setCountries(res.data);
  };


  /*optimizing search functionality using debouncing */
  function myDebounce(call,d){
    let timer;
    return function(...args){
        if(timer) clearTimeout(timer);
        setTimeout(() => {
          call()
        },d)
    }
  }
//   const searchFunction=myDebounce(searchCountry,1000)

  /*search operation based on country name */
  const searchCountry = async (name) => {
    myDebounce(myDebounce,2000);
    if (name.length < 3 || name === "") return;
    const res = await axios(`https://restcountries.com/v2/name/${name}`);
    await setCountries(res.data);
  };
  return (
    <div className="bg-gray-100 dark:bg-gray-800 dark:text-white">
      <div className="w-screen shadow-md py-6 px-3 bg-white dark:bg-gray-700 dark:text-white mb-16">
        <div className="flex container mx-auto">
          <h1 className="font-bold text-xl">CypertsDigital</h1>
          <div className="ml-auto font-medium">
            <button
              onClick={() => toggleDarkMode()}
              dangerouslySetInnerHTML={{ __html: toggleBtn }}
            ></button>
          </div>
        </div>
      </div>
      <div className="flex container mx-auto mb-16">
        <i className="fa fa-search my-auto -mr-9 z-10 pr-2 pl-3 py-5 rounded-md text-gray-400"></i>
        <input
          type="text"
          placeholder="Search for a country..."
          className="pl-10 p-2 shadow-md rounded-md w-1/3 dark:bg-gray-700"
          onChange={(name) => searchCountry(name.target.value)}
        />
        <select
          className="ml-auto my-2 p-2 shadow-md rounded-md font-medium dark:bg-gray-700"
          onChange={(val) => filterByRegion(val.target.value)}
        >
          <option value="">Filter by Region</option>
          <option value="africa">Africa</option>
          <option value="americas">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
      <div className="container grid grid-cols-4 gap-16 mx-auto" >
        {countries.length>0? countries.map((country, index) => (
           <div key={index}>
            <ThumbDetail
              onClick={()=>redirect(country)}
              title={country.name}
              id={id}
              image_url={country.flag}
              population={country.population}
              region={country.region}
              capital={country.capital}
            />
           </div>
        
        )):                   
        <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
  <div class="animate-pulse flex space-x-4">
    <div class="rounded-full bg-slate-200 h-10 w-10"></div>
    <div class="flex-1 space-y-6 py-1">
      <div class="h-2 bg-slate-200 rounded"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="h-2 bg-slate-200 rounded col-span-2"></div>
          <div class="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
        <div class="h-2 bg-slate-200 rounded"></div>
      </div>
    </div>
  </div>
  loading
</div>
        
        }
      </div>
    </div>
  );
}

export default Home;
