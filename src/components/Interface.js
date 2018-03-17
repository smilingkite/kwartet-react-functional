import './Interface.css';
var React = require('react');

const Interface = ({onNewCard=f=>f}) => {
  let _kaart;
  const letters = ["A", "B", "C", "D", "E", "F", "G"]

  const submit = e => {
    e.preventDefault();
    let kaart = _kaart.letters.value + _kaart.cijfers.value
    onNewCard(kaart);
  };
  const handleChange = e => {
    _kaart[e.target.name]= e.target.value;
  };

  
  return (
    <div className="interface">
      <form onSubmit={submit}  ref={input => _kaart = input}>
        <div className="letters form">
        {letters.map((letter, i) =>
          <label key={i}>
            <input type="radio" name ="letters" value={letter} onChange={handleChange}/>
              {letter}
          </label>
        )}
        </div>
        <div className="cijfers form">
        { [1,2,3,4].map((cijfer, j) => 
          <label key={j*10}>
            <input type="radio" name="cijfers" value={cijfer} onChange={handleChange}/>
            {cijfer}
          </label>) 
        }
        </div>
        <button>vraag kaart</button>
      </form>
    </div>
  );
};

export default Interface;