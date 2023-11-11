/**
 * @generated SignedSource<<85a49aa1434a594d67ce57bdf0619e8e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type RoundsWonSliderQuery$variables = {
  currentMatchId: any;
  skip: boolean;
};
export type RoundsWonSliderQuery$data = {
  readonly matchById?: {
    readonly teams: ReadonlyArray<{
      readonly name: string;
    }>;
  } | null | undefined;
};
export type RoundsWonSliderQuery = {
  response: RoundsWonSliderQuery$data;
  variables: RoundsWonSliderQuery$variables;
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
    "name": "RoundsWonSliderQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RoundsWonSliderQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "cdb43f4ff49af406b521ea324d58d909",
    "id": null,
    "metadata": {},
    "name": "RoundsWonSliderQuery",
    "operationKind": "query",
    "text": "query RoundsWonSliderQuery(\n  $currentMatchId: Uuid!\n  $skip: Boolean!\n) {\n  matchById(id: $currentMatchId) @skip(if: $skip) {\n    teams {\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "890a0bd39007be5f098d2641211f6333";

export default node;
