import './Interface.css';
var React = require('react');

const Interface = ({onNewCard=f=>f}) => {
  let _kaart;
  const submit = e => {
    e.preventDefault();
    onNewCard(_kaart.value);
    _kaart.value = '';
    _kaart.focus();
  };
  return (
    <div className="interface">
      {/* <span className="boodschap">{message}</span>
          */}
      <form onSubmit={submit}>
        <input ref={input => _kaart = input}
          type="text"
          placeholder="letter nummer" required />
        <button>vraag kaart</button>
      </form>
    </div>
  );
};

export default Interface;