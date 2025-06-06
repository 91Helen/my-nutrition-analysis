import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { Nutrition } from "./Nutrition";
import { LoaderPage} from './LoaderPage'

function App() {

// https://api.edamam.com/api/nutrition-details?app_id=c88d00ad&app_key=bd4ca7750fa581697a0b0a4e0bbc9219
 const [mySearch, setMySearch] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [myNutrition, setMyNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false);
const App_Id = 'c88d00ad';
const App_key = 'bd4ca7750fa581697a0b0a4e0bbc9219';
const App_URL ='https://api.edamam.com/api/nutrition-details';


  const fetchData = async (ingr) => {
  setStateLoader(true);
    const response = await fetch (`${App_URL}?app_id=${App_Id}&app_key=${App_key}`,{
 
      method:"POST",
      headers:{
        'Accept':"application/json",
        'Content-Type': "application/json",
      },
      body:JSON.stringify({ingr:ingr})

    })
    

 if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      console.log(data)
      setMyNutrition(data);
    } else {
      setStateLoader(false);
      alert('ingredients entered incorrectly');
    }
  }

  const myRecipeSearch = e => {
    setMySearch(e.target.value);
  }

  const finalSearch = e => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  useEffect(() => {
    if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  }, [wordSubmitted])


  return (
    <div>
      {stateLoader && <LoaderPage />}

      <h1>Nutrition Analysis</h1>
      <form onSubmit={finalSearch}>
        <input
          placeholder="Search..."
          onChange={myRecipeSearch}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {
          myNutrition && <p>{myNutrition.calories} kcal</p>
        }
        {
          myNutrition && Object.values(myNutrition.totalNutrients)
            .map(({ label, quantity, unit }) =>
              <Nutrition
                label={label}
                quantity={quantity}
                unit={unit}
              />
            )
        }
      </div>
    </div>
  );
}

export default App;
