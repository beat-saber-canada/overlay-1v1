/**
 * @generated SignedSource<<1772dfb569a4737170944bd61fd6088a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CurrentMapQuery$variables = {
  currentMatchId: any;
  skip: boolean;
};
export type CurrentMapQuery$data = {
  readonly matchById?: {
    readonly currentMap: {
      readonly difficulty: number;
      readonly hash: string;
      readonly name: string;
    } | null | undefined;
  } | null | undefined;
};
export type CurrentMapQuery = {
  response: CurrentMapQuery$data;
  variables: CurrentMapQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "currentMatchId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "skip"
  }
],
v1 = [
  {
    "condition": "skip",
    "kind": "Condition",
    "passingValue": false,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "currentMatchId"
          }
        ],
        "concreteType": "Match",
        "kind": "LinkedField",
        "name": "matchById",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Map",
            "kind": "LinkedField",
            "name": "currentMap",
            "plural": false,
            "selections": [
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
                "name": "difficulty",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hash",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CurrentMapQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CurrentMapQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ada0d92e58545b09740c3a1e1dd223c9",
    "id": null,
    "metadata": {},
    "name": "CurrentMapQuery",
    "operationKind": "query",
    "text": "query CurrentMapQuery(\n  $currentMatchId: Uuid!\n  $skip: Boolean!\n) {\n  matchById(id: $currentMatchId) @skip(if: $skip) {\n    currentMap {\n      name\n      difficulty\n      hash\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f5aaeae6185f1ed889d7b43bfb5e02ea";

export default node;
