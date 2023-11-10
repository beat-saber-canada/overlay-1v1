/**
 * @generated SignedSource<<f9b554fdf2ca750f1ea9ed36e6ab0a0a>>
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
    readonly players: ReadonlyArray<{
      readonly guid: any;
      readonly team: {
        readonly guid: any;
      } | null | undefined;
    }>;
    readonly teams: ReadonlyArray<{
      readonly guid: any;
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
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "players",
            "plural": true,
            "selections": [
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
              },
              (v1/*: any*/)
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
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TeamOfThreeQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "23ee001c24a33e23662af12007a3086d",
    "id": null,
    "metadata": {},
    "name": "TeamOfThreeQuery",
    "operationKind": "query",
    "text": "query TeamOfThreeQuery(\n  $currentMatchId: Uuid!\n  $skip: Boolean!\n) {\n  matchById(id: $currentMatchId) @skip(if: $skip) {\n    teams {\n      name\n      guid\n    }\n    players {\n      team {\n        guid\n      }\n      guid\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "64128712f986113b7d3a19d69c77023d";

export default node;
