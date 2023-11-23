export const categories = [
  { id: 1, label: 'APP_STORE_CATEGORY_FILTER_1', value: 'application', selected: false },
  { id: 2, label: 'APP_STORE_CATEGORY_FILTER_2', value: 'game', selected: false },
];

export const appDetailsTabs = ['description', 'tags'];

export const footerSocialMediasLinks = [
  { id: 1, href: 'https://twitter.com/DeployOnStackOS', icon: 'fa-brands fa-twitter' },
  { id: 2, href: 'https://t.me/StackOS', icon: 'fa-brands fa-telegram' },
  { id: 3, href: 'https://discord.com/invite/W3phTcR8sS', icon: 'fa-brands fa-discord' },
];

export const footerAnotherLinks = [
  {
    id: 1,
    href: 'https://docsend.com/view/wq7qxzjk7zsd3wph',
    icon: 'fa-file',
    text: 'FOOTER_WHITEPAPER',
  },
  {
    id: 2,
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSfGc3NfXiRfjnMNLQOoE-jVGkmIqdyYemOSBQg6lq5eTd5dQw/viewform',
    icon: 'fa-user-tie',
    text: 'FOOTER_AMBASSADOR',
  },
];

export const sortOptions = [
  {
    id: 1,
    type: '-name',
    title: 'A-Z',
    subtitle: '',
  },
  {
    id: 2,
    type: 'name',
    title: 'Z-A',
    subtitle: '',
  },
  {
    id: 3,
    type: 'last_updated',
    title: 'Newest',
    subtitle: '',
  },
  {
    id: 4,
    type: '-last_updated',
    title: 'Oldest',
    subtitle: '',
  },
];
