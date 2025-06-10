module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/about-page',
      handler: 'about-page.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/about-page',
      handler: 'about-page.update',
      config: {
        policies: [], // Add auth policies if needed
        middlewares: [],
      },
    },
  ],
};