// script.js

"use strict";

class Model {
  constructor() {
    this.contacts;
    this.getAllContacts();
  }

  async getAllContacts() {
    await fetch('http://localhost:3000/api/contacts', { method: 'GET' })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.contacts = data;
      })
      .catch((error) => {
        console.log('Error! Something went wrong...');
        console.error(error);
      });
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
