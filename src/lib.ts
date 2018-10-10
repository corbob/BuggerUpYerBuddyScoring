class Lib {
    gid (id: string): HTMLElement {
        return document.getElementById(id);
    }
    error(message: string) {
        window.alert(message);
        throw (message);
    }
    newCell(contents?: string, className?: string): HTMLTableCellElement {
        let temp: HTMLTableCellElement = document.createElement('td');
        if(contents !== undefined) {
            if(className !== undefined) {
                temp.className = className;
            }
            temp.innerText = contents;
        }
        return temp;
    }
    newTrickInput(hand: number, player: number, className: string): HTMLInputElement {
        let temp: HTMLInputElement = document.createElement('input');
        temp.dataset['hand'] = hand.toString();
        temp.dataset['player'] = player.toString();
        temp.className = className;
        temp.addEventListener('change', inputChanged);
        return temp;
    }
    newInput(id: string, className?: string): HTMLDivElement {
        let temp: HTMLDivElement = document.createElement('div');
        let tempLbl: HTMLLabelElement = document.createElement('label');
        let tempInput: HTMLInputElement = document.createElement('input');
        tempLbl.id = 'label' + id;
        tempInput.id = 'input' + id;
        tempLbl.htmlFor = tempInput.id;
        tempLbl.innerText = id + ': ';
        temp.appendChild(tempLbl);
        temp.appendChild(tempInput);
        if(className !== undefined) {
            temp.className = className;
        }
        return temp;
    }
}

let l: Lib = new Lib();
