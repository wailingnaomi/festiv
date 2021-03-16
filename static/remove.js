// Get dislike button by ID
var remove = document.getElementById('dislike')

// Add a click event
if (remove) {
    remove.addEventListener('click', onremove)
}

function onremove(ev) {
    // Save event.target in node
    var node = ev.target

    // Console log node to see the event.target
    console.log(node)

    // Console log node.dataset.value to see the ID
    console.log(node.dataset.value)

    // .....
    fetch(`/home/${node.dataset.value}`, {
            method: 'delete'
        })
        .then(onresponse)
        .then(onload)
        .catch(error)

    // Console log clicked when clicked
    console.log('clicked')

    // When clicked .......
    function onresponse(res) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
        return JSON.parse('false'),
            console.log('succes')
    }

    // When clicked reload the page
    function onload() {
        return window.location.href = '/home'
    }

    // When clicked give error
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    function error() {
        console.log('Error')
    }
}