
import './App.css';
import searchIcon from './Assets/search.png';
import clearIcon from './Assets/clear.png';
import cloudIcon from './Assets/cloud.png';
import rainIcon from './Assets/rain.png';
import snowIcon from './Assets/snow.png';
import windIcon from './Assets/wind.png';
import drizzleIcon from './Assets/drizzle.png';
import humidityIcon from './Assets/humidity.png';
import { useState ,useEffect} from 'react';


const WeatherDetails = ({icon ,temp ,city,country,lat,lon,humidity,wind}) => {
  
  return (
   <>
   <div className='image'>
     <img src={icon} alt='image'/>
   </div>

   <div className="temp">
     {temp}°C
   </div>

   <div className="city">
    {city}
   </div>

   <div className="country">
    {country}
   </div>

   <div className="coordinates">
      <div >
    <span className='lat'>Lattitutde</span>
    <span>{lat}</span>
      </div>
    
      <div >
    <span className='lon'>Longtitude</span>
    <span>{lon}</span>
       </div>
   
   </div>

    <div className="data-container">
       <div className="element">
         <img src={humidityIcon} alt='humidity' className='icon '/>

         <div className="data">
    <div className="humidity-percent">{humidity} %</div>
    <div className="text">Humidity</div>
   </div>
       </div>

       <div className="element">
         <img src={windIcon} alt='humidity' className='icon '/>

         <div className="data">
    <div className="wind-percent">{wind} Km/h</div>
    <div className="text">Wind Speed</div>
   </div>
       </div>


  

    </div>
   </>
  )
}


function App() {

 let apiKey ='1304fafe3aeff49e56f0ac9c18d9fc7b';

  const [icon ,setIcon] = useState(snowIcon);
  const [temp ,setTemp] = useState(0);
  const [city ,setCity] = useState('');
  const [country ,setCountry] = useState('');
  const [lat ,setLat] = useState(0);
  const [lon ,setLon] = useState(0);
  const [humidity ,setHumidity] = useState(0);
  const [wind ,setWind] = useState(0);
  //
  const [text,setText]=useState('chennai');
  //
  const [cityNotFound ,setCityNotFound] = useState(false);
  const [loading ,setLoading] = useState(false);
  const [error,setError] =useState(null)
  //

  const weatherIconMap ={
    "01d":clearIcon,
    "01n":clearIcon,

     '02d':cloudIcon,
     '02n':cloudIcon,

     '03d':drizzleIcon,
     '03n':drizzleIcon,

     '04d':drizzleIcon,
     '04n':drizzleIcon,

     '09d':rainIcon,
     '09n':rainIcon,

     '10d':rainIcon,
     '10n':rainIcon,

     '13d':snowIcon,
     '13n':snowIcon,
  };


  const Search = async ()=>{
  
        setLoading(true); 
      let url =`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`;

      
      try {
        let res =await fetch(url);
        let data =await res.json();
        console.log(data);

        if(data.cod === '404'){
          console.log('city not found');
          setError('an error occured while fetching the data')
          setCityNotFound(true);
          setLoading(false);
          return;
        }
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        setLat(data.coord.lat);
        setLon(data.coord.lon);
        setTemp(Math.floor(data.main.temp));
        setCity(data.name);
        setCountry(data.sys.country)
        setError(null)

       const weatherIconCode = data.weather[0].icon;
       setIcon(weatherIconMap[weatherIconCode] || clearIcon );
       setCityNotFound(false)
        

      } catch (error) {
        console.log('an error occured ',error.message);
      }finally{
        setLoading(false);
      }
    }

   const handleCity = (e)=>{
    setText(e.target.value)
   }
    
   const handleKeyDown=(e)=>{
     if(e.key === 'Enter'){
      Search();
     }
   }
  useEffect(()=>{
    Search()
  },[])
  return(
  <> 
  
  <div className='container'>
    <div className='input-container'>
        <input  type='text'
        placeholder='search city..'
        className='city-input'
        onChange={handleCity}
        value={text}
        onKeyDown={handleKeyDown}/>

      <div className="search-icon" onClick={()=>Search()}>
        <img src={searchIcon} alt='search'/>
    </div>  
    </div>


     { loading && <div className="loading-message"> Loading...</div>}
    { error && <div className="error-message">{error}</div>}
    { cityNotFound && <div className="city-not-found"> City Not Foud</div>}
    
      
  { !loading  &&  !cityNotFound && <WeatherDetails  icon={icon} temp={temp} city={city}
     country={country} lat={lat} lon={lon} humidity={humidity} wind={wind}/>}

    <div className="copy-right">
      <p>Designed By <span>Deva s</span></p>
    </div>

  </div>
  </>
    
  )
 

}

export default App;
