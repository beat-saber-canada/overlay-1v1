/**
 * @generated SignedSource<<6f7bcc7e571a23fafdbf77895876a994>>
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
      readonly team: {
        readonly guid: any;
      } | null | undefined;
    }>;
    readonly scores: ReadonlyArray<{
      readonly maxScore: number;
      readonly ownerGuid: any;
      readonly score: number;
    }>;
    readonly teams: ReadonlyArray<{
      readonly guid: any;
      readonly name: string;
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "guid",
  "storageKey": null
},
v2 = [
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
              },
              (v1/*: any*/)
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "players",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Team",
                "kind": "LinkedField",
                "name": "team",
                "plural": false,
                "selections": [
                  (v1/*: any*/)
                ],
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
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PlayerScoreHeaderQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "a5212ba51879f16b09977fe0c7b332c5",
    "id": null,
    "metadata": {},
    "name": "PlayerScoreHeaderQuery",
    "operationKind": "query",
    "text": "query PlayerScoreHeaderQuery(\n  $currentMatchId: Uuid!\n  $skip: Boolean!\n) {\n  matchById(id: $currentMatchId) @skip(if: $skip) {\n    teams {\n      name\n      guid\n    }\n    scores {\n      ownerGuid\n      score\n      maxScore\n    }\n    players {\n      guid\n      team {\n        guid\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6753bc7b594c970bc429ad259a051abf";

export default node;
