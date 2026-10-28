# AGENTS.md

Notes for anyone, human or AI agent, changing this code. `README.md` documents the public API (`UIElement`,
`UIInteraction`, `UIValue` and the methods) with sample JSON; this file covers how the repo fits together.

## What this is

FormGenBS, a TypeScript library that builds Bootstrap 4 data-entry forms in the browser from an array of
`UIElement` definitions. It shows and hides fields through `UIInteraction` rules, scores answers, checks required
fields, and reads and writes the entered values as JSON. It runs in the browser only, with jQuery 3.3.1 and
Bootstrap 4 loaded first.

## Commands

```bash
npm install                                  # only the @types/jquery and @types/bootstrap typings
npx -p typescript tsc                        # compile FormGenBS.ts to FormGenBS.js, .d.ts and .js.map (tsconfig.json)
python3 -m http.server 5500                  # serve the folder; then open http://localhost:5500/index.html
```

TypeScript itself is not in `package.json`, so `tsc` comes from `npx` or a global install. The demo page fetches
its sample forms from `http://localhost:5500/`, the port VS Code's Live Server uses (`.vscode/`), so serve on that
port. There are no tests; check changes by hand in `index.html`.

## Layout

- `FormGenBS.ts`: the whole library, in one file.
  - `FormGenBS` builds the form into a container element and holds the API (`GetFormData`, `SetFormData`,
    `GetFormScore`, `IsFormValid`, `GetWholeForm`, `SetWholeForm`, `GetFormDefinitionFrom`, `SetReadWrite`).
  - `UIElement`, `UIInteraction`, `UIValue` and `FormGenDefCon` are the data classes.
- `FormGenBS.js`, `FormGenBS.d.ts`, `FormGenBS.js.map`: compiler output, committed so the pages run without a build.
- `index.html`: the demo and test page, with buttons that load the sample forms. `oldindex.html` and
  `testmassiveload.html` are older test pages.
- `SampleForm.json`, `LA_ScreenerQuestions.json`, `LargeFormDefinitionWithData.json`: sample form definitions (the
  last one with saved answers).
- `css/`, `js/`: vendored Bootstrap 4, jQuery 3.3.1 and Popper. `node_modules/` (the typings) is committed too.
- `ScreenShots/`: the pictures used by the README.

## Rules that keep it working

- **Edit the TypeScript, then compile.** Never hand-edit `FormGenBS.js`; change `FormGenBS.ts`, run `tsc`, and
  commit the `.ts`, `.js`, `.d.ts` and `.js.map` together.
- **CommonJS output in a plain page.** `tsconfig.json` targets ES5 with CommonJS modules, so the pages define
  `var exports = {};` before loading `FormGenBS.js`. Keep that line in any page that uses the library.
- **The instance knows its own name.** The last constructor argument (`JSobjectName`) must match the global
  variable holding the instance (`'FG'` in `index.html`), because the generated `onchange` handlers call back
  through that name.
- **Element and interaction types are fixed strings.** The builder switches on `elType.toUpperCase()`: `TEXT`,
  `DATE`, `NARRATIVE`, `RADIO`, `DROPDOWN`, `CHECKBOX`, `INFOTEXT`, `HEADER`, `FOOTER` and `RECXOFY`. Interaction
  types (`SHOW`, `HIDE`, `TRACK`) are compared as written. A new type needs a case in each of those switches.
- **Keep the saved-data format.** `GetFormData` returns `UIValue` pairs, led by the `FORMVERSIONSTRING` entry;
  stored answers depend on it.

## Making a change

- Change `FormGenBS.ts`, compile, and try every sample form in `index.html`.
- Update `README.md` when the API, element types or JSON formats change.
