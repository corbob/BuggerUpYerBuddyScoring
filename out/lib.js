var Lib = /** @class */ (function () {
    function Lib() {
    }
    Lib.prototype.gid = function (id) {
        return document.getElementById(id);
    };
    Lib.prototype.error = function (message) {
        window.alert(message);
        throw (message);
    };
    Lib.prototype.newCell = function (contents, className) {
        var temp = document.createElement('td');
        if (contents !== undefined) {
            if (className !== undefined) {
                temp.className = className;
            }
            temp.innerText = contents;
        }
        return temp;
    };
    Lib.prototype.newTrickInput = function (hand, player, className) {
        var temp = document.createElement('input');
        temp.dataset['hand'] = hand.toString();
        temp.dataset['player'] = player.toString();
        temp.className = className;
        temp.addEventListener('change', inputChanged);
        return temp;
    };
    Lib.prototype.newInput = function (id, className) {
        var temp = document.createElement('div');
        var tempLbl = document.createElement('label');
        var tempInput = document.createElement('input');
        tempLbl.id = 'label' + id;
        tempInput.id = 'input' + id;
        tempLbl.htmlFor = tempInput.id;
        tempLbl.innerText = id + ': ';
        temp.appendChild(tempLbl);
        temp.appendChild(tempInput);
        if (className !== undefined) {
            temp.className = className;
        }
        return temp;
    };
    return Lib;
}());
var l = new Lib();
