_This repository was generated from the [`react-ts-starter`](https://github.com/jlumbroso/react-ts-starter) template of a React/TypeScript/GitHub Pages app repository. Visit that repository to learn more how to get started in self-hosted React with just a click of a button._

# Wordle React Clone

This repository contains a clone of the popular Wordle game in React, as spec'ed out and narrated by [@machadop1407](https://github.com/machadop1407) (see the [repo](https://github.com/machadop1407/Wordle-Clone-React/) and [corresponding video tutorial](https://www.youtube.com/watch?v=WDTNwmXUz2c&ab_channel=PedroTech)). The original project in is JavaScript, and this repository is in TypeScript, so some care was taken to ensure general correctness of the types — and `// @ts-ignore` is used as a temporary placeholders in some places.

| ![](https://raw.githubusercontent.com/jlumbroso/wordle-react-clone/master/public/screenshot-wordle-v1-a.png) | ![](https://raw.githubusercontent.com/jlumbroso/wordle-react-clone/master/public/screenshot-wordle-v1-b.png) |
| :----------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------: |

## Design Notes

Here are some of the things I changed with respect to the original tutorial.

- The originally provided word bank only contains about 2315 five-letter words, and omits a lot of plurals. This project now uses the New York Times word bank (this is the original Wordle word bank, [with some spring cleaning](https://arstechnica.com/gaming/2022/02/heres-how-the-new-york-times-changed-wordle/)), and [splits the lists](https://github.com/jlumbroso/wordle-react-clone/blob/4b6add69e63412ca5ddae7ed123bbb48f6d2aa06/src/helpers.tsx#L130-L144) into a set of "common" words from which to draw solutions, and a set of "acceptable" words from which to accept guesses.

- The original project does not colorize multiple occurrence of a letter in a guess accurately, [the `computeStatusGuess` algorithm is correct](https://github.com/jlumbroso/wordle-react-clone/blob/b13b0ceed3c9774775c74d5f383f2375ee83e496/src/helpers.tsx#L10-L60).

- The original project only allowed for keyboard keys to be either unknown or disabled, this project extends [the possible states to "almost" (correct letter but not position) and "correct" (correct letter and position)](https://github.com/jlumbroso/wordle-react-clone/blob/b13b0ceed3c9774775c74d5f383f2375ee83e496/src/components/Key.tsx#L24-L47).

## Coding Notes

The original video tutorial uses JavaScript, therefore using TypeScript required some adjustments — but fortunately, not as many as I had expected!

- Use a React snippet expander, to handle the large quantities of boilerplate code needed with React (for instance [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) in VS Code).

- Use code reformatting on save, to standardize codebase. I used [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) because it requires no/light configuration, and is broadly available. The configuration of options can be made [in the `package.json` file, at the `"prettier"` subsection](https://github.com/jlumbroso/wordle-react-clone/blob/de34f557f058558fb85916a1291508841f590d69/package.json#L39-L50).

- Initially, create a `components` folder, and start drafting all components in this folder.

- When learning, initially TypeScript will give perplexing errors, and the explanations are poorly documented. So use `\\ @ts-ignore` for every line that gives type errors. Later, once comfortable enough, return to solve these errors.

  - TypeScript inferences are fairly powerful. Beyond adding a few `Props` type definitions (for instance in [`Key.tsx`](https://github.com/jlumbroso/wordle-react-clone/blob/de34f557f058558fb85916a1291508841f590d69/src/components/Key.tsx#L4-L8) or [`Letter.tsx`](https://github.com/jlumbroso/wordle-react-clone/blob/de34f557f058558fb85916a1291508841f590d69/src/components/Letter.tsx#L6-L9)), the main issue I had was with the Context API.
  - Initially, as the code was taking shape, TypeScript was emitting a lot of `no-empty-pattern` and `no-unused-vars` warnings, that, upon deploy would be turned into block errors. To circumvent this (even temporarily), this can be added to the `package.json` under the `eslintConfig` subsection (see [example](https://github.com/jlumbroso/wordle-react-clone/blob/de34f557f058558fb85916a1291508841f590d69/package.json#L33-L37)):
    ```json
    "rules": {
      "no-unused-vars": 0,
      "no-empty-pattern": 0,
      "@typescript-eslint/no-unused-vars": 0
    }
    ```
  - See [`App.tsx`](https://github.com/jlumbroso/wordle-react-clone/blob/de34f557f058558fb85916a1291508841f590d69/src/App.tsx#L16-L37) for help in using correct typing annotations for Context API. The issue has to do with creating an initial empty/partial context and expanding it later in the code. If the type annotations allow for the context to be partial, then this will generate typing errors in other files. It is better to: (a) define a full-fledged typing interface and (b) cast an empty context to a full one (see [`App.tsx` lines 16-37](https://github.com/jlumbroso/wordle-react-clone/blob/de34f557f058558fb85916a1291508841f590d69/src/App.tsx#L16-L37), for an example of this).
  - When importing the word bank (see [`helpers.tsx`](https://github.com/jlumbroso/wordle-react-clone/blob/8857d16e86d87b67eaeca298bc506015e7149b7d/src/helpers.tsx#L1)), TypeScript will complain because the text file has no typings. This can be solved by creating a `global.d.ts` file containing:
    ```typescript
    // allows import of .txt files in TypeScript
    declare module "*.txt" {
      const content: any
      export default content
    }
    ```
    See [StackOverflow](https://stackoverflow.com/a/57156718/408734) and [Webpack's documentation](https://webpack.js.org/guides/typescript/#importing-other-assets) for more information.

- Since initially this project contains no tests, I had to tweak the Continuous Integration script (in [`gh-deploy.yaml`](https://github.com/jlumbroso/wordle-react-clone/blob/de34f557f058558fb85916a1291508841f590d69/.github/workflows/gh-deploy.yaml#L42)) to change `npm test` to `npm test -- --passWithNoTests` (otherwise, this testing part of the process sees the absence of tests as a failing error).
