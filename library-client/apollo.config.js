module.exports = {
  client: {
    service: {
      name: 'library-server',
      url: 'http://localhost:4000/graphql',
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTU4OTM5NjI0NSwiZXhwIjoxNjA0OTQ4MjQ1fQ.wm2W6j8OesQYv7BjYpqCxEXM0E4QVDGfwTSphTD2oVk',
      },
    },
  },
};
