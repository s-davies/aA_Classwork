const APIUtil = require("./api_util.js");
class FollowToggle {
  constructor($el, options) {
    this.user_id = $el.attr('data-user-id') || options.userId;
    this.initial_follow_state = $el.attr('data-initial-follow-state') || options.followState;
    this.$el = $el;
    this.render();
    this.handleClick();
  }

  render() {
    
    if (this.initial_follow_state === "unfollowed") {
      this.$el.text("Follow!");
    } else {
      this.$el.text("Unfollow!");
    }
    this.$el.prop("disabled", false);
  }

  handleClick() {
    let that = this;
    this.$el.on("click", (event) => {
      event.preventDefault();
      this.$el.prop("disabled", true);
      if (that.initial_follow_state === "unfollowed") {
        this.$el.text("Following");
        APIUtil.followUser(that.user_id)
        .then(() => {
          that.initial_follow_state = "followed";
          that.render();
        });
        
      } else {
        this.$el.text("Unfollowing");
        APIUtil.unfollowUser(that.user_id)
          .then(() => {
            that.initial_follow_state = "unfollowed";
            that.render();
          });
      }
    });
  }
}

module.exports = FollowToggle;