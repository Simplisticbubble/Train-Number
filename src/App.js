
import './App.css';
import { useState } from 'react';

const stations = ["Leppington", "Edmondson Park", "Glenfield", "Casula", "Liverpool", "Warwick Farm", "Cabramatta", "Canley Vale", "Fairfield", "Yennora", "Guildford", "Merrylands", "Granville", "Clyde", "Auburn", "Lidcombe", "Flemington", "Homebush", "Strathfield", "Burwood", "Redfern", "Central", "Town Hall", "Wynyard", "Circular Quay", "St James", "Museum", "Kings Cross", "Edgecliff", "Bondi Junction"];

function App() {
  const [Index, setIndex] = useState(0);
  const handleIndex = () => {
    setIndex((prevIndex) => prevIndex + 1);
  };

  const [divs, setDivs] = useState(new Map([
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
  ]));

  const [topDiv, setTopDiv] = useState([]);
  const [currOp, setCurrOp] = useState('+');
  const [WL, setWL] = useState('');

  const handleDivClick = (index) => {
    const newDivs = new Map(divs);
    const clickedValue = newDivs.get(index);
  
    if (clickedValue !== undefined) {
      newDivs.delete(index);
      setDivs(newDivs);
  
      setTopDiv((prevTopDiv) => {
        const updatedTopDiv = [...prevTopDiv, clickedValue];
        if (updatedTopDiv.length === 2) {
          console.log("performed Op");
          performOperation(updatedTopDiv, newDivs);
        }
        console.log(updatedTopDiv);
        return updatedTopDiv;
      });
    }
  };

  const handleOperatorClick = (op) => {
    setCurrOp(op);

    // If an operator is clicked, perform the operation immediately if two numbers are present
    if (topDiv.length === 2) {
      performOperation();
    }
  };

  const performOperation = (updatedTopDiv, newDivs) => {
    const num1 = updatedTopDiv[0];
    const num2 = updatedTopDiv[1];
    let result;

    switch (currOp) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        result = num1 / num2;
        break;
      default:
        break;
    }

    setTopDiv([result]);
    if (newDivs.size === 0 && result === 10) {
      setWL('Congratulations!');
      handleIndex();
      const newDivs = new Map([
        [0, Math.floor(Math.random() * 10)],
        [1, Math.floor(Math.random() * 10)],
        [2, Math.floor(Math.random() * 10)],
        [3, Math.floor(Math.random() * 10)],
      ]);
      console.log(newDivs);
      setDivs(newDivs);

      setTopDiv([]);
    }else if(newDivs.size === 0){
      setWL('Nice try ;((');
      handleIndex();
      const newDivs = new Map([
        [0, Math.floor(Math.random() * 10)],
        [1, Math.floor(Math.random() * 10)],
        [2, Math.floor(Math.random() * 10)],
        [3, Math.floor(Math.random() * 10)],
      ]);
      console.log(newDivs);
      setDivs(newDivs);
      setTopDiv([]);
    }
  };

  return (
    <div className="dynamic-divs">
      
      <div className="app__Station">
        <div className="app__Station-container">
          <h1 className="app__Station-name">{stations[Index]}</h1>
          <p className='app__Station-name'>next stop</p>
        </div>
      </div>
      

      <div className='display-Win'>{WL}</div>
      <div className="operations">
        <button onClick={() => handleOperatorClick('+')}>+</button>
        <button onClick={() => handleOperatorClick('-')}>-</button>
        <button onClick={() => handleOperatorClick('*')}>*</button>
        <button onClick={() => handleOperatorClick('/')}>/</button>
      </div>
      <div className='app__input'>
      {Array.from(divs.entries()).map(([index, value]) => (
        <div key={index} className="input_div" onClick={() => handleDivClick(index)}>
          {value}
        </div>
      ))}
      </div>

      <div className="top-divs">
        <h2>Current Operator:</h2>
        <div className="current-operation">{currOp}</div>
        <div className='output'>
        {topDiv.map((index, i) => (
          <div key={i} className="top-div">
            {index}
          </div>
        ))}
        </div>
      </div>




    </div>
    


  );
  
}

export default App;


{/*function App() {
  return (
    <div>
      <Station/>
      <Train/>
      <Calculator/>
    </div>
  );
}

export default App; */}
