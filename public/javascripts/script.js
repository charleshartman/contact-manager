// script.js

"use strict";

class Model {
  constructor() {
    this.contacts = [];
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

  async updateContact(id, queryString) {
    try {
      const endpointUrl = 'http://localhost:3000/api/contacts/' + String(id);
      const requestParams =
        { method: 'PUT',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: queryString
        };
      const response = await fetch(endpointUrl, requestParams);
      if (response.ok) {
        console.log('Contact updated successfully');
        await this.getAllContacts();
        this._commit(this.contacts);
        return response;
      } else {
        console.log(response.status);
        console.log('Contact not found');
      }
    } catch (error) {
      console.log('Error, details below.');
      console.error(error);
    }
  }

  searchName(searchQuery) {
    let result = this.contacts.filter((contact) => {
      return contact.full_name.toLowerCase().includes(searchQuery);
    });
    let message = `No matches found for <strong>${searchQuery}</strong>.`;
    this._commit(result, message);
  }

  bindContactListChanged(callback) {
    this.onContactListChanged = callback;
  }

  _commit(contacts, message) {
    this.onContactListChanged(contacts, message);
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
    this.addContactButton = this.createElement('button');
    this.addContactButton.textContent = 'Add Contact';

    // display entire list or filtered list
    this.contactList = this.createElement('ul', 'contactList');

    // add contact form
    this.addContactForm = this.createElement('form');
    this.addContactForm.classList.add('hide');

    this.labelName = this.createElement('label');
    this.labelName.setAttribute('for', 'name');
    this.labelName.textContent = 'Full name:';
    this.inputName = this.createElement('input');
    this.inputName.name = 'full_name';
    this.inputName.type = 'text';
    this.inputName.setAttribute('required', '');

    this.labelEmail = this.createElement('label');
    this.labelEmail.setAttribute('for', 'email');
    this.labelEmail.textContent = 'Email address:';
    this.inputEmail = this.createElement('input');
    this.inputEmail.name = 'email';
    this.inputEmail.type = 'text';
    this.inputEmail.setAttribute('required', '');

    this.labelPhone = this.createElement('label');
    this.labelPhone.setAttribute('for', 'phone');
    this.labelPhone.textContent = 'Telephone number:';
    this.inputPhone = this.createElement('input');
    this.inputPhone.name = 'phone_number';
    this.inputPhone.type = 'text';
    this.inputPhone.setAttribute('required', '');

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

    this.addContactForm.append(this.labelName, this.inputName, this.labelEmail,
      this.inputEmail, this.labelPhone, this.inputPhone, this.labelTags,
      this.inputTags, this.submitButton, this.cancelButton);

    // edit contact form
    this.editContactForm = this.createElement('form');
    this.editContactForm.classList.add('hide');

    this.labelName2 = this.createElement('label');
    this.labelName2.setAttribute('for', 'name');
    this.labelName2.textContent = 'Full name:';
    this.inputName2 = this.createElement('input');
    this.inputName2.name = 'full_name';
    this.inputName2.type = 'text';
    this.inputName2.setAttribute('required', '');

    this.labelEmail2 = this.createElement('label');
    this.labelEmail2.setAttribute('for', 'email');
    this.labelEmail2.textContent = 'Email address:';
    this.inputEmail2 = this.createElement('input');
    this.inputEmail2.name = 'email';
    this.inputEmail2.type = 'text';
    this.inputEmail2.setAttribute('required', '');

    this.labelPhone2 = this.createElement('label');
    this.labelPhone2.setAttribute('for', 'phone');
    this.labelPhone2.textContent = 'Telephone number:';
    this.inputPhone2 = this.createElement('input');
    this.inputPhone2.name = 'phone_number';
    this.inputPhone2.type = 'text';
    this.inputPhone2.setAttribute('required', '');

    this.labelTags2 = this.createElement('label');
    this.labelTags2.setAttribute('for', 'tags');
    this.labelTags2.textContent = 'Tags:';
    this.inputTags2 = this.createElement('input');
    this.inputTags2.name = 'tags';
    this.inputTags2.type = 'text';

    this.submitButton2 = this.createElement('button');
    this.submitButton2.textContent = 'Submit';

    this.cancelButton2 = this.createElement('button');
    this.cancelButton2.textContent = 'Cancel';

    this.editContactForm.append(this.labelName2, this.inputName2,
      this.labelEmail2, this.inputEmail2, this.labelPhone2, this.inputPhone2,
      this.labelTags2, this.inputTags2, this.submitButton2, this.cancelButton2);

    // append all the things
    this.app.append(this.title, this.search, this.addContactButton,
      this.contactList, this.addContactForm, this.editContactForm);

    this.addContactForm.id = 'addForm';
    this.editContactForm.id = 'editForm';

    this.contactTemplate = this.getElement('#contactTemplate').innerHTML;
    this.contactTemplateFunc = window.Handlebars.compile(this.contactTemplate);

    // initialize some general UI listeners
    this._initLocalListeners();

    // property to hold id set by edit listener, needed by edit submit listener
    this.currentId;
  }

  _initLocalListeners() {
    this.addContactButton.addEventListener('click', event => {
      event.preventDefault();
      this.toggleAddForm();
    });

    this.cancelButton.addEventListener('click', event => {
      event.preventDefault();
      this.toggleAddForm();
    });

    this.cancelButton2.addEventListener('click', event => {
      event.preventDefault();
      this.toggleEditForm();
    });
  }

  displayContacts(contacts, message = 'There are no contacts. Add some!') {
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
      let li = this.createElement('li');
      li.innerHTML = message;
      this.contactList.appendChild(li);
    }
  }

  // Toggle form and contact visibility
  toggleAddForm() {
    this.addContactForm.classList.toggle('hide');
    this.contactList.classList.toggle('hide');
    this.search.classList.toggle('hide');
    this.addContactButton.classList.toggle('hide');
  }

  // Toggle form and contact visibility
  toggleEditForm() {
    this.editContactForm.classList.toggle('hide');
    this.contactList.classList.toggle('hide');
    this.search.classList.toggle('hide');
    this.addContactButton.classList.toggle('hide');
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

  _resetAddFormInputs() {
    this.inputName.value = '';
    this.inputEmail.value = '';
    this.inputPhone.value = '';
    this.inputTags.value = '';
  }

  _resetEditFormInputs() {
    this.inputName2.value = '';
    this.inputEmail2.value = '';
    this.inputPhone2.value = '';
    this.inputTags2.value = '';
  }

  bindSearchName(handler) {
    this.search.addEventListener('keyup', event => {
      let searchQuery = (event.target.value).toLowerCase();

      handler(searchQuery);
    });
  }

  bindAddContact(handler) {
    this.addContactForm.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const queryString = new URLSearchParams(formData).toString();

      handler(queryString);
      this._resetAddFormInputs();
      this.toggleAddForm();
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
        this.currentId = parseInt(event.target.parentElement.id, 10);

        const existingName = event.target.parentElement.querySelector('h3');
        const existingContent = event.target.parentElement.querySelectorAll('dd');
        this.inputName2.value = existingName.innerText;
        this.inputPhone2.value = existingContent[0].innerText;
        this.inputEmail2.value = existingContent[1].innerText;
        this.inputTags2.value = existingContent[2].innerText;
        this.toggleEditForm();
      }
    });

    this.editContactForm.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const queryString = new URLSearchParams(formData).toString();

      handler(this.currentId, queryString);
      this._resetEditFormInputs();
      this.toggleEditForm();
    });
  }
}

class Controller {
  constructor(model = new Model(), view = new View()) {
    this.model = model;
    this.view = view;

    // explicit bindings
    this.model.bindContactListChanged(this.onContactListChanged);
    this.view.bindSearchName(this.handleSearchName);
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

  onContactListChanged = (contacts, message) => {
    this.view.displayContacts(contacts, message);
  }

  handleSearchName = (searchQuery) => {
    this.model.searchName(searchQuery);
  }

  handleAddContact = (queryString) => {
    this.model.addAContact(queryString);
  }

  handleDeleteContact = (id) => {
    this.model.deleteContact(id);
  }

  handleEditContact = (id, queryString) => {
    this.model.updateContact(id, queryString);
  }
}

// eslint-disable-next-line no-unused-vars
const app = new Controller();
