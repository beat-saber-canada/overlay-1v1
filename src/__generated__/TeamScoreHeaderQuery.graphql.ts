/**
 * @generated SignedSource<<05802290fb4b958f944b0ca336fd10b1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type TeamScoreHeaderQuery$variables = {
  currentMatchId: any;
  skip: boolean;
};
export type TeamScoreHeaderQuery$data = {
  readonly matchById?: {
    readonly teams: ReadonlyArray<{
      readonly name: string;
    }>;
  } | null | undefined;
};
export type TeamScoreHeaderQuery = {
  response: TeamScoreHeaderQuery$data;
  variables: TeamScoreHeaderQuery$variables;
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
    "name": "TeamScoreHeaderQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TeamScoreHeaderQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "fa572d6f30eaf912820c74d85fee6fb3",
    "id": null,
    "metadata": {},
    "name": "TeamScoreHeaderQuery",
    "operationKind": "query",
    "text": "query TeamScoreHeaderQuery(\n  $currentMatchId: Uuid!\n  $skip: Boolean!\n) {\n  matchById(id: $currentMatchId) @skip(if: $skip) {\n    teams {\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1b73ebc91aec435e5aa7220f40e3628c";

export default node;
