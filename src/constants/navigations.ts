import CDN_URL from '@/constants/cdn';

const navigations = [
  { title: 'Home', path: '/', image: 'ab1102c1fc0cd08d1bac083cff22f4b1.jpg' },
  {
    title: 'Games',
    path: '/games',
    image: '908a56aac10898fd5eda26cb234fa947.jpg',
  },
  {
    title: 'Gourmets',
    path: '/gourmets',
    image: '1cba3a95dc2e72952e39d8659b93f4b4.jpg',
  },
  {
    title: 'Hearthstone',
    path: '/hearthstone',
    image: '34bb10ad54a1f320a5dba304dc0fc44c.jpg',
  },
];

export default navigations.map(item => ({
  ...item,
  image: `${CDN_URL}${item.image}`,
}));
