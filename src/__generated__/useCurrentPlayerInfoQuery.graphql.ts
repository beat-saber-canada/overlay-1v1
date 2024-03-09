/**
 * @generated SignedSource<<b2c21d8e26f3e946297f36f3b3458f48>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type useCurrentPlayerInfoQuery$variables = {
  currentMatchId: any;
  skip: boolean;
};
export type useCurrentPlayerInfoQuery$data = {
  readonly matchById?: {
    readonly players: ReadonlyArray<{
      readonly userId: string;
    }>;
  } | null | undefined;
};
export type useCurrentPlayerInfoQuery = {
  response: useCurrentPlayerInfoQuery$data;
  variables: useCurrentPlayerInfoQuery$variables;
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
                "name": "userId",
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
    "name": "useCurrentPlayerInfoQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useCurrentPlayerInfoQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6b1ba4f1188f9424109803fb2bd5c96f",
    "id": null,
    "metadata": {},
    "name": "useCurrentPlayerInfoQuery",
    "operationKind": "query",
    "text": "query useCurrentPlayerInfoQuery(\n  $currentMatchId: UUID!\n  $skip: Boolean!\n) {\n  matchById(id: $currentMatchId) @skip(if: $skip) {\n    players {\n      userId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b1ac19725df230d796932b9a8febc301";

export default node;
