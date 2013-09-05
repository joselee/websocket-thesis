define(
    [
        "backbone.marionette",
        "hbs!templates/articlePageItemViewTemplate"
    ],
    function ArticlePageItemView(Marionette, ArticlePageItemViewTemplate){
        var ArticlePageItemView = Marionette.ItemView.extend({
            className: "articlePageItemView",
            template: ArticlePageItemViewTemplate,
            onShow: function(){
                _.each(this.model.get("body"), function(bodyItem){
                    var paragraph = $("<p>"+ bodyItem +"</p>");
                    this.$el.append(paragraph);
                }, this);
            }
        });

        return ArticlePageItemView;
    }
);