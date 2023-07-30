const parentDiv = document.querySelector('.grid');
let div;
let div_out;
const sidepanel = document.querySelector('.sidepanel');
const rules = document.querySelector('.rules');

const firstDiv = document.createElement('div');
const secondDiv = document.createElement('div');
const input = document.createElement('input');

function createRules(){
    let divh = document.createElement('div');
    rules.appendChild(divh);
    divh.innerHTML="Welcome to Etch-a-Sketch! Here are the rules to help you get started:";
    let divl = document.createElement('ul');
    rules.appendChild(divl);
    divl.innerHTML+="<li>Click on the <strong>Basic</strong> option to sketch with black color.";
    divl.innerHTML+="<li>Click on the <strong>Rainbow</strong> option to sketch with any random color.</li>";
    divl.innerHTML+="<li>Click on the <strong>Erase</strong> option to clear the sketch.</li></ul>";
    let divf = document.createElement('div');
    rules.appendChild(divf);
    divf.innerHTML="By default, the sketch has a 10x10 grid.";
    divf.innerHTML+="If you want to change the grid size, you can do so by entering the desired number of squares in the "; 
    divf.innerHTML+="<strong>Enter the number of squares:</strong> input and a grid of that size will be created. "; 
    divf.innerHTML+="This allows you to adjust the size of the grid to suit your needs. "
    divf.innerHTML+="We hope you have fun exploring Etch-a-Sketch. Happy sketching!"
}

function createSidePanel() {
    sidepanel.appendChild(firstDiv);
    sidepanel.appendChild(secondDiv);
    firstDiv.classList.add("firstDiv");
    secondDiv.classList.add("secondDiv");
    createFirstDiv();
    createSecondDiv()
}


function createFirstDiv() {
    let option = document.createElement('div');
    firstDiv.appendChild(option);
    option.classList.add("option");
    option.innerHTML="<p>Choose an Option</p>";
    button1 = document.createElement('button');
    firstDiv.appendChild(button1);
    button1.classList.add("basic");
    button1.innerHTML = "Basic";
    button2 = document.createElement('button');
    firstDiv.appendChild(button2);
    button2.classList.add("rainbow");
    button2.innerHTML = "Rainbow";
    button3 = document.createElement('button');
    firstDiv.appendChild(button3);
    button3.classList.add("erase");
    button3.innerHTML = "Erase";
}


function createSecondDiv() {
    secondDiv.innerHTML = "<p>Enter the number of squares:</p>";
    secondDiv.appendChild(input);
    input.type = "text";
    input.placeholder="Value between 1 to 200";
    input.classList.add('value');
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if(1<=Number(input.value) && Number(input.value)<=200){
                removeGrid();
                createGrid(input.value);
            }
            else{
                alert("ERROR! Enter value should be between 1 to 200")
            }
        }
    });
}

function removeGrid() {
    let rem = document.querySelectorAll('.gridin');
    for (var i = 0; i < rem.length; i++) {
        rem[i].remove();
    }
}

function createGrid(size) {
    for (let i = 0; i < size; i++) {
        div_out = document.createElement('div');
        parentDiv.appendChild(div_out);
        div_out.classList.add("gridin");
        for (let j = 0; j < size; j++) {
            div = document.createElement('div');
            div_out.appendChild(div);
            div.classList.add("gridElem");
            div.style.cssText = `height: ${500 / size}px; width: ${500 / size}px;`;
        }
    }
    let divs = document.querySelectorAll('.gridElem');
    type(divs);
}

createRules();
createSidePanel();
createGrid(10);


function hover(divs, val) {
    let color = "black";
    divs.forEach(x => {
        x.addEventListener('mouseover', () => {
            if (val === 1) {
                color = generateRandomColor();
            }
            else if (val === 2) {
                color = "transparent";
            }
            x.style.cssText += `background-color:${color};`;
        });
    });
}

function generateRandomColor() {
    let maxVal = 0xFFFFFF;
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`
}

function type(divs) {
    const basic = document.querySelector('.basic');
    basic.addEventListener('click', () => {
        hover(divs, 0);
    });
    const rainbow = document.querySelector('.rainbow');
    rainbow.addEventListener('click', () => {
        hover(divs, 1);
    });
    const erase = document.querySelector('.erase');
    erase.addEventListener('click', () => {
        hover(divs, 2);
    });
}
