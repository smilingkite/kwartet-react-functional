import './Interface.css';
import letters from '../data/letters'
var React = require('react');

const Interface = ({onNewCard=f=>f}) => {
  let _kaart;

  const submit = e => {
    e.preventDefault();
    let kaart = {}
    kaart.letter = _kaart.letters.value;
    kaart.number = parseInt(_kaart.cijfers.value, 10);
    onNewCard(kaart);
    e.target.reset();
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