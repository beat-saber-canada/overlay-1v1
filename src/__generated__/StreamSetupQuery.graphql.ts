/**
 * @generated SignedSource<<161719691db1ba02a6e2d45e3b713f7e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type StreamSetupQuery$variables = {
  currentMatchId: any;
  skip: boolean;
};
export type StreamSetupQuery$data = {
  readonly matchById?: {
    readonly players: ReadonlyArray<{
      readonly name: string;
      readonly team: {
        readonly guid: any;
      } | null | undefined;
      readonly userId: string;
    }>;
    readonly teams: ReadonlyArray<{
      readonly guid: any;
    }>;
  } | null | undefined;
};
export type StreamSetupQuery = {
  response: StreamSetupQuery$data;
  variables: StreamSetupQuery$variables;
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
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "guid",
    "storageKey": null
  }
],
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
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "players",
            "plural": true,
            "selections": [
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
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Team",
                "kind": "LinkedField",
                "name": "team",
                "plural": false,
                "selections": (v1/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Team",
            "kind": "LinkedField",
            "name": "teams",
            "plural": true,
            "selections": (v1/*: any*/),
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
    "name": "StreamSetupQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StreamSetupQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "8e2b7f64d553aee01a02a9d8e9e0ed6e",
    "id": null,
    "metadata": {},
    "name": "StreamSetupQuery",
    "operationKind": "query",
    "text": "query StreamSetupQuery(\n  $currentMatchId: Uuid!\n  $skip: Boolean!\n) {\n  matchById(id: $currentMatchId) @skip(if: $skip) {\n    players {\n      userId\n      name\n      team {\n        guid\n      }\n    }\n    teams {\n      guid\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c83c3324dbba1587bedb4600e3b5c622";

export default node;
