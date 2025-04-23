module.exports = {
  'umbraco-transfomer': {
    output: {
      mode: 'tags-split',
      target: './src/api/client.ts',
      baseUrl: 'http://localhost:23142/',
      schemas: './src/api/model',
      client: 'fetch',
      override: {
          mutator: {
              path: './src/custom-fetch.ts',
              name: 'customFetch',
          },
      },
    },
    input: {
      target: 'http://localhost:23142/umbraco/swagger/delivery/swagger.json',
    },
  },
  //this won't run whilst the umbraco ommunity poackage is present
  /*'engage-transfomer': { 
    output: {
      mode: 'tags-split',
      target: './src/api-engage/client.ts',
      baseUrl: 'http://localhost:23142/',
      schemas: './src/api-engage/model',
      client: 'fetch',
      override: {
          mutator: {
              path: './src/custom-fetch.ts',
              name: 'customFetch',
          },
      },
    },
    input: {
      target: 'http://localhost:23142/umbraco/swagger/engage-api/swagger.json?urls.primaryName=Umbraco+Engage+API',
    },
  },*/
  'clean-starter-transfomer': {
    output: {
      mode: 'tags-split',
      target: './src/api-clean/client.ts',
      baseUrl: 'http://localhost:23142/',
      schemas: './src/api-clean/model',
      client: 'fetch',
      override: {
          mutator: {
              path: './src/custom-fetch.ts',
              name: 'customFetch',
          },
      },
    },
    input: {
      target: 'http://localhost:23142/umbraco/swagger/clean-starter/swagger.json?urls.primaryName=Clean+starter+kit',
    },
  }
};