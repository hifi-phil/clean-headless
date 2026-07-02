## Clean Starter Kit Headless

This is a headless implementation of the [Clean Starter Kit](https://marketplace.umbraco.com/package/clean) by Paul Seal. 

### Version Notes

- This branch is for Umbraco v17 Headless.
- Umbraco v18 is in the `main` branch.
- Next.js version: ^16.2.9
- Orval version: ^8.19.0

### Umbraco Setup
[](https://github.com/hifi-phil/clean-headless#umbraco-setup)
Firstly, you will need to create an instance of Umbraco with the Clean Starter Kit installed. Follow the instructions [here](https://github.com/prjseal/Clean).

Follow the headless instructions in the readme to turn on headless endpoints.

Make sure the Delivery API is registered in `Program.cs`:

```
builder.CreateUmbracoBuilder()
	.AddBackOffice()
	.AddWebsite()
	.AddDeliveryApi()
	.AddComposers()
	.Build();
```

And make sure this is enabled in your app settings:

```
"Umbraco": {
  "CMS": {
    "DeliveryApi": {
      "Enabled": true
    }
  }
}   
```

Also install `Umbraco.Community.DeliveryApiExtensions`in your Umbraco project to generate the full doctype schemas:

```
dotnet add package Umbraco.Community.DeliveryApiExtensions
```

### NextJs setup
[](https://github.com/hifi-phil/clean-headless#nextjs-setup)
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
[](https://github.com/hifi-phil/clean-headless#regenerating-models)
The TypeScript models in `src/api` and `src/api-clean` are generated from the Umbraco Delivery API's OpenAPI schema using [orval](https://orval.dev/), configured in `orval.config.js`. With your local Umbraco instance running, regenerate them with:

```
npm run generate
```

In dev mode where most caching is turned off. To see revalidation working correctly

```
npm build
npm start
```