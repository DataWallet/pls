# PLS
## The most polite way to access your users' data.

Stands for _Permissioned Local Storage_ and is your companion to interact with Datawallet 3.0 and get access to your users' data ethically.

## 🛠 Installation

```
npm install @datawallet/pls --save
```
or
```
yarn add @datawallet/pls
```

## 🏖 How does it work?

This library currently exposes 3 methods: `authorize`, `query` and a utilitary function `isAvailable`. It is written in [Typescript](https://www.typescriptlang.org/) and has typings available for further documentation.

### Authorize

`authorize` takes a single `string` argument in the form of a [GraphQL query](https://graphql.org/learn/) and returns a `Promise<ISignedQuery>`. The full documentation of the schemas is available here: [https://docs.datawallet.com](https://docs.datawallet.com).

⚠️ It is important to note that `authorize` **will throw** if the user denies consent or something else fails. ⚠️

### Query

`query` takes a single `ISignedQuery` argument which is an opaque signed query object and returns a `Promise<any>` the same shape of your GraphQL query.

### Is available

`isAvailable` returns a `boolean` indicating if Datawallet 3.0 is installed or not.

## 👌 Basic Usage

```js
import pls from '@datawallet/pls';

if (!pls.isAvailable()) {
    // show some call to action to your user to install Datawallet 3.0
    // and give feedback.
    return;
}

const signedQuery = await pls.authorize(`
    datawallet {
        userId
    }
`);
// authorize ~= {query: "datawallet { userId }}", signature: "..."}

const data = await pls.query(signedQuery);
// data ~= {datawallet: {userId: "..."}}

// or
const {datawallet: {userId}} = await pls.query(signedQuery);
// userId ~= "...";
```


## 🚀 Complete walkthrough and demo

If this wasn't sufficient, you can check this [document](https://docs.google.com/document/d/122Bs2WMHpW9g4ptQqhxWNHud6tZij8B_5svMAFuYkp0/edit?usp=sharing) to read a complete walkthrough as well as some examples
