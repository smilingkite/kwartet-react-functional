import './Player.css';
import { CSSTransitionGroup } from 'react-transition-group'

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
                <li key={i}  className={(kaart.hasChanged? "hasChanged ": "") + "kaart"}>{kaart.letter}{kaart.number}</li>
              )
            }
          </ul>
        </div>
        <div className="kwartettenlijst">

          {/* { 
            kwartet.length > 0 &&  */}
            <div>
              <p>Kwartetten</p>
              <CSSTransitionGroup
                component="ul" className="kwartetten"
                transitionName="example"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}>
                {
                  kwartet.map((kaart, i) =>
                    <li 
                    key={i} 
                    className={(kaart.hasChanged? "hasChanged ": "") + "kwartet"}
                    >{
                      kaart.letter
                      }
                    </li>
                  )
                }
              </CSSTransitionGroup>
            </div>
          {/* } */}
        </div>
        

      </div>
    );
  }
}

export default PlayerComponent;