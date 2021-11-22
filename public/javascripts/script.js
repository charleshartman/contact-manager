// script.js

"use strict";

class Model {
  constructor() {
    this.contacts = [];
    this.selectedContact;
    // this.getAllContacts();
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

  async addAContact(queryString) {
    try {
      const endpointUrl = 'http://localhost:3000/api/contacts/';
      const requestParams =
        { method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: queryString
        };
      const response = await fetch(endpointUrl, requestParams);
      if (response.ok) {
        console.log(response.json());
        console.log('Contact added successfully');
        await this.getAllContacts();
        this._commit(this.contacts);
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
        await this.getAllContacts();
        this._commit(this.contacts);
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

  bindContactListChanged(callback) {
    this.onContactListChanged = callback;
  }

  _commit(contacts) {
    this.onContactListChanged(contacts);
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
    this.search.placeholder = 'Search by name or tag';

    // add contact button, will show/hide contact form
    this.upperAddContactButton = this.createElement('button');
    this.upperAddContactButton.textContent = 'Add Contact';

    // display entire list or filtered list
    this.contactList = this.createElement('ul', 'contactList');

    // add or edit form
    this.form = this.createElement('form', 'createEditForm');
    this.form.classList.add('hide');

    this.labelName = this.createElement('label');
    this.labelName.setAttribute('for', 'name');
    this.labelName.textContent = 'Full name:';
    this.inputName = this.createElement('input');
    this.inputName.name = 'full_name';
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
    this.inputPhone.name = 'phone_number';
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

    // Add event listeners
    document.addEventListener('DOMContentLoaded', () => {
      this.upperAddContactButton.addEventListener('click', event => {
        event.preventDefault();
        this.toggleContactsForm();
      });

      this.cancelButton.addEventListener('click', event => {
        event.preventDefault();
        this.toggleContactsForm();
      });
    });

    this.contactTemplate = this.getElement('#contactTemplate').innerHTML;
    this.contactTemplateFunc = window.Handlebars.compile(this.contactTemplate);
  }

  displayContacts(contacts) {
    // Delete all nodes
    while (this.contactList.firstChild) {
      this.contactList.removeChild(this.contactList.firstChild);
    }

    // Display current list OR display empty list message
    if (contacts.length > 0) {
      contacts.forEach(contact => {
        let li = this.createElement('li');
        li.innerHTML = this.contactTemplateFunc(contact);
        this.contactList.appendChild(li);
      });
    } else {
      console.log('No contacts, add some.');
      let li = this.createElement('li');
      li.textContent = 'There are currently no contacts. Add some!';
      this.contactList.appendChild(li);
    }

    // console.log(contacts);
  }

  // Toggle form and contact visibility
  toggleContactsForm() {
    this.form.classList.toggle('hide');
    this.contactList.classList.toggle('hide');
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

  _resetFormInputs() {
    this.inputName.value = '';
    this.inputEmail.value = '';
    this.inputPhone.value = '';
    this.inputTags.value = '';
  }

  bindAddContact(handler) {
    this.form.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const queryString = new URLSearchParams(formData).toString();

      handler(queryString);
      this._resetFormInputs();
      this.toggleContactsForm();
    });
  }

  bindDeleteContact(handler) {
    this.contactList.addEventListener('click', event => {
      if (event.target.className === 'delete') {
        if (window.confirm("Do you want to delete the contact?")) {
          const id = parseInt(event.target.parentElement.id, 10);

          handler(id);
        }
      }
    });
  }

  bindEditContact(handler) {
    this.contactList.addEventListener('click', event => {
      if (event.target.className === 'edit') {
        const id = parseInt(event.target.parentElement.id, 10);
        console.log(event.target.parentElement);

        handler(id);
      }
    });
  }
}

class Controller {
  constructor(model = new Model(), view = new View()) {
    this.model = model;
    this.view = view;

    // explicit bindings
    this.model.bindContactListChanged(this.onContactListChanged);
    this.view.bindAddContact(this.handleAddContact);
    this.view.bindDeleteContact(this.handleDeleteContact);
    this.view.bindEditContact(this.handleEditContact);

    // initialize list and send to the View
    this.retrieveContactList();
  }

  async retrieveContactList() {
    await this.model.getAllContacts();
    this.onContactListChanged(this.model.contacts);
  }

  onContactListChanged = (contacts) => {
    this.view.displayContacts(contacts);
  }

  handleAddContact = (queryString) => {
    this.model.addAContact(queryString);
  }

  handleDeleteContact = (id) => {
    this.model.deleteContact(id);
  }

  handleEditContact = (id) => {
    this.model.getContact(id);
  }

}

// eslint-disable-next-line no-unused-vars
const app = new Controller();

/*
{ full_name: 'Charles Hartman', email: 'charles@hartman.dev', phone_number: '503-222-1212', tags: 'work,cycling' }
*/

