// // import React from 'react';
// // import readerApp from './readerApp';
// // import EventEmitter from 'events';
// let state = {
//   currentParagraph: 1,
//   text:
//     'This extension is designed to help you read faster than you ever knew you could. Just paste your text here, or select text on a webpage and see how fast you can read!',
// };

// //get textbox
// const textField = document.getElementById('text-input');
// textField.innerHTML = state.text;
// //set textbox to be highlighted text
// chrome.tabs.executeScript(
//   {
//     code: 'window.getSelection().toString();',
//   },
//   function(selection) {
//     console.log(selection);
//     if (selection[0]) {
//       textField.innerHTML = selection[0];
//     }
//   }
// );

// state.text = textField.innerHTML;

// alert(state.text);
// const currentParagraph = document.getElementById('currentParagraph');
// currentParagraph.innerHTML = state.currentParagraph;
// const totalNumberOfParagraphs = document.getElementById(
//   'totalNumberOfParagraphs'
// );
// totalNumberOfParagraphs.innerHTML = state.text
//   .split('\n')
//   .map(el => el.split(' ')).length;

function readerApp(string, speed) {
  // textareaButton.disabled = true;

  let wordArray = string.split(`\n`).map(el => el.split(' '));
  alert(wordArray);
  wordArray[wordArray.length - 1].push('&nbsp;');
  let mainDiv = document.getElementById('read-view');
  let k = 1;

  for (let i = 0; i < wordArray.length; i++) {
    for (let j = 1; j <= wordArray[i].length; j++) {
      setTimeout(() => {
        if (wordArray[i].length < 2 && wordArray[i][0] === '') {
          alert('Click OK, or press ENTER to read the next paragraph');
        } else {
          mainDiv.innerHTML = `${wordArray[i][j - 1]}`;
        }
      }, k * speed);
      k++;
    }
  }
  // textareaButton.disabled = false;
}

// const highlightedTextButton = document.getElementById('highlightedTextButton');
// const textareaButton = document.getElementById('textareaButton');

// textareaButton.addEventListener('click', function() {
//   let inputText = textField.value;
//   let inputSpeed = document.getElementById('text-speed').value;

//   readerApp(inputText, inputSpeed);
// });

export default readerApp;
