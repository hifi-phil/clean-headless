## Clean Starter Kit Headless

This is a headless implementation of the [Clean Starter Kit](https://marketplace.umbraco.com/package/clean) by Paul Seal. 

### Umbraco Setup
Firstly, you will need to create an instance of Umbraco with the Clean Starter Kit installed. Follow the instructions [here](https://github.com/prjseal/Clean). 

Follow the headless instructions in the readme to turn on headless endpoints.

### NextJs setup

Then you will need to add an env.local file that looks like this. Remember to change the port / url to point to the local instance of Umbraco

```
NEXT_PUBLIC_UMBRACO_BASE_URL=http://localhost:8888
UMBRACO_REVALIDATE_SECRET='SOMETHING_SECRET'
UMBRACO_REVALIDATE_ACCESS_CONTROL_ORIGIN="*"
```

Then, to run in dev mode

```
npm install
npm dev
```

In dev mode where most caching is turned off. To see revalidation working correctly

```
npm build
npm start
```