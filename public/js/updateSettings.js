/* * eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

// type is either 'password' or 'data'
export const completeUserProfile = async (
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
  type
) => {
  try {
    const url =
      type === 'update'
        ? `http://127.0.0.1:3000/api/v1/profiles/${targetId}`
        : 'http://127.0.0.1:3000/api/v1/profiles';
    const method = type === 'update' ? 'PATCH' : 'POST';
    const res = await axios({
      method: method,
      url,
      data: {
        name,
        email,
        contactNumber,
        country,
        address,
        locality,
        city,
        state,
        zipCode
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', `Profile ${type.toUpperCase()}d successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const requestPacketMeal = async noOfPackage => {
  try {
    const url = 'http://127.0.0.1:3000/api/v1/meals';
    const res = await axios({
      method: 'POST',
      url,
      data: {
        noOfPackage
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Order placed successfully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const requestMedicalCheckup = async (suspected, targetId) => {
  try {
    const url = `http://127.0.0.1:3000/api/v1/profiles/${targetId}`;
    const res = await axios({
      method: 'PATCH',
      url,
      data: {
        suspected
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Reported successfully to COVID19 authority!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const requestEmergencyHelp = async (reportMeToCoronaAuth, targetId) => {
  try {
    const url = `http://127.0.0.1:3000/api/v1/profiles/${targetId}`;
    const res = await axios({
      method: 'PATCH',
      url,
      data: {
        reportMeToCoronaAuth
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Reported successfully to COVID19 authority!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const makeDonation = async donationAmount => {
  try {
    const url = `http://127.0.0.1:3000/api/v1/donation`;
    const res = await axios({
      method: 'POST',
      url,
      data: {
        donationAmount
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Hold on. we are processing...');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const requestVentilator = async (requestorType, quantity) => {
  try {
    const url = `http://127.0.0.1:3000/api/v1/ventilators`;
    const res = await axios({
      method: 'POST',
      url,
      data: {
        requestorType,
        quantity
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Your request has been submit successfully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const subscribeEmail = async email => {
  try {
    const url = `http://127.0.0.1:3000/api/v1/subscribe`;
    const res = await axios({
      method: 'POST',
      url,
      data: {
        email
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'You have subscribed email updates successfully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
