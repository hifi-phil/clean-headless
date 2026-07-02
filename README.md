## Clean Starter Kit Headless

This is a headless implementation of the [Clean Starter Kit](https://marketplace.umbraco.com/package/clean) by Paul Seal, built for Umbraco 18, using Next.js 16 and orval 8.19.

If you need the Umbraco 17 version, it can be found on the [v17/main branch](https://github.com/hifi-phil/clean-headless/tree/v17/main).

### Umbraco Setup
Firstly, you will need to create an instance of Umbraco with the Clean Starter Kit installed. Follow the instructions [here](https://github.com/prjseal/Clean). 

Follow the headless instructions in the readme to turn on headless endpoints.

Make sure the Delivery API is registered in `Program.cs`:

```csharp
builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddDeliveryApi()
    .AddComposers()
    .Build();
```

Also make sure the Delivery API is configured to generate content type schemas, otherwise the generated models used by this project won't match the API responses. In `appsettings.json`:

```json
"Umbraco": {
  "CMS": {
    "DeliveryApi": {
      "Enabled": true,
      "OpenApi": {
        "GenerateContentTypeSchemas": true
      }
    }
  }
}
```

### NextJs setup

Then you will need to add an env.local file that looks like this. Remember to change the port / url to point to the local instance of Umbraco

```
NEXT_PUBLIC_UMBRACO_BASE_URL=http://localhost:8888
NEXT_PUBLIC_SITE_URL=http://localhost:3000
UMBRACO_REVALIDATE_SECRET='SOMETHING_SECRET'
UMBRACO_REVALIDATE_ACCESS_CONTROL_ORIGIN="*"
```

Then, to run in dev mode

```
npm install
npm dev
```

### Regenerating models

The TypeScript models in `src/api` and `src/api-clean` are generated from the Umbraco Delivery API's OpenAPI schema using [orval](https://orval.dev), configured in `orval.config.js`. With your local Umbraco instance running, regenerate them with:

```
npm run generate
```

In dev mode where most caching is turned off. To see revalidation working correctly

```
npm build
npm start
```