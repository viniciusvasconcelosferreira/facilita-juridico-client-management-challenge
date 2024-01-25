const removePhoneMask = (phoneNumber) => {
  return phoneNumber.replace(/\D/g, '');
};

module.exports = { removePhoneMask };