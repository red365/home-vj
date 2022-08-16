export function handleFormSubmit(url, formParams) {
      return fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(formParams)
      }).then(res => res.json());
}
  
export function handleInput(e, stateUpdater, prevState) {
  stateUpdater({ ...prevState, [e.target.name]: e.target.value});
};

export function spawnNewInput(prevState, predicate, valueToAdd, stateUpdater) {
  if (predicate()) {
    const newState = [...prevState];
    newState.push(valueToAdd);
    stateUpdater(newState);
  }
}

export function moreThanOneSetOfInputsExists(arrOfInputs) {
  return arrOfInputs.length > 1;
}