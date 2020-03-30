/* disable-eslint */
import '@babel/polyfill';
import { signup, login, logout } from './login';
import {
  updateSettings,
  completeUserProfile,
  requestPacketMeal,
  requestMedicalCheckup,
  requestEmergencyHelp,
  makeDonation,
  requestVentilator,
  subscribeEmail
} from './updateSettings';
import { showAlert } from './alerts';

//DOM ELEMENTS
const loginForm = document.querySelector('.form--login');
const signUpForm = document.querySelector('.form--signup');
const createProfile = document.querySelector('.form-create-profile-data');
const updateProfile = document.querySelector('.form-update-profile-data');
const requestMeal = document.querySelector('.form-meal-data');
const suspected = document.querySelector('.form-suspect-data');
const reported = document.querySelector('.form-report-data');
const donate = document.querySelector('.form-donate-data');
const ventilator = document.querySelector('.form-ventilator-data');
const subscribe = document.getElementById('submit');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    //VALUES
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (signUpForm)
  signUpForm.addEventListener('submit', e => {
    e.preventDefault();
    //VALUES
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    signup(name, email, password, passwordConfirm);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });
if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (updateProfile)
  updateProfile.addEventListener('submit', async e => {
    e.preventDefault();
    const { targetId } = document.getElementById('target-id').dataset;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const contactNumber = document.getElementById('mobileNumber').value;
    const country = document.getElementById('country').value;
    const address = document.getElementById('address').value;
    const locality = document.getElementById('locality').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('city').value;
    const zipCode = document.getElementById('zip-code').value;

    await completeUserProfile(
      name,
      email,
      contactNumber,
      country,
      address,
      locality,
      city,
      state,
      zipCode,
      targetId,
      'update'
    );
  });

if (createProfile)
  createProfile.addEventListener('submit', async e => {
    e.preventDefault();
    const targetId = '';
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const contactNumber = document.getElementById('mobileNumber').value;
    const country = document.getElementById('country').value;
    const address = document.getElementById('address').value;
    const locality = document.getElementById('locality').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('city').value;
    const zipCode = document.getElementById('zip-code').value;

    await completeUserProfile(
      name,
      email,
      contactNumber,
      country,
      address,
      locality,
      city,
      state,
      zipCode,
      targetId,
      'create'
    );
  });

if (createProfile)
  createProfile.addEventListener('submit', async e => {
    e.preventDefault();
    const targetId = '';
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const contactNumber = document.getElementById('mobileNumber').value;
    const country = document.getElementById('country').value;
    const address = document.getElementById('address').value;
    const locality = document.getElementById('locality').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('city').value;
    const zipCode = document.getElementById('zip-code').value;

    await completeUserProfile(
      name,
      email,
      contactNumber,
      country,
      address,
      locality,
      city,
      state,
      zipCode,
      targetId,
      'create'
    );
  });

if (requestMeal)
  requestMeal.addEventListener('submit', async e => {
    e.preventDefault();
    const noOfPackage = document.getElementById('packet').value;

    await requestPacketMeal(noOfPackage);
  });

if (suspected)
  suspected.addEventListener('submit', async e => {
    e.preventDefault();
    const { targetId } = document.getElementById('suspect').dataset;
    const suspectFlag = document.getElementById('suspect').value;
    const suspected = false;
    if (suspectFlag === '') {
      suspected = true;
    }

    await requestMedicalCheckup(suspected, targetId);
  });

if (reported)
  reported.addEventListener('submit', async e => {
    e.preventDefault();
    const { targetId } = document.getElementById('report').dataset;
    const reportedFlag = document.getElementById('report').value;
    const reportMeToCoronaAuth = false;
    if (reportedFlag === '') {
      reportMeToCoronaAuth = true;
    }

    await requestEmergencyHelp(reportMeToCoronaAuth, targetId);
  });

if (donate)
  donate.addEventListener('submit', async e => {
    e.preventDefault();
    const donationAmount = document.getElementById('donate').value;

    if (donationAmount !== '') {
      await makeDonation(donationAmount);
    } else {
      showAlert('error', 'Please enter amount to donate');
    }
  });

if (ventilator)
  ventilator.addEventListener('submit', async e => {
    e.preventDefault();
    const requestorType = document.getElementById('type').value;
    const quantity = document.getElementById('quantity').value;

    if (requestorType !== '' && quantity !== '') {
      await requestVentilator(requestorType, quantity);
    } else {
      showAlert('error', 'Please provide the information.');
    }
  });

if (subscribe)
  subscribe.addEventListener('click', async e => {
    e.preventDefault();
    const email = document.getElementById('sub-email').value;

    if (email !== '') {
      await subscribeEmail(email);
    } else {
      showAlert('error', 'Please provide the correct email.');
    }
  });
