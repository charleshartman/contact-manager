// script.js

"use strict";

class Model {
  constructor() {
    this.contacts = [];
    this.selectedContact;
    this.getAllContacts();
  }

  async getAllContacts() {
    try {
      const endpointUrl = 'http://localhost:3000/api/contacts';
      const requestParams = { method: 'GET' };
      const response = await fetch(endpointUrl, requestParams);
      const json = await response.json();
      this.contacts = json;
      return json;
    } catch (error) {
      console.log('Error! Something went wrong...');
      console.error(error);
    }
  }

  async addAContact(contactObj) {
    try {
      const endpointUrl = 'http://localhost:3000/api/contacts/';
      const requestParams =
        { method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactObj) };
      const response = await fetch(endpointUrl, requestParams);
      if (response.ok) {
        console.log(response.json());
        console.log('Contact added successfully');
        this.getAllContacts();
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log('Error! Something went wrong...');
      console.error(error);
    }
  }

  async deleteContact(id) {
    try {
      const endpointUrl = 'http://localhost:3000/api/contacts/' + String(id);
      const requestParams = { method: 'DELETE' };
      const response = await fetch(endpointUrl, requestParams);
      await response.text();
      if (response.ok) {
        console.log('Contact deleted');
        this.getAllContacts();
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log('Error! Something went wrong...');
      console.error(error);
    }
  }

  async getContact(id) {
    try {
      const endpointUrl = 'http://localhost:3000/api/contacts/' + String(id);
      const requestParams = { method: 'GET' };
      const response = await fetch(endpointUrl, requestParams);
      if (response.ok) {
        const json = await response.json();
        console.log('Contact retrieved');
        this.selectedContact = json;
        console.log(this.selectedContact);
        console.log(json);
      } else {
        console.log(response.status);
        console.log('Contact not found');
      }
    } catch (error) {
      console.log('Error! Something went wrong...');
      console.error(error);
    }
  }

  async updateContact(contactObj) {
    try {
      const endpointUrl = 'http://localhost:3000/api/contacts/' + String(contactObj.id);
      const requestParams =
        { method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactObj) };
      const response = await fetch(endpointUrl, requestParams);
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        console.log('Contact updated successfully');
        this.getAllContacts();
      } else {
        console.log(response.status);
        console.log('Contact not found');
      }
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

// eslint-disable-next-line no-unused-vars
const app = new Controller();

/*
{ full_name: 'Charles Hartman', email: 'charles@hartman.dev', phone_number: '503-222-1212', tags: 'work,cycling' }
*/

