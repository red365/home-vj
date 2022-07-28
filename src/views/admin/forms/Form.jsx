import React, { Component } from 'react';

class Form extends Component {

    state = {}
  
    handleFormSubmit(url, formParams) {
      return fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(formParams)
      }).then(res => res.json());
    }
  
    handleInput = (e) => {
      this.setState({ [e.target.id]: e.target.value })
    
  };

    lastItemInArray = arr => arr[arr.length - 1];

  }

  export default Form;