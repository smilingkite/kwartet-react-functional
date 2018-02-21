import './Player.css';
var React = require('react');

class PlayerComponent extends React.Component{
  
  render(){
    const {name, hand, kwartet, turn} = this.props; 
    return (
      <div className={`speler ${turn}`}>
        <h2>{name}</h2>
        <div className="kaarten">
          <p>Kaarten</p>
          <ul className="hand">
            {
              hand.map((kaart, i) => 
                <li key={i}  className="kaart">{kaart.letter}{kaart.number}</li>
              )
            }
          </ul>
        </div>
        <div className="kwartettenlijst">

          { kwartet.length > 0 && 
            <div>
              <p>Kwartetten</p>
              <ul className="kwartetten">
                {
                  kwartet.map((kaart, i) =>
                    <li 
                    key={i} 
                    className="kwartet">{kaart.letter}</li>
                  )
                }
              </ul>
            </div>
          }
        </div>
        

      </div>
    );
  }
}

export default PlayerComponent;