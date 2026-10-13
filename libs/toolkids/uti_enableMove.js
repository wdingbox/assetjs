
function uti_enableMove(eid, movableClass) {
    eid = eid.replace(/^[\#]/,'')
    movableClass = movableClass.replace(/^[\.]/,'')
    this.m_dragmovable_element = document.getElementById(eid)
    //this.enable_move();

    var _THIS = this
    this.m_dragmovable_element.onclick = function (e) {
        // Only execute if the user clicked directly on the parent, NOT a child
        if (event.target !== event.currentTarget) {
            return; // Ignore event originating from any child
        }
        $(this).toggleClass(movableClass)
        var bMovable = $(this).hasClass(movableClass)
        _THIS.reset_movable(bMovable)
    }
}

uti_enableMove.prototype.enable_move = function () {
    //var elmnt = document.getElementById(eid)
    var elmnt = this.m_dragmovable_element
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        //document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

        console.log(pos1, pos2, pos3, pos4, elmnt.style.top, elmnt.style.left)
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
uti_enableMove.prototype.reset_movable = function (bMovable) {

    if (bMovable) {
        this.enable_move();
    } else {
        this.m_dragmovable_element.onmousedown = null
    }
}


