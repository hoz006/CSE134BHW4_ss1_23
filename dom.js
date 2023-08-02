/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('advWalkBtn');
    element.addEventListener('click', function() {
        advancedWalk(document.body);
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('advModifyBtn');
    element.addEventListener('click', function () {
        advModify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('addElementBtn');
    element.addEventListener('click', function () {
        advAdd();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('safeRemoveBtn');
    element.addEventListener('click', function () {
        safeRemove();
    });

    element = document.getElementById('deleteBySelectorBtn');
    element.addEventListener('click', function () {
        deleteBySelector();
    });

    element = document.getElementById('basicCloneBtn');
    element.addEventListener('click', function () {
        basicClone();
    });

    element = document.getElementById('advancedCloneBtn');
    element.addEventListener('click', function () {
        advancedClone();
    });
}

function walk() {
   let el;

   el = document.getElementById('p1');
   showNode(el);

   el = el.firstChild;
   showNode(el);

   el = el.nextSibling;
   showNode(el);

   el = el.lastChild;
   showNode(el);

   el = el.parentNode.parentNode.parentNode;
   showNode(el);

   el = el.querySelector('section > *');
   showNode(el);


}

function advancedWalk(node, indent = "") {
    const textarea = document.getElementById('nodeInfoTextarea');
    if (node.nodeType === 1) { // Element node
      textarea.value += `${indent}${node.nodeName}\n`;
    }
  
    indent += "|   "; // Indent with pipe and three spaces
    for (let i = 0; i < node.childNodes.length; i++) {
        advancedWalk(node.childNodes[i], indent);
    }
}
  

function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;


    const textarea = document.getElementById('nodeInfoTextarea');

    const text = `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n\n`; 

    textarea.value += text;
}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function advModify() {
    // 1. Change the text of the h1
    const h1 = document.querySelector('h1');
    if (h1) {
        h1.textContent = "DOM Manipulation is Fun!";

        // 2. Change the color to a random dark color
        const colorVarIndex = Math.floor(Math.random() * 6) + 1;
        h1.style.color = `var(--darkcolor${colorVarIndex})`;
    }

    // 3. Set the class of the p tag to "shmancy" and toggle the animation class
    const p = document.querySelector('p');
    if (p) {
        p.classList.toggle('shmancy');
    }
}

function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}


function advAdd() {
    const type = document.getElementById('elementType').value;
    const content = document.getElementById('content').value || getDefaultAddContent(type);
    const tagName = document.getElementById('tagName').value || 'div';
    const output = document.getElementById('advAddOutput');
    
    let newNode;
    const timestamp = new Date().toLocaleString();
    
    switch (type) {
        case 'text':
            newNode = document.createTextNode(content + ' ' + timestamp);
            break;
        case 'comment':
            newNode = document.createComment(content + ' ' + timestamp);
            break;
        case 'element':
            newNode = document.createElement(tagName);
            newNode.textContent = content + ' ' + timestamp;
            break;
    }
    
    output.appendChild(newNode);
}

function getDefaultAddContent(type) {
    switch (type) {
        case 'text':
            return 'New Text Node';
        case 'comment':
            return 'New Comment';
        case 'element':
            return 'New Element';
    }
}

function remove() {
  document.body.removeChild(document.body.lastChild);
}

function safeRemove() {
    // If the last child is the controls section, stop deleting
    if (document.body.lastChild === document.getElementById('controls')) return;

    // Remove the last child element
    document.body.removeChild(document.body.lastChild);
}

function deleteBySelector() {
    const selector = document.getElementById('selectorInput').value;
    console.log('Selector:', selector); // Debug the selector
    const elementsToDelete = document.querySelectorAll(selector);
    console.log('Elements to Delete:', elementsToDelete); // Debug the found elements

    elementsToDelete.forEach(element => {
        element.parentNode.removeChild(element);
    });    
}

function basicClone() {
    // Get the paragraph with id "p1"
    let p1 = document.getElementById('p1');

    // Clone the paragraph
    let clone = p1.cloneNode(true);

    // You can modify attributes here if needed
    // For example: clone.id = 'newId';

    // Get the "advAddOutput" element
    let output = document.getElementById('advAddOutput');

    // Append the cloned paragraph to the "advAddOutput" element
    output.appendChild(clone);
}

function advancedClone() {
    let template = document.getElementById('cardTemplate');

    let clone = template.content.cloneNode(true);

    clone.querySelector('.card-title').textContent = 'New Title';
    clone.querySelector('.card-text').textContent = 'New text with Random Value: ' + Math.random();

    // Append the cloned content to the output area
    document.getElementById('advCloneOutput').appendChild(clone);
}


window.addEventListener('DOMContentLoaded', init);