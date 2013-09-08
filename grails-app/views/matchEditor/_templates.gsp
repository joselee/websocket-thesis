<script type="text/template" id="matchViewTemplate">
    <p>Match ID: {{matchId}}</p>
    <p>Start time: <span class="startTime">{{moment(startTime).format("D MMM YYYY, HH:mm:ss")}}</span></p>
    <p>End time: <span class="endTime">--:--</span></p>
    <div class="teamboxContainer"></div>
    <button class="btEndMatch">End Match</button>
</script>


<script type="text/template" id="teamboxTemplate">
    <p class="teamname">{{name}}</p>
    <div class="scorebox" id="{{teamId}}">
        <span>Points:</span>
        <button class="btDecreaseScore">-</button>
        <span class="points">{{points}}</span>
        <button class="btIncreaseScore">+</button>
    </div>
</script>