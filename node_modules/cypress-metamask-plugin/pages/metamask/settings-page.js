const settingsPage = '.settings-page';
const advancedButton = `${settingsPage} button:nth-child(2)`;
const networksButton = `${settingsPage} button:nth-child(6)`;
const closeButton = `${settingsPage}__header__title-container__close-button`;
module.exports.settingsPageElements = {
  settingsPage,
  advancedButton,
  networksButton,
  closeButton,
};

const showTestnetToggleOn = '.settings-page__content-row:nth-child(7) .toggle-button--on input'
const showTestnetToggleOff = '.settings-page__content-row:nth-child(7) .toggle-button--off input'
const customNonceToggleOn =
  '[data-testid="advanced-setting-custom-nonce"] .toggle-button--on input';
const customNonceToggleOff =
  '[data-testid="advanced-setting-custom-nonce"] .toggle-button--off input';
const resetAccountButton =
  '[data-testid="advanced-setting-reset-account"] button';
module.exports.advancedPageElements = {
  showTestnetToggleOn,
  showTestnetToggleOff,
  customNonceToggleOn,
  customNonceToggleOff,
  resetAccountButton,
};

const nevermindButton = '.modal-container button:nth-child(1)';
const resetButton = '.modal-container button:nth-child(2)';
module.exports.resetAccountModalElements = {
  nevermindButton,
  resetButton,
};

const addNetworkButton = '.networks-tab__body button';
module.exports.networksPageElements = { addNetworkButton };

const networkNameInput = '.networks-tab__add-network-form-body .form-field:nth-child(1) input';
const rpcUrlInput = '.networks-tab__add-network-form-body .form-field:nth-child(2) input';
const chainIdInput = '.networks-tab__add-network-form-body .form-field:nth-child(3) input';
const symbolInput = '.networks-tab__add-network-form-body .form-field:nth-child(4) input';
const blockExplorerInput = '.networks-tab__add-network-form-body .form-field:nth-child(5) input';
const saveButton = '.networks-tab__add-network-form-footer button:nth-child(2):not([disabled])';
module.exports.addNetworkPageElements = {
  networkNameInput,
  rpcUrlInput,
  chainIdInput,
  symbolInput,
  blockExplorerInput,
  saveButton,
};
