const txt = `..............      ..  ..  ..............
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

  for (let i = 0; i < arr2d.length; i++) {
    const currentLine = arr2d[i];
    containerInnerHtml += `<div class="row"><div class="cell num">${i}</div>`
    for (let j = 0; j < currentLine.length; j++) {
      const currentOn = currentLine[j];
      containerInnerHtml += `<div class="cell ${currentOn ? "on" : ""}"></div>`;
    }
    containerInnerHtml += `</div>`;
  }

  container.innerHTML = containerInnerHtml;
});
