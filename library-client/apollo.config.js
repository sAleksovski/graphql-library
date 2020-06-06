module.exports = {
  client: {
    service: {
      name: 'library-server',
      url: 'http://localhost:4000/graphql',
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTU5MTM3OTcwMCwiZXhwIjoxNjA2OTMxNzAwfQ.iY85xpja9IeheVYvhxapZoX8VHCSzDr63-sg5-gADAc',
      },
    },
  },
};
