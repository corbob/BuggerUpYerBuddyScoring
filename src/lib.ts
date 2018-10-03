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
        if(contents !== undefined && contents !== 'input') {
            if(className !== undefined) {
                temp.className = className;
            }
            temp.innerText = contents;
        } else if (contents === 'input') {
            let inputTemp: HTMLInputElement = document.createElement('input');
            inputTemp.type = 'number';
            if(className !== undefined) {
                inputTemp.className = className;
            }
            temp.appendChild(inputTemp)
        } else {
            if(className !== undefined) {
                temp.className = className;
            }
            temp.innerHTML = '&nbsp;';
        }
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
