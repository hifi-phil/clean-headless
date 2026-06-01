require('dotenv').config({ path: '.env.local' });

const baseUrl = process.env.NEXT_PUBLIC_UMBRACO_BASE_URL ?? 'http://localhost:23142';

module.exports = {
  'umbraco-transfomer': {
    output: {
      mode: 'tags-split',
      target: './src/api/client.ts',
      baseUrl: `${baseUrl}/`,
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
      target: `${baseUrl}/umbraco/swagger/delivery/swagger.json`,
    },
  },
  //this won't run whilst the umbraco ommunity poackage is present
  /*'engage-transfomer': { 
    output: {
      mode: 'tags-split',
      target: './src/api-engage/client.ts',
      baseUrl: `${baseUrl}/`,
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
      target: `${baseUrl}/umbraco/swagger/engage-api/swagger.json?urls.primaryName=Umbraco+Engage+API`,
    },
  },*/
  'clean-starter-transfomer': {
    output: {
      mode: 'tags-split',
      target: './src/api-clean/client.ts',
      baseUrl: `${baseUrl}/`,
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
      target: `${baseUrl}/umbraco/swagger/clean-starter/swagger.json?urls.primaryName=Clean+starter+kit`,
    },
  }
};