import { fixture } from '@open-wc/testing';
import { html } from 'lit';

import { visualDiff } from '@web/test-runner-visual-regression';

import type { ListItem } from '@material/mwc-list/mwc-list-item.js';
import type { TextField } from '@material/mwc-textfield';

import './oscd-tree-grid.js';
import type { TreeGrid } from './oscd-tree-grid.js';

const factor = process.env.CI ? 2 : 1;

function timeout(ms: number) {
  return new Promise(res => {
    setTimeout(res, ms * factor);
  });
}

mocha.timeout(4000 * factor);

const tree = await fetch('/tree.json').then(res => res.json());

describe('oscd-tree-grid', () => {
  let grid: TreeGrid;
  beforeEach(async () => {
    grid = document.createElement('oscd-tree-grid');
    document.body.prepend(grid);
    grid.tree = tree;
    await grid.updateComplete;
  });

  afterEach(() => {
    grid.remove();
  });

  it('selects and deselects subpaths on item click', async () => {
    await grid.updateComplete;
    await visualDiff(document.body, 'select-none');

    grid.shadowRoot
      ?.querySelector<ListItem>('mwc-list-item[value="b"]')
      ?.click();
    await grid.updateComplete;
    await visualDiff(document.body, 'select-b');

    grid.shadowRoot
      ?.querySelector<ListItem>('mwc-list-item[value="ba"]')
      ?.click();
    await grid.updateComplete;
    await visualDiff(document.body, 'select-ba');

    grid.shadowRoot
      ?.querySelector<ListItem>('mwc-list-item[value="bad"]')
      ?.click();
    await grid.updateComplete;
    await visualDiff(document.body, 'select-bad');

    grid.shadowRoot
      ?.querySelector<ListItem>('mwc-list-item[value="bd"]')
      ?.click();
    await grid.updateComplete;
    await visualDiff(document.body, 'select-bad-and-bd');

    grid.shadowRoot
      ?.querySelector<ListItem>('mwc-list-item[value="bd"]')
      ?.click();
    await grid.updateComplete;
    await visualDiff(document.body, 'select-bad');
  });

  it('(de-)selects an entire column on "select all" icon click', async () => {
    grid.paths = [['b', 'bb', 'bbc'], ['a']];
    await grid.updateComplete;
    await visualDiff(document.body, 'select-a-and-bbc');

    grid.shadowRoot
      ?.querySelector<ListItem>('mwc-list:nth-of-type(5) > mwc-list-item')
      ?.click();
    await grid.updateComplete;
    await visualDiff(document.body, 'select-all-abb-bbc');

    grid.shadowRoot
      ?.querySelector<ListItem>('mwc-list:nth-of-type(5) > mwc-list-item')
      ?.click();
    await grid.updateComplete;
    await visualDiff(document.body, 'select-a-and-bbc');
  });

  it('filters rows by value given filter text', async () => {
    grid.paths = [['a'], ['b', 'bb']];
    await grid.updateComplete;
    await visualDiff(document.body, 'filter-none');

    grid.filter = 'bb';
    await grid.updateComplete;
    await visualDiff(document.body, 'filter-bb');

    grid.filter = 'bba';
    await grid.updateComplete;
    await visualDiff(document.body, 'filter-bba');

    grid.filter = 'bbc';
    await grid.updateComplete;
    await visualDiff(document.body, 'filter-bbc');
  });

  it('filters out rows on collapse button click', async () => {
    grid.paths = [['a'], ['b', 'bb']];
    await grid.updateComplete;
    await visualDiff(document.body, 'filter-none');

    grid
      .shadowRoot!.querySelector<ListItem>(
        `mwc-list.collapse > mwc-list-item[data-path=${CSS.escape(
          '["a","ab","abb"]'
        )}]`
      )!
      .click();
    await grid.updateComplete;
    await visualDiff(document.body, 'filter-collapse-abb');

    grid.shadowRoot
      ?.querySelector<ListItem>(
        `mwc-list.collapse > mwc-list-item[data-path=${CSS.escape(
          '["a","ab"]'
        )}]`
      )
      ?.click();
    await grid.updateComplete;
    await visualDiff(document.body, 'filter-collapse-ab');

    grid.shadowRoot
      ?.querySelector<ListItem>(
        `mwc-list.collapse > mwc-list-item[data-path=${CSS.escape('["a"]')}]`
      )
      ?.click();
    await grid.updateComplete;
    await visualDiff(document.body, 'filter-collapse-a');

    grid.shadowRoot
      ?.querySelector<ListItem>(
        `mwc-list.expand > mwc-list-item[data-path=${CSS.escape('["a"]')}]`
      )
      ?.click();
    await grid.updateComplete;
    await visualDiff(document.body, 'filter-collapse-ab');

    grid.shadowRoot
      ?.querySelector<ListItem>(
        `mwc-list.expand > mwc-list-item[data-path=${CSS.escape('["a","ab"]')}]`
      )
      ?.click();
    await grid.updateComplete;
    await visualDiff(document.body, 'filter-collapse-abb');

    grid
      .shadowRoot!.querySelector<ListItem>(
        `mwc-list.expand > mwc-list-item[data-path=${CSS.escape(
          '["a","ab","abb"]'
        )}]`
      )!
      .click();
    await grid.updateComplete;
    await visualDiff(document.body, 'filter-none');
  });
});
