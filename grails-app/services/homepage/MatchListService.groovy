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
                // Just send whatever JSON we get to all clients
                response.writer.write(event.message)

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
}
