const fetch = require('node-fetch');
const fs = require('fs');

fetch(`http://localhost:4000/graphql`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTU5MTM3OTcwMCwiZXhwIjoxNjA2OTMxNzAwfQ.iY85xpja9IeheVYvhxapZoX8VHCSzDr63-sg5-gADAc',
  },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then((result) => result.json())
  .then((result) => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter((type) => type.possibleTypes !== null);
    result.data.__schema.types = filteredData;
    fs.writeFile('./src/app/fragmentTypes.json', JSON.stringify(result.data), (err) => {
      if (err) {
        console.error('Error writing fragmentTypes file', err);
      } else {
        console.log('Fragment types successfully extracted!');
      }
    });
  });
