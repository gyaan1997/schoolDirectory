export default {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/addSchool',
        permanent: true,
      },
    ];
  },
};