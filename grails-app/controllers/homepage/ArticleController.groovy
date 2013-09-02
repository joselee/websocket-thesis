package homepage

import grails.converters.*

class ArticleController {

    def grailsApplication

    def index() { }

    def articles = {

        File jsonFile = grailsApplication.parentContext.getResource("feeds/articles.json").file
        def articleFeed = JSON.parse(jsonFile.text)
        render articleFeed as JSON
    }
}
