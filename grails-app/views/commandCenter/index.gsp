<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>WebSockets Match Editor</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/commandCenterStyles.css">
    <script src="js/libs/jquery-1.7.2.min.js"></script>
    <script src="js/libs/underscore.min.js"></script>
    <script src="js/libs/jquery.atmosphere.js"></script>
    <script src="js/libs/backbone.js"></script>
    <script src="js/libs/moment.min.js"></script>
    <script src="js/commandCenter.js"></script>
</head>
<body>
<header>
    <h1 class="title">Command Center</h1>
    <p class="subtitle">Welcome back commander.</p>
</header>

<div class="mainContentRegion">
    <button class="btNewMatch"><i class="icon-plus-sign"></i> New match</button>

    <div id="ongoingMatches">
        <h4>Ongoing matches</h4>
    </div>

    <div id="finishedMatches">
        <h4>Finished matches</h4>
    </div>
</div>

<g:render template="templates" />
</body>
</html>