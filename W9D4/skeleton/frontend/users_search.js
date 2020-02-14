const APIUtil = require("./api_util.js");
const FollowToggle = require("./follow_toggle.js");

class UsersSearch {
  constructor($el) {
    this.$el = $el;
    this.$input = $el.find('input');
    this.$ul = $el.find('.users');
    this.searchString = [];
    this.handleInput();
  }

  handleInput() {
    this.$input.on("keyup", (event) => {
      if (event.key != "Backspace"){
        this.searchString.push(event.key);
      } else {
        this.searchString.pop();
      }
      const check = APIUtil.searchUsers(this.searchString.join(""))
      .then((data) => {
        this.renderResults(data);
      });
    })
  }

  renderResults(data) {
    this.$ul.empty();
    for (let i = 0; i < data.length; i++) {
      let $li = $(`<li><a href='/users/${data[i].id}'>${data[i].username}</a></li>`);
      this.$ul.append($li);
      let $button = $(`<button class="follow-toggle" data-user-id="${data[i].id}" data-initial-follow-state="${data[i].followed === true ? "followed" : "unfollowed"}"></button>`);
      const toggle = new FollowToggle($button);
      $li.append($button);

    }
  }
  
}

module.exports = UsersSearch;