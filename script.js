const Stack = require('./Stack.js');
const prompt = require('prompt-sync')();
// ------------------------------
// Initialization
// ------------------------------
  //models the history of visited pages
  const backPages = new Stack();
  //models the pages that get moved when an old page from backPages stack is revisited
  const nextPages = new Stack();
  //setting default page to global variable
  let currentPage = 'The Beginning';
// ------------------------------
// Helper Functions
// ------------------------------
showCurrentPage = (action) => {
  //displays the action taken, based on user input
  console.log(`\n${action}`);
  //displays the current page
  console.log(`Current Page = ${currentPage}`);
  //displays the top element of backPages stack
  console.log(`Back Page = `, backPages.peek());
  //displays the top element of the nextPages stack
  console.log(`Next Page = `, nextPages.peek());
}

newPage = (page) => {
  backPages.push(currentPage);
  currentPage = page;
  // clear the nextPage stack
  while (!nextPages.isEmpty()) {
    nextPages.pop();
  }
  showCurrentPage("New: ");
}

backPage = () => {
  nextPages.push(currentPage);
  currentPage = backPages.pop();
  showCurrentPage("Back: ");
}

nextPage = () => {
  backPages.push(currentPage);
  currentPage = nextPages.pop();
  showCurrentPage("Next: ");
}


/*
 * The following strings are used to prompt the user
 */
const baseInfo = '\nEnter a url';
const backInfo = 'B|b for back page';
const nextInfo = 'N|n for next page';
const quitInfo = 'Q|q for quit';
const question = 'Where would you like to go today? '

// ------------------------------
// User Interface Part 1
// ------------------------------
let finish = false;
let showBack = false;
let showNext = false; 
showCurrentPage('Default: ');
while (finish === false) {
  let instructions = baseInfo;
  if (backPages.peek() != null) {
    instructions = `${instructions}, ${backInfo}`;
    showBack = true;
  } else {
    showBack = false;
  }
}
  if(nextPages.peek() != null) {
    instructions = `${instructions}, ${nextInfo}`;
    showNext = true;
  } else {
    showNext = false;
  }
  instructions = `${instructions}, ${quitInfo}.`
  console.log(instructions);
  // ------------------------------
  // User Interface Part 2
  // ------------------------------
const answer = promt(question);
const lowerCaseAnswer = answer.toLowerCase();
if ((lowerCaseAnswer !== 'n') && (lowerCaseAnswer !== 'b') && (lowerCaseAnswer !== 'q')) {
  // will create a new page based on the url
  newPage(answer);
} else if ((showNext === true) && (lowerCaseAnswer === 'n')) {
  // will navigate forward a page
  nextPage();
} else if ((showBack === true) && (lowerCaseAnswer === 'b')) {
  // will navigate back a page
  backPage();
} else if (lowerCaseAnswer === 'b') {
  // invalid input to a non-available option
  console.log('Cannot go back a page. Stack is empty');
} else if (lowerCaseAnswer === 'n') {
  // invalid input to a non-available option
  console.log('Cannot go to the next page. Stack is empty.');
} else if (lowerCaseAnswer = 'q') {
  // will quit the program
  finish = true;
}

