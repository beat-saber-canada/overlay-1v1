/**
 * @generated SignedSource<<92c7a5f5fd30a0cb519c1ce6e0e15c45>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type TeamOfThreeQuery$variables = {
  currentMatchId: any;
  skip: boolean;
};
export type TeamOfThreeQuery$data = {
  readonly matchById?: {
    readonly teams: ReadonlyArray<{
      readonly name: string;
    }>;
  } | null | undefined;
};
export type TeamOfThreeQuery = {
  response: TeamOfThreeQuery$data;
  variables: TeamOfThreeQuery$variables;
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
    "name": "TeamOfThreeQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TeamOfThreeQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4bede60788a3ba40d938461f0ceed037",
    "id": null,
    "metadata": {},
    "name": "TeamOfThreeQuery",
    "operationKind": "query",
    "text": "query TeamOfThreeQuery(\n  $currentMatchId: Uuid!\n  $skip: Boolean!\n) {\n  matchById(id: $currentMatchId) @skip(if: $skip) {\n    teams {\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e604867dc7bbe3b9e3955c9ca4df8f5e";

export default node;
