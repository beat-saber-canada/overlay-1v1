/**
 * @generated SignedSource<<78d9117fdcca104fed6eab55c56cbc44>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type PlayerScoreHeaderQuery$variables = {
  currentMatchId: any;
  skip: boolean;
};
export type PlayerScoreHeaderQuery$data = {
  readonly matchById?: {
    readonly players: ReadonlyArray<{
      readonly guid: any;
    }>;
    readonly scores: ReadonlyArray<{
      readonly combo: number;
      readonly maxScore: number;
      readonly ownerGuid: any;
      readonly score: number;
    }>;
  } | null | undefined;
};
export type PlayerScoreHeaderQuery = {
  response: PlayerScoreHeaderQuery$data;
  variables: PlayerScoreHeaderQuery$variables;
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
                "name": "score",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "maxScore",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "combo",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
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
    "name": "PlayerScoreHeaderQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PlayerScoreHeaderQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3341a1da9a84518900295244154b55b6",
    "id": null,
    "metadata": {},
    "name": "PlayerScoreHeaderQuery",
    "operationKind": "query",
    "text": "query PlayerScoreHeaderQuery(\n  $currentMatchId: UUID!\n  $skip: Boolean!\n) {\n  matchById(id: $currentMatchId) @skip(if: $skip) {\n    scores {\n      ownerGuid\n      score\n      maxScore\n      combo\n    }\n    players {\n      guid\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "236e71c0b25d390c6910f024b6e49268";

export default node;
