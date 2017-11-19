# Sapphire
Sapphire is little JS script used to display cool matrix-like background upon
activation.

## Trivia
Sapphire was the old sysadmin project to manage users of
[Supélec Rézo Rennes](https://rezo.rez-rennes.fr)'s network. A fun feature of
the web interface was its matrix-like dropping rain login page that would give
the impression to other people we were hacking something and doing some geeky
weird stuff :)

I wanted to reproduce this feature on the new version of the sysadmin tool use
: [Re2o](https://gitlab.federez.net/federez/re2o). This interface is made with
bootstrap so it had to be adapted to fit the bootstrap components. It's used
with [Konami-js](https://github.com/snaptortoise/konami-js) for a cool easter
egg.

## Usage
Simply include this files in your HTML using
```HTML
<script src="/path/to/sapphire.js"> var s=Sapphire(); </script>
```
Then whenever the matrix rain drop needs to be toogle on/off use
`s.activate();`. It will modify some CSS parameters of the bootstrap
componenents in order to make the background JS canvas where the rain drop is
drawn visible.

## Options
### Basic options
There are some options at the top of the files for simple customisation.
Especially for reducing the ressource consumption :
* **FPS** : Obsiously the number of times the canvas is drawn per second. The
higher the more tougher for the browser it is. 30 FPS seems to be acceptable.
* **TRAIL_TIME** : A value that is related to the number of frames the trail
is being displayed. *0 = instant disappear*,
*maximum = window.innerHeight = no disappear at all*
* **RAIN_COLOR** : The color for the rain drop symbols
* **CHARACTERS** : The charachters used. Chineses are quite ok.
* **FONT_SIZE** : The size used for the characters. The higher, the less
characters on screen but easier to handle for the browser.
* **MAX_CHAR** : The number of maximum character per column.

### Advanced options
The bootstrap elements that need modifications were all listed according to my
needs but some may be missing or some useless to another use so feel free to
add or remove the parts of code for elements to modify.

Each one is defined in the `elts` variable of the `sapphire` object and is
basically following the template :
```javascript
name_for_elt: {
    // The variable to store the concerned objects. Initialize with undefined
    obj:    undefined,
    // An object where each key is a property to modify and the value, an
    // array to keep track of the old values in order to restore them later.
    // Initialize each value with an empty array
    prop:   {prop1: [], prop2: []},
    // A function to retrieve all the concerned items. Store the objects in
    // the "obj" variable and the properties in the "prop" variable. Called
    // with a "main" parameter that is the DOM element with id "main" (can be
    // used for easier fetching)
    get:    function(main) { some_actions(); },
    // A function called when altering the elements is needed. Should
    // bassically, parse the "obj" variable and modify some CSS properties for
    // each.
    alter:  function()     { sapphire.alterProp(this); },
    // A function called when reverting back to normal state. Should basically
    // parse the "obj" variable and apply the old CSS values stored in the
    // "prop" variable
    revert: function()     { sapphire.revertProp(this); }
}
```
