/**
 * @generated SignedSource<<8752ac909fcc6620c37e8c6d85cc93ab>>
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
      readonly teams: ReadonlyArray<{
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
    "cacheID": "012dda42b5c4f993448a4ceb2178cda9",
    "id": null,
    "metadata": {},
    "name": "MatchSelectQuery",
    "operationKind": "query",
    "text": "query MatchSelectQuery {\n  state {\n    matches {\n      guid\n      teams {\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "760d21e44bc31b60285d44a813828e0b";

export default node;
