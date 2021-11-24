# Contact Manager PEDAC & Other Notes

### Notes for Tag Search
- initially all tag li elements have an id of the tag name
- When tag is clicked:
  - class should change to `tagSet` (all li's start with class `tagUnset`)
  - something visible should occur (background color change, use class selector)
  - tag gets pushed to `selectedTag` array
  - event listener to initiate search in model and change of display fires

  ```js
  // View

  // add to constructor
  this.selectedTags = [];
  
  // add event listener
  bindSearchTags(handler) {
    this.tagList.addEventListener('click', event => {
      let target = event.target;
      if (target.classList.contains('tagSet')) {
        target.classList.remove('tagSet');
        target.classList.add('tagUnset')
        let location = this.selectedTags.indexOf(target.id);
        this.selectedTags.splice(location, 1);
        handler(this.selectedTags);
      } else {
        target.classList.remove('tagUnset');
        target.classList.add('tagSet');
        this.selectedTags.push(target.id);
        handler(this.selectedTags);
      }
    });
  }

  // Model
  searchTags(tagsArray) {
    let result = {};
    let message = 'No matches for selected tag(s).';
    this.contacts.forEach(contact => {
      tagsArray.forEach(tag => {
        if (contact.tags.includes(tag)) {
          result.push(contact);
          return;
        }
      });
    });
    
    this.commit(result, message);
  }


  