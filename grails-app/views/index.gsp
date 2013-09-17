<!DOCTYPE html>
<html>
    <head>
        <title>Marionette-Pet</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">

        <g:if test="${request.device.isSamsung()}">
            <script>var samsungDevice = true;</script>
        </g:if>
        <g:else>
            <script>var samsungDevice = false;</script>
        </g:else>

        <!-- Styles -->
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/font-awesome.min.css">
        <link rel="stylesheet" href="css/jquery.pnotify.default.css">
        <link rel="stylesheet" href="css/reset.css">
        <link rel="stylesheet" href="css/styles.css">

        <!-- Require entry point -->
        <script src="js/libs/require.js" data-main="js/application"></script>
        <script type="text/javascript" src="js/require.config.js"></script>
    </head>
    <body>
    </body>
</html>
