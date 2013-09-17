define(
    [
        "backbone.marionette",
        "views/profile/profileItemView",
        "collections/personsCollection",
        "router"
    ],
    function PersonsCollectionView(Marionette, ProfileItemView, personsCollection, Router){

        var PersonsCollectionView = Marionette.CollectionView.extend({
            className: "profileCollectionView",
            itemView: ProfileItemView,
            collection: personsCollection,
            initialize: function(){
                _.bindAll(this);
            },
            onShow: function(){
                this.scrollToProfile(this.options.profileId);
            },
            appendHtml: function(collectionView, itemView, index){
                if (collectionView.el.pagination === undefined){ // If at least on element and juissi has to be defined
                    collectionView.el.pagination = new juissi.Explore(collectionView.el,{
                        horizontalMode : true,
                        loopHorizontal : true
                    });
                    this.pagination = collectionView.el.pagination;
                    this.pagination.triggers.onPageChange = this.onPageChange;
                }

                if ( !this.pagination.elementExists(index, 0) ){
                    this.pagination.setElement({x: index, y : 0}, itemView.el);

                } else {
                    this.pagination.updateElement({x: index, y : 0}, itemView.el);
                }
                this.pagination.alignElements(); // Align elements after all
            },
            onPageChange: function(){
                var currentModel = personsCollection.at(this.pagination.getCurrentCoords().x);
                Router.navigate("#profile/" + currentModel.get("id"));
            },
            scrollToProfile: function(profileId){
                var index = personsCollection.getPersonIndex(profileId);
                this.pagination.scroll(index, 0);
            }
        });

        return PersonsCollectionView;
    }
);