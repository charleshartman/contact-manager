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
      console.log('Error, details below.');
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
      console.log('Error, details below.');
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
      console.log('Error, details below.');
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
        return json;
      } else {
        console.log(response.status);
        console.log('Contact not found');
      }
    } catch (error) {
      console.log('Error, details below.');
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
      console.log('Error, details below.');
      console.error(error);
    }
  }
}


class View {
  constructor() {
    // root element container div
    this.app = this.getElement('#root');

    // title of app - h1
    this.title = this.createElement('h1');
    this.title.textContent = 'Contact Manager';

    // search input field (no button, live search)
    // one field to search full name OR tag name
    this.search = this.createElement('input', 'search');
    this.search.type = 'text';
    this.search.placeholder = 'Search';

    // add contact button, will show/hide contact form
    this.upperAddContactButton = this.createElement('button');
    this.upperAddContactButton.textContent = 'Add Contact';

    // display entire list or filtered list
    this.contactList = this.createElement('ul', 'contactList');

    // add or edit form
    this.form = this.createElement('form');

    this.labelName = this.createElement('label');
    this.labelName.setAttribute('for', 'name');
    this.labelName.textContent = 'Full name:';
    this.inputName = this.createElement('input');
    this.inputName.name = 'name';
    this.inputName.type = 'text';

    this.labelEmail = this.createElement('label');
    this.labelEmail.setAttribute('for', 'email');
    this.labelEmail.textContent = 'Email address:';
    this.inputEmail = this.createElement('input');
    this.inputEmail.name = 'email';
    this.inputEmail.type = 'text';

    this.labelPhone = this.createElement('label');
    this.labelPhone.setAttribute('for', 'phone');
    this.labelPhone.textContent = 'Telephone number:';
    this.inputPhone = this.createElement('input');
    this.inputPhone.name = 'phone';
    this.inputPhone.type = 'text';

    this.labelTags = this.createElement('label');
    this.labelTags.setAttribute('for', 'tags');
    this.labelTags.textContent = 'Tags:';
    this.inputTags = this.createElement('input');
    this.inputTags.name = 'tags';
    this.inputTags.type = 'text';

    this.submitButton = this.createElement('button');
    this.submitButton.textContent = 'Submit';

    this.cancelButton = this.createElement('button');
    this.cancelButton.textContent = 'Cancel';

    this.form.append(this.labelName, this.inputName, this.labelEmail, this.inputEmail,
      this.labelPhone, this.inputPhone, this.labelTags, this.inputTags,
      this.submitButton, this.cancelButton);

    this.app.append(this.title, this.search, this.upperAddContactButton,
      this.contactList, this.form);
  }

  // Create element with optional class
  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) {
      element.classList.add(className);
    }

    return element;
  }

  // Retrieve an element from the DOM
  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }
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

