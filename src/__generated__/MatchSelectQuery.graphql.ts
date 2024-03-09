/**
 * @generated SignedSource<<e9844118b9e0af6c7be0689f519d8993>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type MatchSelectQuery$variables = Record<PropertyKey, never>;
export type MatchSelectQuery$data = {
  readonly state: {
    readonly matches: ReadonlyArray<{
      readonly guid: any;
      readonly players: ReadonlyArray<{
        readonly name: string;
      }>;
    }>;
  };
};
export type MatchSelectQuery = {
  response: MatchSelectQuery$data;
  variables: MatchSelectQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "GQLTAState",
    "kind": "LinkedField",
    "name": "state",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Match",
        "kind": "LinkedField",
        "name": "matches",
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
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "players",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MatchSelectQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MatchSelectQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "a3eb837b9146a1548df524612b8ddb4e",
    "id": null,
    "metadata": {},
    "name": "MatchSelectQuery",
    "operationKind": "query",
    "text": "query MatchSelectQuery {\n  state {\n    matches {\n      guid\n      players {\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "424166040666ecb92a4a4726541a5a2a";

export default node;
