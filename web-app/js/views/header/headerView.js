define(
	[
		"backbone.marionette",
		"hbs!templates/headerViewTemplate"
	],
	function HeaderView(Marionette, headerViewTemplate){
		var HeaderView = Marionette.ItemView.extend({
            className: "headerView",
			template: headerViewTemplate,
			events: {
				"click .mobileMenuButton": "toggleMobileMenu",
                "click .headerLinkListItem": "mobileMenuItemSelected",
                "click .homeLogo": "mobileMenuItemSelected"
			},
			toggleMobileMenu: function(){
				$(".headerLinksContainer", this.$el).slideToggle("150");
			},
            mobileMenuItemSelected: function(){
                var mobile = $(".mobileMenuButton").css("display") === "block";
                var menuIsOpen = $(".headerLinksContainer").not(":hidden");

                if(mobile && menuIsOpen){
                    $(".headerLinksContainer", this.$el).slideUp("150");
                }
            }
		});

        return HeaderView;
	}
);