/**
 * @generated SignedSource<<be68a912f23235dbcd1a139a3795275a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type PlayerVideoQuery$variables = {
  currentMatchId: any;
  skip: boolean;
};
export type PlayerVideoQuery$data = {
  readonly matchById?: {
    readonly players: ReadonlyArray<{
      readonly guid: any;
      readonly name: string;
      readonly userId: string;
    }>;
    readonly scores: ReadonlyArray<{
      readonly combo: number;
      readonly maxScore: number;
      readonly ownerGuid: any;
      readonly score: number;
    }>;
  } | null | undefined;
};
export type PlayerVideoQuery = {
  response: PlayerVideoQuery$data;
  variables: PlayerVideoQuery$variables;
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
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "players",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "guid",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "userId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Score",
            "kind": "LinkedField",
            "name": "scores",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "ownerGuid",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "combo",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "score",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "maxScore",
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
    "name": "PlayerVideoQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PlayerVideoQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "0e4040ba134481dc9035a4dbbf076c28",
    "id": null,
    "metadata": {},
    "name": "PlayerVideoQuery",
    "operationKind": "query",
    "text": "query PlayerVideoQuery(\n  $currentMatchId: Uuid!\n  $skip: Boolean!\n) {\n  matchById(id: $currentMatchId) @skip(if: $skip) {\n    players {\n      guid\n      userId\n      name\n    }\n    scores {\n      ownerGuid\n      combo\n      score\n      maxScore\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9ed764605af17279586c0a2c66883259";

export default node;
