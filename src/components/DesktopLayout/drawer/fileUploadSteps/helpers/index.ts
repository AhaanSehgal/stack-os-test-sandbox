export const fileResourceOptions = [
  { id: 0, resTypeId: 5, name: 'IPFS', icon: 'ipfs' },
  { id: 1, resTypeId: 6, name: 'Google Cloud', icon: 'google-cloud' },
  { id: 2, resTypeId: 7, name: 'Amazon S3', icon: 'amazon-s3' },
];

// TODO : filter available subnets
export const fileSubnetList = [
  // {
  //   subnetName: 'syncopy',
  //   subnetID: '3',
  // },
  // {
  //   subnetName: 'stellar',
  //   subnetID: '4',
  // },
  // {
  //   subnetName: 'stack-files',
  //   subnetID: '5',
  // },
  {
    subnetName: 'matrix',
    subnetID: '1',
  },
];

export const fileSubnetServices = {
  syncopy: ['ipfs', 'google-cloud', 'amazon-s3'],
  stellar: ['gcp', 'amazon-s3'],
  'stack-files': ['ipfs'],
  matrix: ['ipfs', 'google-cloud', 'amazon-s3'],
};
