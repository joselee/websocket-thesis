<script type="text/html" id="matchViewTemplate">
    <p>Match ID: {{id}}</p>
    <p>Start time: <span class="startTime">{{moment(startTime).format("D MMM YYYY, HH:mm:ss")}}</span></p>
    <p>End time: <span class="endTime">--:--</span></p>
    <div class="teambox teamboxLeft">
        <p class="teamname">Team FOO</p>
        <div class="scorebox">
            <span>Points:</span>
            <button class="btDecreaseScore">-</button>
            <span class="points">0</span>
            <button class="btIncreaseScore">+</button>
        </div>
    </div>
    <div class="teambox teamboxRight">
        <p class="teamname">Team BAR</p>
        <div class="scorebox">
            <span>Points:</span>
            <button class="btDecreaseScore">-</button>
            <span class="points">0</span>
            <button class="btIncreaseScore">+</button>
        </div>
    </div>
    <br class="clear" />
    <button class="btEndMatch">End Match</button>
</script>