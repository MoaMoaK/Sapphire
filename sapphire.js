// General options
//=====================================
// Times the canvas is refreshed a second
var FPS = 30;
// Determine the length of the trail (0=instant disappear, maximum=window.innerHeight=no disappear)
var TRAIL_TIME = 5;
// The color of the characters
var RAIN_COLOR = "#00F";
// The characters displayed
var CHARACTERS = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑".split("");
// The font size used to display the characters
var FONT_SIZE = 10;
// The maximum number of characters displayed by column
var MAX_CHAR = 7;

var Sapphire = function () {
    var sapphire = {
        triggerHandle: undefined,
        activated:     false,
        runOnce:       false,

        getClass: function(elt, main, name) { elt.obj = main.getElementsByClassName(name); },
        getTag:   function(elt, main, name) { elt.obj = main.getElementsByTagName(name); },

        getProp: function(elt) {
            for (var i=0 ; i<elt.obj.length ; i++) {
                for (var p in elt.prop) {
                    if ( p === "color" ) { elt.prop[p][i] = elt.obj[i].style.color; }
                    else if ( p === "bgColor" ) { elt.prop[p][i] = elt.obj[i].style.backgroundColor; }
                    else if ( p === "display" ) { elt.prop[p][i] = elt.obj[i].style.display; }
                }
            }
        },
        alterProp: function(elt) {
            for (var i=0 ; i<elt.obj.length ; i++) {
                for (var p in elt.prop) {
                    if ( p === "color" ) { elt.obj[i].style.color = "white"; }
                    else if ( p === "bgColor" ) { elt.obj[i].style.backgroundColor = "transparent"; }
                    else if ( p === "display" ) { elt.obj[i].style.display = "none"; }
                }
            }
        },
        revertProp: function(elt) {
            for (var i=0 ; i<elt.obj.length ; i++) {
                for (var p in elt.prop) {
                    if ( p === "color" ) { elt.obj[i].style.color = elt.prop[p][i]; }
                    else if ( p === "bgColor" ) { elt.obj[i].style.backgroundColor = elt.prop[p][i]; }
                    else if ( p === "display" ) { elt.obj[i].style.display = elt.prop[p][i]; }
                }
            }
        },

        elts: {
            alerts: {
                obj:    undefined,
                prop:   {bgColor: []},
                get:    function(main) { sapphire.getClass(this, main, "alert"); sapphire.getProp(this); },
                alter:  function()     { sapphire.alterProp(this); },
                revert: function()     { sapphire.revertProp(this); }
            },
            btns: {
                obj:    undefined,
                prop:   {color: [], bgColor: []},
                get:    function(main) { sapphire.getClass(this, main, "btn"); sapphire.getProp(this); },
                alter:  function()     { sapphire.alterProp(this); },
                revert: function()     { sapphire.revertProp(this); }
            },
            body: {
                obj:    undefined,
                prop:   {color: []},
                get:    function(main) {
                    this.obj = document.body;
                    for (var p in this.prop) { if ( p === "color" ) { this.prop[p] = this.obj.style.color; } }
                },
                alter:  function() { for (var p in this.prop) { if ( p === "color" ) { this.obj.style.color = "white"; } } },
                revert: function() { for (var p in this.prop) { if ( p === "color" ) { this.obj.style.color = this.prop[p]; } } }
            },
            captions: {
                obj:    undefined,
                prop:   {color: []},
                get:    function(main) { sapphire.getClass(this, main, "caption"); sapphire.getProp(this); },
                alter:  function()     { sapphire.alterProp(this); },
                revert: function()     { sapphire.revertProp(this); }
            },
            helps: {
                obj:    undefined,
                prop:   {color: []},
                get:    function(main) { sapphire.getClass(this, main, "help-block"); sapphire.getProp(this); },
                alter:  function()     { sapphire.alterProp(this); },
                revert: function()     { sapphire.revertProp(this); }
            },
            hrs: {
                obj:    undefined,
                prop:   {display: []},
                get:    function(main) { sapphire.getTag(this, main, "hr"); sapphire.getProp(this); },
                alter:  function()     { sapphire.alterProp(this); },
                revert: function()     { sapphire.revertProp(this); }
            },
            inputs: {
                obj:    undefined,
                prop:   {color: [], bgColor: []},
                get:    function(main) { sapphire.getTag(this, main, "input"); sapphire.getProp(this); },
                alter:  function()     { sapphire.alterProp(this); },
                revert: function()     { sapphire.revertProp(this); }
            },
            listGroups: {
                obj:    undefined,
                prop:   {color: [], bgColor: []},
                get:    function(main) { sapphire.getClass(this, main, "list-group-item"); sapphire.getProp(this); },
                alter:  function()     { sapphire.alterProp(this); },
                revert: function()     { sapphire.revertProp(this); }
            },
            paginations: {
                obj:    [],
                prop:   {bgColor: []},
                get:    function(main) {
                    var a = main.getElementsByClassName("pagination");
                    for (var i=0 ; i<a.length ; i++) {
                        this.obj[i] = []; this.prop.bgColor[i] = [];
                        for (var j=0 ; j<a[i].children.length ; j++) {
                            this.obj[i][j] = a[i].children[j].children[0];
                            this.prop.bgColor[i][j] = this.obj[i][j].style.backgroundColor;
                        }
                    }
                },
                alter:  function () {
                    for (var i=0 ; i<this.obj.length ; i++)
                        for (var j=0 ; j<this.obj[i].length ; j++)
                            for (var p in this.prop)
                                if ( p === "bgColor" ) { this.obj[i][j].style.backgroundColor = "transparent"; }
                },
                revert: function() {
                    for (var i=0 ; i<this.obj.length ; i++)
                        for (var j=0 ; j<this.obj[i].length ; j++)
                            for (var p in this.prop)
                                if ( p === "bgColor" ) { this.obj[i][j].style.backgroundColor = this.prop[p][i][j]; }
                }
            },
            panelHeadings: {
                obj:    undefined,
                prop:   {bgColor: [], color: []},
                get:    function(main) { sapphire.getClass(this, main, "panel-heading"); sapphire.getProp(this); },
                alter:  function()     { sapphire.alterProp(this); },
                revert: function()     { sapphire.revertProp(this); }
            },
            panels: {
                obj:    undefined,
                prop:   {bgColor: []},
                get:    function(main) { sapphire.getClass(this, main, "panel"); sapphire.getProp(this); },
                alter:  function()     { sapphire.alterProp(this); },
                revert: function()     { sapphire.revertProp(this); }
            },
            selects: {
                obj:    undefined,
                prop:   {color: [], bgColor: []},
                get:    function(main) { sapphire.getTag(this, main, "select"); sapphire.getProp(this); },
                alter:  function()     { sapphire.alterProp(this); },
                revert: function()     { sapphire.revertProp(this); }
            },
            sidenavs: {
                obj:    undefined,
                prop:   {bgColor: []},
                get:    function(main) { sapphire.getClass(this, main, "sidenav"); sapphire.getProp(this); },
                alter:  function()     { sapphire.alterProp(this); },
                revert: function()     { sapphire.revertProp(this); }
            },
            tds: {
                obj:    undefined,
                prop:   {bgColor: []},
                get:    function(main) { sapphire.getTag(this, main, "td"); sapphire.getProp(this); },
                alter:  function()     { sapphire.alterProp(this); },
                revert: function()     { sapphire.revertProp(this); }
            },
            thumbnails: {
                obj:    undefined,
                prop:   {bgColor: []},
                get:    function(main) { sapphire.getClass(this, main, "thumbnail"); sapphire.getProp(this); },
                alter:  function()     { sapphire.alterProp(this); },
                revert: function()     { sapphire.revertProp(this); }
            },
            trs: {
                obj:    undefined,
                prop:   {bgColor: []},
                get:    function(main) { sapphire.getTag(this, main, "tr"); sapphire.getProp(this); },
                alter:  function()     { sapphire.alterProp(this); },
                revert: function()     { sapphire.revertProp(this); }
            }
        },

        columns: undefined,
        alpha: undefined,
        drops: undefined,
        canvas: undefined,

        init: function() {
            var main = document.getElementById("main");
            for (var e in sapphire.elts) { sapphire.elts[e].get(main); }
        },

        resize: function() {
            var ctx = sapphire.canvas.getContext("2d");
            var img = ctx.getImageData( 0, 0, sapphire.canvas.width, sapphire.canvas.height );
            sapphire.canvas.width = window.innerWidth;
            sapphire.canvas.height = window.innerHeight;
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fillRect(0, 0, sapphire.canvas.width, sapphire.canvas.height);
            ctx.putImageData( img, 0, 0 );
            sapphire.columns = sapphire.canvas.width/FONT_SIZE;
            sapphire.alpha = Math.max( 0, Math.min( 1, TRAIL_TIME / ( sapphire.canvas.height/FONT_SIZE ) ) );
            var newDrops = [];
            for(var x = 0; x < sapphire.columns; x++) {
                if ( sapphire.drops && sapphire.drops[x] ) { newDrops[x] = sapphire.drops[x] }
                else {
                    newDrops[x] = [];
                    var nb = Math.floor(Math.random()*MAX_CHAR);
                    for (var y = 0; y < nb; y++)
                        newDrops[x][y] = 0;
                }
            }
            sapphire.drops = newDrops;
        },

        run: function() {
            sapphire.canvas = document.createElement("canvas");
            document.body.appendChild(sapphire.canvas);
            sapphire.canvas.style.position = "fixed";
            sapphire.canvas.style.zIndex = -1;
            sapphire.canvas.style.left = 0;
            sapphire.canvas.style.top = 0;

            var ctx = sapphire.canvas.getContext("2d");
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fillRect(0, 0, sapphire.canvas.width, sapphire.canvas.height);

            function attenuateBackground() {
                ctx.fillStyle = "rgba(0, 0, 0, "+sapphire.alpha+")";
                ctx.fillRect(0, 0, sapphire.canvas.width, sapphire.canvas.height);
            }

            function drawMatrixRainDrop() {
                ctx.fillStyle = RAIN_COLOR;
                ctx.font = FONT_SIZE + "px arial";
                for(var i = 0; i < sapphire.drops.length; i++) {
                    for (var j = 0; j < sapphire.drops[i].length; j++) {
                        var text = CHARACTERS[Math.floor(Math.random()*CHARACTERS.length)];
                        ctx.fillText(text, i*FONT_SIZE, sapphire.drops[i][j]*FONT_SIZE);
                        if(sapphire.drops[i][j]*FONT_SIZE > sapphire.canvas.height && Math.random() > 0.975)
                            sapphire.drops[i][j] = 0;
                        sapphire.drops[i][j]++;
                    }
                }
            }

            function drawEverything() {
                attenuateBackground();
                drawMatrixRainDrop();
            }

            sapphire.resize();
            window.addEventListener('resize', sapphire.resize);
            sapphire.triggerHandle = setInterval(drawEverything, 1000/FPS);
        },

        stop: function() {
            window.removeEventListener('resize', sapphire.resize);
            clearInterval(sapphire.triggerHandle);
            sapphire.canvas.parentNode.removeChild(sapphire.canvas);
        },

        alterElts:  function() { for (var e in sapphire.elts) { sapphire.elts[e].alter(main); } },
        revertElts: function() { for (var e in sapphire.elts) { sapphire.elts[e].revert(main); } },

        activate:   function() {
            if (!sapphire.runOnce) {
                sapphire.runOnce = true;
                sapphire.init();
            }
            if (!sapphire.activated) {
                sapphire.activated = true;
                sapphire.alterElts();
                sapphire.run()
            }
            else {
                sapphire.activated = false;
                sapphire.stop();
                sapphire.revertElts();
            }
        }
    }

    return sapphire;
}
