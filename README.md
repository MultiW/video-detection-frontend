# Video Stream Event Monitoring

## **Project Structure**

## **Building and Running**
Run the application by opening ```index.html``` in the browser.
***
If you made any changes to the code, run those changes using ```npm start```.

When new featuers are complete, deploy the latest changes to the code:
```bash
cd ui
npm run build
cp -r build/* .. # move finalized index.html file to the root folder
```

## **Development Environment Setup**
#### **Dependencies**
Operating system: Mac, Linux, Windows (WSL 2 only)

1. Install Node.js and ```npm```

2. Install UI dependencies

```bash
cd ui
npm install
```

#### **IDE Setup**
We use Visual Studio Code (VS Code) for development.

Open the project root in VS Code.

Set up automatic linting in your IDE:
1. In the VS Code marketplace, install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

2. Make sure that the **Code Actions on Save** configuraiton in **Settings** is configured as such:
```js
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true // automatically fix basic lint after file save
},
...
"eslint.validate": [
    "typescript",
    "typescriptreact"
]
...
```

## **Improvements**

#### **Receiving New Event Updates**