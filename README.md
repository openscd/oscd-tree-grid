# \<oscd-tree-grid>

## Installation

```bash
npm i oscd-tree-grid
```

## Usage

```html
<script type="module">
  import 'oscd-tree-grid';
</script>

<oscd-tree-grid filterLabel="Regular Expression"></oscd-tree-grid>

<script type="module">
  const oscdTree = document.querySelector('oscd-tree-grid');
  await oscdTree.updateComplete;

  const tree = await fetch('/tree.json').then(r => r.json());

  oscdTree.tree = tree;
</script>
```

## TypeScript types

For use with [TypeScript](https://www.typescriptlang.org/), `oscd-tree-grid`
exports the following types:

```ts
export type TreeSelection = { [name: string]: TreeSelection };

export type Path = string[];

export type TreeNode = {
  children?: Tree;
  text?: string;
  mandatory?: boolean;
};

export type Tree = Partial<Record<string, TreeNode>>;
```

> This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc)
> recommendation.



## `oscd-tree-grid.ts`:

### class: `TreeGrid`

#### Superclass

| Name         | Module | Package |
| ------------ | ------ | ------- |
| `LitElement` |        | lit     |

#### Fields

| Name          | Privacy | Type            | Default | Description                                | Inherited From |
| ------------- | ------- | --------------- | ------- | ------------------------------------------ | -------------- |
| `tree`        |         | `Tree`          | `{}`    | The \`Tree\` to be selected from           |                |
| `selection`   |         | `TreeSelection` | `{}`    | Selected rows as \`TreeSelection\`         |                |
| `paths`       |         | `Path[]`        |         | Selected rows as \`Path\[]\`               |                |
| `filter`      |         | `string`        |         | Regular expression by which to filter rows |                |
| `filterLabel` |         | `string`        | `''`    | Filter \`TextField\` label                 |                |

<details><summary>Private API</summary>

#### Fields

| Name          | Privacy | Type                     | Default             | Description | Inherited From |
| ------------- | ------- | ------------------------ | ------------------- | ----------- | -------------- |
| `depth`       | private | `number`                 |                     |             |                |
| `filterUI`    | private | `TextField \| undefined` |                     |             |                |
| `filterRegex` | private | `RegExp`                 |                     |             |                |
| `container`   | private | `Element \| undefined`   |                     |             |                |
| `collapsed`   | private |                          | `new Set<string>()` |             |                |

#### Methods

| Name                   | Privacy | Description | Parameters                          | Return           | Inherited From |
| ---------------------- | ------- | ----------- | ----------------------------------- | ---------------- | -------------- |
| `getPaths`             | private |             | `maxLength: number`                 | `Path[]`         |                |
| `treeNode`             | private |             | `path: Path`                        | `TreeNode`       |                |
| `rows`                 | private |             |                                     | `Path[]`         |                |
| `renderCell`           | private |             | `path: Path, previousPath: Path`    | `TemplateResult` |                |
| `select`               | private |             | `parentPath: Path, clicked: string` | `void`           |                |
| `selectAll`            | private |             | `clicked: ListItem`                 | `void`           |                |
| `handleSelected`       | private |             | `event: SingleSelectedEvent`        | `Promise<void>`  |                |
| `scrollRight`          | private |             |                                     | `Promise<void>`  |                |
| `renderColumn`         | private |             | `column: (Path \| undefined)[]`     | `TemplateResult` |                |
| `renderExpandCell`     | private |             | `path: Path`                        | `TemplateResult` |                |
| `toggleCollapse`       | private |             | `serializedPath: string`            |                  |                |
| `renderExpandColumn`   | private |             | `rows: Path[]`                      | `TemplateResult` |                |
| `renderCollapseColumn` | private |             | `rows: Path[]`                      | `TemplateResult` |                |
| `renderColumns`        | private |             |                                     | `TemplateResult` |                |
| `renderFilterField`    | private |             |                                     |                  |                |

</details>

<hr/>

### Exports

| Kind | Name       | Declaration | Module            | Package |
| ---- | ---------- | ----------- | ----------------- | ------- |
| `js` | `TreeGrid` | TreeGrid    | oscd-tree-grid.ts |         |



&copy; 2023 OMICRON electronics GmbH
