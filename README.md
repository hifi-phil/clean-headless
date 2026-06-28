## Clean Starter Kit Headless

This is a headless implementation of the [Clean Starter Kit](https://marketplace.umbraco.com/package/clean) by Paul Seal.

> **Targets Umbraco 18.** In Umbraco 18 the OpenAPI document moved from
> `/umbraco/swagger/{documentName}/swagger.json` to `/umbraco/openapi/{documentName}.json`
> and is now OpenAPI 3.1 (Swashbuckle was replaced by `Microsoft.AspNetCore.OpenApi`).
> The orval client generation (`orval.config.js`) and the `orval` dependency (v8+, which
> parses OpenAPI 3.1) have been updated accordingly. See **Umbraco 18 / OpenAPI notes**
> below for two important consequences for client generation.

### Umbraco Setup
Firstly, you will need to create an instance of Umbraco (v18) with the Clean Starter Kit installed. Follow the instructions [here](https://github.com/prjseal/Clean).

Follow the headless instructions in that readme to turn on the headless endpoints — you must enable the **Content Delivery API** (`Umbraco:CMS:DeliveryApi:Enabled = true`, plus `.AddDeliveryApi()` in `Program.cs`). For local development without an API key, also set `Umbraco:CMS:DeliveryApi:PublicAccess = true`.

### NextJs setup

Then you will need to add a `.env.local` file that looks like this. Remember to change the port / url to point to your local instance of Umbraco.

```
NEXT_PUBLIC_UMBRACO_BASE_URL=https://localhost:44339
UMBRACO_REVALIDATE_SECRET='SOMETHING_SECRET'
UMBRACO_REVALIDATE_ACCESS_CONTROL_ORIGIN="*"
```

Then, to run in dev mode

```
npm install
npm run dev
```

In dev mode most caching is turned off. To see revalidation working correctly

```
npm run build
npm run start
```

### Regenerating the API clients

The typed API clients in `src/api` (Delivery API) and `src/api-clean` (Clean Starter Kit) are
generated from Umbraco's OpenAPI documents. With your Umbraco 18 instance running:

```
npm run generate
```

This reads `orval.config.js`, which points at the Umbraco 18 endpoint
`/umbraco/openapi/delivery.json` on `NEXT_PUBLIC_UMBRACO_BASE_URL`.

### Umbraco 18 / OpenAPI notes

Two things changed with Umbraco 18's switch to `Microsoft.AspNetCore.OpenApi`, and both
affect *code generation only* — the runtime endpoints and their JSON are unchanged, so the
committed clients in `src/api` / `src/api-clean` remain correct against an Umbraco 18 instance.

1. **The Delivery API document no longer emits typed, per-content-type models.**
   In Umbraco 17 the document included strongly-typed schemas such as
   `HomeContentResponseModel`, `ArticleContentResponseModel`, `SEocontrolsContentResponseModel`,
   etc. (with typed `properties`). Umbraco 18 emits only the generic `IApiContentResponseModel`
   /`PagedIApiContentResponseModel`, where `properties` is untyped (`object`). This frontend
   relies on those typed models in ~18 files, so the **committed, typed `src/api` client is
   retained** rather than regenerated down to untyped models. The `delivery` orval transformer
   stays configured against the v18 endpoint for the day Umbraco restores typed-model emission.

2. **The Clean Starter Kit (`clean-starter`) document is currently empty.**
   The `Clean.Headless` API controllers declare
   `[ApiExplorerSettings(GroupName = "Search"/"Translation"/"Contact")]` alongside
   `[MapToApi("clean-starter")]`. Under Umbraco 18's OpenAPI, document inclusion is driven by
   `GroupName`, so none of the operations match the `clean-starter` document and
   `/umbraco/openapi/clean-starter.json` comes back with an empty `paths`. Regenerating from it
   would wipe the working client, so the `clean-starter` transformer is **disabled** in
   `orval.config.js` and the committed `src/api-clean` client is retained. The underlying
   `/api/v1/{search,dictionary,contact}` endpoints are unchanged and work at runtime.
   *Server-side fix (in the Clean.Headless package): remove the conflicting
   `[ApiExplorerSettings(GroupName = ...)]` or configure the `clean-starter` document's
   `ShouldInclude` predicate to match controllers mapped to it.*
