package homepage

import grails.converters.JSON
import org.atmosphere.cpr.AtmosphereRequest
import org.atmosphere.cpr.AtmosphereResource
import org.atmosphere.cpr.AtmosphereResponse

class MatchListService {

    static transactional = false
    static atmosphere = [mapping: '/atmosphere/matchList']

    def onRequest = { event ->
        try {
            AtmosphereRequest request = event.request
            if (request.method.equalsIgnoreCase("GET")) {
                event.suspend()
            } else if (request.method.equalsIgnoreCase("POST")) {
                event.broadcaster.broadcast(request.reader.readLine().trim())
            }
        } catch (Exception e) {
            println "ERROR!!!!!"
        }

    }

    def onStateChange = { event ->
        AtmosphereResource resource = event.resource
        AtmosphereResponse response = resource.response

        try {
            if (event.isSuspended()) {
                def command = JSON.parse(event.message)
                def commandRespose = handleCommand(command)
                response.writer.write(commandRespose)

                switch (resource.transport()) {
                    case AtmosphereResource.TRANSPORT.JSONP:
                    case AtmosphereResource.TRANSPORT.LONG_POLLING:
                        event.resource.resume()
                        break
                    default:
                        response.writer.flush()
                }
            } else if (!event.isResuming()) {
                println("connection closing")
            }
        } catch (Exception e) {
            println "ERROR in onStateChange: $e"
        }
    }

    private static String handleCommand(def data) {
        String commandType = data.commandType

        if(commandType == "createMatch"){
            println("creating match ${data.matchId}")
        }
        if(commandType == "updateMatch"){
            println("updating score for team ( ${data.teamId} )")

        }
        if(commandType == "endMatch"){
            println("ending match ${data.matchId}")
        }

        return new JSON( data )
    }
}
