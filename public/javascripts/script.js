// script.js

"use strict";

class Model {
  constructor() {
    this.contacts;
    this.getAllContacts();
    // this.getAllContacts().then(data => this.contacts = data);
  }

  // async getAllContacts() {
  //   await fetch('http://localhost:3000/api/contacts')
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       this.contacts = data;
  //     })
  //     .catch((error) => {
  //       console.log('Error! Something went wrong...');
  //       console.error(error);
  //     });
  // }

  async getAllContacts() {
    try {
      const endpointUrl = 'http://localhost:3000/api/contacts';
      const response = await fetch(endpointUrl);
      const json = await response.json();
      this.contacts = json;
      return json;
    } catch (error) {
      console.log('Error! Something went wrong...');
      console.error(error);
    }
  }
}


class View {
  constructor() {}
}

class Controller {
  constructor(model = new Model(), view = new View()) {
    this.model = model;
    this.view = view;
  }
}

const app = new Controller();
