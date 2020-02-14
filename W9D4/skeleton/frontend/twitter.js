const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');

$(() => {
  const $button_toggles = $(".follow-toggle");

  $.each($button_toggles, (index, button_toggle) => {
    const toggle = new FollowToggle($(button_toggle));
  });
  const $nav = $(".users-search");
  const search = new UsersSearch($nav);
});