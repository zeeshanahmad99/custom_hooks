const states = [];
let callCount = -1;

function useState(initialValue) {
  const id = ++callCount;

  if (states[id]) {
    return states[id];
  }

  const setValue = (newValue) => {
    states[id][0] = newValue;
    renderPhonyHooks();
  };

  const tuple = [initialValue, setValue];
  states.push(tuple);
  return tuple;
}

function renderPhonyHooks() {
  callCount = -1; // reset index
  ReactDOM.render(<Minutes />, document.getElementById('root'));
}

renderPhonyHooks();
