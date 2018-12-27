let t;

function readParagraph(string, speed) {
  let wordArray = string.split(' ');
  wordArray.push('&nbsp;');
  let mainDiv = document.getElementById('read-view');
  let k = 1;

  for (let i = 0; i < wordArray.length; i++) {
    t = setTimeout(() => {
      mainDiv.innerHTML = `${wordArray[i]}`;
    }, k * speed);
    k++;
  }
}

// function readerApp(string, speed) {
//   let wordArray = string.split(`\n`).map(el => el.split(' '));
//   wordArray[wordArray.length - 1].push('&nbsp;');
//   let mainDiv = document.getElementById('read-view');
//   let k = 1;

//   for (let i = 0; i < wordArray.length; i++) {
//     for (let j = 1; j <= wordArray[i].length; j++) {
//       t = setTimeout(() => {
//         mainDiv.innerHTML = `${wordArray[i][j - 1]}`;
//       }, k * speed);
//       k++;
//     }
//   }
// }

export function stopReading() {
  clearTimeout(t);
}

export default readerApp;
