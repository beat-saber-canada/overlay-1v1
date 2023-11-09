/**
 * @generated SignedSource<<ffd8a083ed9c2b433a749def6eaa6344>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ScoreHeaderQuery$variables = {
  currentMatchId: any;
  skip: boolean;
};
export type ScoreHeaderQuery$data = {
  readonly matchById?: {
    readonly teams: ReadonlyArray<{
      readonly name: string;
    }>;
  } | null | undefined;
};
export type ScoreHeaderQuery = {
  response: ScoreHeaderQuery$data;
  variables: ScoreHeaderQuery$variables;
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
            "concreteType": "Team",
            "kind": "LinkedField",
            "name": "teams",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
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
    "name": "ScoreHeaderQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ScoreHeaderQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e0c38919f4478d96af7227eb3a5e7261",
    "id": null,
    "metadata": {},
    "name": "ScoreHeaderQuery",
    "operationKind": "query",
    "text": "query ScoreHeaderQuery(\n  $currentMatchId: Uuid!\n  $skip: Boolean!\n) {\n  matchById(id: $currentMatchId) @skip(if: $skip) {\n    teams {\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bbce16d878eb3ffbf3b6ffb9ca6fc8be";

export default node;
