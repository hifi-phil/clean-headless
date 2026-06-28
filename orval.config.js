require('dotenv').config({ path: '.env.local' });

// Set NEXT_PUBLIC_UMBRACO_BASE_URL in .env.local to point at your Umbraco 18 instance.
// The fallback below is only used when that env var is not set.
const baseUrl = process.env.NEXT_PUBLIC_UMBRACO_BASE_URL ?? 'https://localhost:44339';

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
      // Umbraco 18 moved the OpenAPI document from
      // /umbraco/swagger/{documentName}/swagger.json to
      // /umbraco/openapi/{documentName}.json (now OpenAPI 3.1).
      target: `${baseUrl}/umbraco/openapi/delivery.json`,
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
      target: `${baseUrl}/umbraco/openapi/engage-api.json`,
    },
  },*/
  // The Clean Starter Kit custom API (search / dictionary / contact).
  //
  // DISABLED on Umbraco 18: the /umbraco/openapi/clean-starter.json document is
  // emitted with an empty "paths" object, so regenerating from it would wipe the
  // working client. Root cause is server-side in the Clean.Headless package: its
  // controllers declare [ApiExplorerSettings(GroupName = "Search"/"Translation"/
  // "Contact")] which, under Umbraco 18's Microsoft.AspNetCore.OpenApi (Swashbuckle
  // was removed), no longer matches the "clean-starter" document and excludes every
  // operation. The committed src/api-clean clients are kept as-is — the underlying
  // /api/v1/* endpoints are unchanged and work at runtime. Re-enable this block once
  // the Clean.Headless OpenAPI document includes its operations again.
  /*'clean-starter-transfomer': {
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
      target: `${baseUrl}/umbraco/openapi/clean-starter.json`,
    },
  }*/
};