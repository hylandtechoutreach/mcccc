const txt2 = `..............      ..  ..  ..............
..          ..  ..  ..  ..  ..          ..
..  ......  ..  ..  ....    ..  ......  ..
..  ......  ..          ..  ..  ......  ..
..  ......  ..  ..........  ..  ......  ..
..          ..  ......      ..          ..
..............  ..  ..  ..  ..............
                ..                        
....  ..    ....    ......  ......  ....  
......        ..  ..  ..  ..    ....    ..
  ..  ..  ....  ....  ..  ....      ......
......        ....      ........      ....
..  ..  ..  ..    ......    ..  ....    ..
                ......    ....    ..  ....
..............  ..........  ..  ......    
..          ..    ..        ....  ..  ..  
..  ......  ..          ......    ..  ..  
..  ......  ..  ..        ....  ..    ....
..  ......  ..    ..  ..  ....  ......  ..
..          ..  ..  ......      ....      
..............  ..        ..    ..    ..  `;

const txt = `..............      ..      ..............
..          ..    ........  ..          ..
..  ......  ..  ....  ..    ..  ......  ..
..  ......  ..  ....  ..    ..  ......  ..
..  ......  ..      ......  ..  ......  ..
..          ..              ..          ..
..............  ..  ..  ..  ..............
                        ..                
      ....  ....  ....            ....    
....              ..  ....      ..  ....  
        ......      ..  ..      ....    ..
..........      ..  ....  ....    ........
  ......  ....  ....                    ..
                ..........  ....          
..............  ..    ....    ..........  
..          ..    ..    ..    ....  ..  ..
..  ......  ..  ........      ..      ....
..  ......  ..  ..      ......  ....      
..  ......  ..    ......    ..      ......
..          ..        ..    ..  ..  ......
..............      ....    ..      ..    `

const txtLines = txt.split("\n");
const arr2d = [];

for (let i = 0; i < txtLines.length; i++) {
  const l = txtLines[i];
  const newLineArr = [];
  for (let j = 0; j < l.length; j+=2) {
    newLineArr.push(l[j] === ".");
  }

  arr2d.push(newLineArr);
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#container");
  let containerInnerHtml = ``;
  const lineLen = arr2d[0].length;
  containerInnerHtml += `<div class="row"><div class="cell num"></div>`;
  for (c = 0; c < lineLen; c++) {
    containerInnerHtml += `<div class="cell num">${c}</div>`;
  }
  containerInnerHtml += `</div>`;

  let blankedOnes = [];
  for (let i = 0; i < arr2d.length; i++) {
    const currentLine = arr2d[i];
    containerInnerHtml += `<div class="row"><div class="cell num">${i}</div>`
    for (let j = 0; j < currentLine.length; j++) {
      let currentOn = currentLine[j];
      const topLeftCorner = i < 7 && j < 7;
      const topRightCorner = i >= 14 && j < 7;
      const bottomLeftCorner = i < 7 && j >= 14;
      const coinFlip = Math.random() > .7;
      if (currentOn && !topLeftCorner && !topRightCorner && !bottomLeftCorner && coinFlip) {
        currentOn = false;
        blankedOnes.push(`(${j}, ${i})`);
      }
      containerInnerHtml += `<div class="cell ${currentOn ? "on" : ""}"></div>`;
    }
    containerInnerHtml += `</div>`;
  }

  container.innerHTML = containerInnerHtml;

  const blanksContainer = document.querySelector("#blanked");
  for (let i = 0; i < blankedOnes.length; i++) {
    const blankLine = document.createElement("p");
    blankLine.textContent = blankedOnes[i];
    blanksContainer.appendChild(blankLine);
  }


});
