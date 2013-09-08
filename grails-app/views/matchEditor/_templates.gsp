<script type="text/html" id="matchViewTemplate">
    <p>Match ID: {{id}}</p>
    <p>Start time: {{moment(time).format("D MMM YYYY, HH:mm")}}</p>
    <p>End time: --:--</p>
    <div class="teambox teamboxLeft">
        <p class="teamname">Team FOO</p>
        <div class="scorebox">
            <span>Points:</span>
            <button>-</button>
            <span class="points">5</span>
            <button>+</button>
        </div>
    </div>
    <div class="teambox teamboxRight">
        <p class="teamname">Team BAR</p>
        <div class="scorebox">
            <span>Points:</span>
            <button>-</button>
            <span class="points">3</span>
            <button>+</button>
        </div>
    </div>
    <br class="clear" />
    <button class="btEndMatch">End Match</button>
</script>