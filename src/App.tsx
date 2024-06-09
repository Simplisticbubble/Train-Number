import React, { useState } from 'react';
import './App.css';


const stations: string[] = [
  "Leppington", "Edmondson Park", "Glenfield", "Casula", "Liverpool",
  "Warwick Farm", "Cabramatta", "Canley Vale", "Fairfield", "Yennora",
  "Guildford", "Merrylands", "Granville", "Clyde", "Auburn", "Lidcombe",
  "Flemington", "Homebush", "Strathfield", "Burwood", "Redfern", "Central",
  "Town Hall", "Wynyard", "Circular Quay", "St James", "Museum", "Kings Cross",
  "Edgecliff", "Bondi Junction"
];

const App: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [divs, setDivs] = useState<Map<number, number>>(new Map([
    [0, 1], [1, 2], [2, 3], [3, 4]
  ]));
  const [topDiv, setTopDiv] = useState<number[]>([]);
  const [currOp, setCurrOp] = useState<string>('+');
  const [wl, setWL] = useState<string>('');

  const handleIndex = () => {
    setIndex(prevIndex => prevIndex + 1);
  };

  const handleDivClick = (index: number) => {
    const newDivs = new Map(divs);
    const clickedValue = newDivs.get(index);

    if (clickedValue!== undefined) {
      newDivs.delete(index);
      setDivs(newDivs);

      setTopDiv(prevTopDiv => {
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

  const handleOperatorClick = (op: string) => {
    setCurrOp(op);

    if (topDiv.length === 2) {
      performOperation(topDiv, divs);
    }
  };

  const handleImpClick = () => {
    var num1 = divs.get(0);
    var num2 = divs.get(1);
    var num3 = divs.get(2);
    var num4 = divs.get(3);
    
    var operators = ['+', '-', '*', '/'];
    const permutations = [];
    for (const op1 of operators) {
      for (const op2 of operators) {
        for (const op3 of operators) {
          const expression = `${num1} ${op1} ${num2} ${op2} ${num3} ${op3} ${num4}`;
          permutations.push(expression);
        }
      }
    }
    permutations.forEach((expression) => {
      const result = eval(expression);
      if (result === 10) {
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
        return;
      }
    });
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
      return;
  };

  const performOperation = (updatedTopDiv: number[], newDivs: Map<number, number>) => {
    const num1 = updatedTopDiv[0];
    const num2 = updatedTopDiv[1];
    let result = 0;

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
          <h1 className="app__Station-name">{stations[index]}</h1>
          <p className='app__Station-name'>next stop</p>
        </div>
      </div>

      <div className='display-Win'>{wl}</div>
      <div className="operations">
        <button onClick={() => handleOperatorClick('+')}>+</button>
        <button onClick={() => handleOperatorClick('-')}>-</button>
        <button onClick={() => handleOperatorClick('*')}>*</button>
        <button onClick={() => handleOperatorClick('/')}>/</button>
        <button onClick={() => handleImpClick()}>Impossible</button>
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
          {topDiv.map((num, i) => (
            <div key={i} className="top-div">
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
