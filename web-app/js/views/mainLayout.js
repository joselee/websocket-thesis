/* This is the outtermost layout of the page.
 This layout gets appended directly to the body. */

define(
    [
        "backbone.marionette",
        "hbs!templates/mainLayoutTemplate",
        "views/header/headerView",
        "views/home/homeView",
        "views/personlist/personsCollectionView",
        "views/profile/profileCollectionView",
        "views/article/articleListCollectionView",
        "views/article/articleCarouselView",
        "views/chat/chatView",
        "views/match/matchListCollectionView",
		"vent"
    ],
    function MainLayout(
		Marionette,
		MainLayoutTemplate,
		HeaderView,
		HomeView,
		PersonsCollectionView,
        ProfileCollectionView,
        ArticleListCollectionView,
        ArticleCarouselView,
        chatView,
        matchListCollectionView,
		Vent
		) {
		"use strict";
		
        var MainLayout = Marionette.Layout.extend({
            template:MainLayoutTemplate,
            className: "mainLayout",
            regions:{
                headerRegion:"#headerRegion",
                mainContentRegion:"#mainContentRegion"
            },
			initialize: function(){
				_.bindAll(this);
			},
            onShow:function () {
                this.headerRegion.show(new HeaderView);
            },
			showHome: function(){
				this.mainContentRegion.show(new HomeView);
			},
            showPlayerList: function(){
                this.mainContentRegion.show(new PersonsCollectionView);
            },
			showProfileCarousel: function(profileId){
                var profileCollectionView = new ProfileCollectionView({profileId:profileId});
                this.mainContentRegion.show(profileCollectionView);
			},
            showChat: function(){
                this.mainContentRegion.show(chatView);
            },
            showArticleList: function(){
                var articleListCollectionView = new ArticleListCollectionView();
                this.mainContentRegion.show(articleListCollectionView);
            },
            showArticleCarousel: function(articleId){
                var articleCarouselView = new ArticleCarouselView({articleId:articleId});
                this.mainContentRegion.show(articleCarouselView);
            },
            showMatchList: function(){
                this.mainContentRegion.show(matchListCollectionView);
            }
        });

        var mainLayout = new MainLayout();
		mainLayout.bindTo(Vent, "show:home", mainLayout.showHome);
		mainLayout.bindTo(Vent, "show:playerList", mainLayout.showPlayerList);
		mainLayout.bindTo(Vent, "show:profile", mainLayout.showProfileCarousel);
		mainLayout.bindTo(Vent, "show:chat", mainLayout.showChat);
		mainLayout.bindTo(Vent, "show:articleList", mainLayout.showArticleList);
		mainLayout.bindTo(Vent, "show:article", mainLayout.showArticleCarousel);
		mainLayout.bindTo(Vent, "show:matchList", mainLayout.showMatchList);

        return mainLayout;
    }
);
