/**
 * @generated SignedSource<<141e34fc857b0411211177fadf185933>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveStarInput = {
  clientMutationId?: string | null | undefined;
  starrableId: string;
};
export type SearchItemRemoveStarMutation$variables = {
  input: RemoveStarInput;
};
export type SearchItemRemoveStarMutation$data = {
  readonly removeStar: {
    readonly starrable: {
      readonly stargazers: {
        readonly totalCount: number;
      };
      readonly viewerHasStarred: boolean;
    } | null | undefined;
  } | null | undefined;
};
export type SearchItemRemoveStarMutation = {
  response: SearchItemRemoveStarMutation$data;
  variables: SearchItemRemoveStarMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "viewerHasStarred",
  "storageKey": null
},
v3 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SearchItemRemoveStarMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveStarPayload",
        "kind": "LinkedField",
        "name": "removeStar",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "starrable",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SearchItemRemoveStarMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveStarPayload",
        "kind": "LinkedField",
        "name": "removeStar",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "starrable",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "58fe9cbf5f32bb1c46cef69aad8c483f",
    "id": null,
    "metadata": {},
    "name": "SearchItemRemoveStarMutation",
    "operationKind": "mutation",
    "text": "mutation SearchItemRemoveStarMutation(\n  $input: RemoveStarInput!\n) {\n  removeStar(input: $input) {\n    starrable {\n      __typename\n      viewerHasStarred\n      stargazers {\n        totalCount\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e8b2562d34cd9b8afcc1d6b1246915e1";

export default node;
