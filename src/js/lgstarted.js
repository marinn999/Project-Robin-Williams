import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { modal } from './pop-up';

const formSection = document.querySelector('.form-section-right');
const valueEmail = document.querySelector('.value-email');
const inputFormValue = document.querySelector('#user-email');
const checkMark = document.querySelector('.checkmark');
const messageField = document.querySelector('#user-comment');
const nameField = document.querySelector('#user-name');

// validate form functions

const validateEmail = (emailPattern, email) => {
  if (!emailPattern.test(email)) {
    checkMark.style.display = 'none';
    valueEmail.style.display = 'block';
    inputFormValue.style.color = '#e74a3b';
  } else {
    checkMark.style.display = 'block';
    valueEmail.style.display = 'none';
    inputFormValue.style.color = '#FFF';
  }
};

const validateName = (namePattern, name) => {
  if (!namePattern.test(name) || name === '') {
    nameField.style.borderColor = '#e74a3b';
    iziToast.error({
      title: 'OOPS',
      message: 'Please enter a valid name.',
      position: 'topRight',
    });
    return false;
  } else {
    nameField.style.borderColor = '#FFF';
    return true;
  }
};

formSection.addEventListener('submit', async evt => {
  evt.preventDefault();

  const email = formSection.elements['user-email'].value.trim();
  const message = formSection.elements['user-comment'].value.trim();
  const emailPattern = new RegExp(
    sendForm.elements['user-email'].getAttribute('pattern')
  );
  const name = formSection.elements['user-name'].value.trim();
  const namePattern = new RegExp(
    formSection.elements['user-name'].getAttribute('pattern')
  );
  const isNameValid = validateName(namePattern, name);
  validateEmail(emailPattern, email);

  if (!emailPattern.test(email)) {
    iziToast.error({
      title: 'OOPS',
      message: 'Please enter a valid email address.',
      position: 'topRight',
    });
    return;
  }

  if (message === '' || email === '' || !isNameValid) {
    iziToast.error({
      title: 'OOPS',
      message: 'Message field, email and name cannot be empty or invalid.',
      position: 'topRight',
    });
    return;
  }

  // POST question
  try {
    const response = await axios.post(
      'https://portfolio-js.b.goit.study/api/requests',
      {
        email: email,
        comment: message,
        name: name,
      }
    );

    if (response.status === 201) {
      formSection.reset();
      checkMark.style.display = 'none';
      modal();
    } else {
      throw new Error(response.data.message || 'Unknown error');
    }
  } catch (error) {
    iziToast.error({
      title: 'error',
      message:
        error.response?.data?.message || error.message || 'Unknown error',
      position: 'topRight',
    });
  }
});

messageField.addEventListener('focus', validateEmail);
formSection.elements['user-email'].addEventListener('blur', validateEmail);
formSection.elements['user-name'].addEventListener('blur', validateName);

// import axios from 'axios';
// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';
// import { modal } from './pop-up';

// const formSection = document.querySelector('.form-section-right');
// const valueEmail = document.querySelector('.value-email');
// const inputFormValue = document.querySelector('#user-email');
// const checkMark = document.querySelector('.checkmark');
// const messageField = document.querySelector('#user-comment');
// const nameField = document.querySelector('#user-name');

// const getFieldValue = fieldName => formSection.elements[fieldName].value.trim();
// const getFieldPattern = fieldName =>
//   new RegExp(formSection.elements[fieldName].getAttribute('pattern'));

// const validateEmail = emailPattern => {
//   const email = getFieldValue('user-email');

//   if (!emailPattern.test(email)) {
//     checkMark.style.display = 'none';
//     valueEmail.style.display = 'block';
//     inputFormValue.style.color = '#e74a3b';
//     return false;
//   } else {
//     checkMark.style.display = 'block';
//     valueEmail.style.display = 'none';
//     inputFormValue.style.color = '#292929';
//     return true;
//   }
// };

// const validateName = namePattern => {
//   const name = getFieldValue('user-name');

//   if (!namePattern.test(name) || name === '') {
//     nameField.style.borderColor = '#e74a3b';
//     iziToast.error({
//       title: 'OOPS',
//       message: 'Please enter a valid name.',
//       position: 'topRight',
//     });
//     return false;
//   } else {
//     nameField.style.borderColor = '#292929';
//     return true;
//   }
// };

// const showErrorMessage = message => {
//   iziToast.error({
//     title: 'OOPS',
//     message: message,
//     position: 'topRight',
//   });
// };

// formSection.addEventListener('submit', async e => {
//   e.preventDefault();

//   const email = getFieldValue('user-email');
//   const message = getFieldValue('user-comment');
//   const name = getFieldValue('user-name');
//   const emailPattern = getFieldPattern('user-email');
//   const namePattern = getFieldPattern('user-name');

//   const isEmailValid = validateEmail(emailPattern);
//   const isNameValid = validateName(namePattern);

//   if (!isEmailValid) {
//     showErrorMessage('Please enter a valid email address.');
//     return;
//   }

//   if (message === '' || !isNameValid) {
//     showErrorMessage(
//       'Message field, email, and name cannot be empty or invalid.'
//     );
//     return;
//   }

//   try {
//     const response = await axios.post(
//       'https://portfolio-js.b.goit.study/api/requests',
//       { email, comment: message, name }
//     );

//     if (response.status === 201) {
//       formSection.reset();
//       checkMark.style.display = 'none';
//       modal();
//     } else {
//       throw new Error(response.data.message || 'Unknown error');
//     }
//   } catch (error) {
//     showErrorMessage(
//       error.response?.data?.message || error.message || 'Unknown error'
//     );
//   }
// });

// messageField.addEventListener('focus', () =>
//   validateEmail(getFieldPattern('user-email'))
// );
// formSection.elements['user-email'].addEventListener('blur', () =>
//   validateEmail(getFieldPattern('user-email'))
// );
// formSection.elements['user-name'].addEventListener('blur', () =>
//   validateName(getFieldPattern('user-name'))
// );
