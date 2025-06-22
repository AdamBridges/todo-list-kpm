# To Do List

A simple To Do List program developed by Adam Bridges. Users can create, edit, and delete tasks from within their browser.

## Install Instructions:

1. Download and install [Node.js](https://nodejs.org/en/).
1. Download or clone this repo.
2. Open your Command Line Interface (CLI) and navigate to where you downloaded/cloned the project files (`cd <insert your path to the project folder here>`). 
3. Run the following command in the CLI from the project's directory (`~\todo-list-kpm`) to install the necessary packages to compile the To Do List:

[Next.js](https://nextjs.org/docs/app/getting-started/installation) (React Framework)
```bash 
npm i next@latest react@latest react-dom@latest
```

4. Once packages are installed, run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to use the To Do List.

### Testing:

To test that adding, editing, and deleting a task functions and are rendered as intended, run the following:

```bash
npm run test
```

## Troubleshooting:

Should any issues occur with compiling the program, ensure that the following packages are installed:

[TypeScript](https://react.dev/learn/typescript)
```bash 
npm install @types/react @types/react-dom
```

[Mantine](https://mantine.dev/guides/next/) (UI Framework)
```bash 
npm install @mantine/core @mantine/hooks
npm install --save-dev postcss postcss-preset-mantine postcss-simple-vars
```

[Jest](https://nextjs.org/docs/app/guides/testing/jest) (Testing packages)
```bash 
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest
```
