// document.addEventListener('DOMContentLoaded', () => {
// const retrievedAffirmation = chrome.storage.local.get('affirmation');
// console.log(retrievedAffirmation);
// const createNotification = (affirmationText) => {
//   const notificationID = 'notification_ID';
//   chrome.notifications.create(
//     notificationID,
//     {
//       type: 'basic',
//       title: 'Affirmation time',
//       message: affirmationText,
//       priority: 2,
//     },
//     () => {
//       setTimeout(() => {
//         chrome.notifications.clear(notificationID);
//       }, 1000);
//     }
//   );
// };

//   // refers to the toggle
//   const toggleSwitch = document.getElementById('toggleContainer');
//   // refers to the location that the affirmation will pop up
//   // NEEDS TO BE CHANGED TO THE NEW POPUP WINDOW
//   // wait until switch is toggled on
//   // let popupWindow;
//   toggleSwitch.addEventListener('change', () => {
//     // if it's on, append text to the affirmation text location
//     if (toggleSwitch.checked) {
//       createNotification(retrievedAffirmation);
//       // popupWindow = window.open(
//       //   'popup.html',
//       //   'affirmation pop up',
//       //   'width=400,height=200'
//       // );
//       // popupWindow.onload = () => {
//       //   const affirmationDiv = document.createElement('div');
//       //   affirmationDiv.id = 'affirmation-container';
//       //   affirmationDiv.style.position = 'fixed';
//       //   affirmationDiv.style.bottom = '10px';
//       //   affirmationDiv.style.right = '10px';
//       //   affirmationDiv.style.padding = '10px';
//       //   affirmationDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
//       //   affirmationDiv.style.borderRadius = '5px';
//       //   affirmationDiv.style.fontFamily = 'Arial, sans-serif';
//       //   affirmationDiv.style.fontSize = '14px';
//       //   affirmationDiv.style.zIndex = '10000'; // Ensures it stays on top of the page
//       //   affirmationDiv.style.display = 'none'; // Hidden initially
//       //   updateAffirmation(affirmationDiv);
//       //   document.body.appendChild(affirmationDiv);
//       // };
//     } else {
//       console.log('nothing');
//     }
//   });
// });

// create div to display the affirmation
const affirmationDiv = document.createElement('div');
affirmationDiv.id = 'affirmation-container';
affirmationDiv.style.position = 'fixed';
affirmationDiv.style.bottom = '20px';
affirmationDiv.style.right = '20px';
affirmationDiv.style.padding = '15px';
affirmationDiv.style.background = 'linear-gradient(to right,#ffafbd,#ffdca0)';
affirmationDiv.style.width = '200px';
affirmationDiv.style.height = 'auto';
affirmationDiv.style.borderRadius = '20px';
affirmationDiv.style.textAlign = 'center';
affirmationDiv.style.color = '#333';
affirmationDiv.style.fontFamily = '"Comic Sans MS", "Comic Sans", cursive';
affirmationDiv.style.fontSize = '14px';
affirmationDiv.style.transition = 'opacity 1s ease-in-out';
affirmationDiv.style.zIndex = '10000'; // Ensures it stays on top of the page
affirmationDiv.style.display = 'none'; // Hidden initially

document.body.appendChild(affirmationDiv);

// function to update the affirmation
function updateAffirmation() {
  chrome.runtime.sendMessage({ action: 'getAffirmation' }, function (response) {
    console.log('sending get message');
    if (response.affirmation) {
      affirmationDiv.innerText = response.affirmation;
      affirmationDiv.style.display = 'block'; // Show the affirmation
    }
  });
}

// display a new affiramtion every 1 min????
// listen for message from the background script
updateAffirmation();
setInterval(updateAffirmation, 5000);
