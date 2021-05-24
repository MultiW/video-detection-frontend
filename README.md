# Video Stream Event Monitoring

## **What's Next?**
How can we extend this project to become a real product?

## **Immediate Improvements**

#### Styling

#### Receiving new event updates

#### Events table should use lazy loading

## **Technology Stack**
This project is written using React and TypeScript. It's a ```create-react-app``` project.

Notably, Material UI is used to style the application.

To support development, Visual Studio Code is the preferred IDE and ESlint and Prettier were used to enforce linting.

## **Project Structure**
The UI code is located in ```src```.

## **Development Notes**
#### **Dependencies**
Operating system: Mac, Linux, Windows (WSL 2 only)

1. Install Node.js and ```npm```
2. Install UI dependencies

```bash
cd ui
npm install
```

#### **Building and Running**

There are two ways to run the project: 

1. Run the application by opening ```index.html``` in the browser
2. Use ```npm start```

To build new changes to the html files, run the following:
```bash
cd ui
npm run build && npx gulp
cp -r build/* ../
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