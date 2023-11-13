/**
 * @generated SignedSource<<398b10de2a4ac037352ed4090bed699e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchItem_repository$data = {
  readonly description: string | null | undefined;
  readonly id: string;
  readonly name: string;
  readonly stargazers: {
    readonly totalCount: number;
  };
  readonly url: any;
  readonly viewerHasStarred: boolean;
  readonly " $fragmentType": "SearchItem_repository";
};
export type SearchItem_repository$key = {
  readonly " $data"?: SearchItem_repository$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchItem_repository">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchItem_repository",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "url",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerHasStarred",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "StargazerConnection",
      "kind": "LinkedField",
      "name": "stargazers",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Repository",
  "abstractKey": null
};

(node as any).hash = "79f5b11e6dcf1f5bbe5ae46ae76bea17";

export default node;
