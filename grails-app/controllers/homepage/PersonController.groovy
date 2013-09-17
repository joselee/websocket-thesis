package homepage

import groovy.json.JsonSlurper
import grails.converters.JSON

class PersonController {

    def getAllPersons = {
        File jsonFile = grailsApplication.parentContext.getResource("feeds/allPersons.json").file
        JsonSlurper jsonSlurper = new JsonSlurper()
        def feed = jsonSlurper.parseText(jsonFile.text)
        render feed as JSON
    }
}
