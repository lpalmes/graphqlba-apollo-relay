/**
 * @flow
 * @relayHash e028b82f2b01d031822a1164d7a5b7c6
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type LinkSubscriptionVariables = {| |};
export type LinkSubscriptionResponse = {|
  +Link: ?{|
    +mutation: "CREATED" | "UPDATED" | "DELETED";
    +node: ?{|
      +id: string;
      +url: string;
      +description: string;
      +votes: number;
    |};
  |};
|};
*/


/*
subscription LinkSubscription {
  Link {
    mutation
    node {
      id
      url
      description
      votes
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LinkSubscription",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "LinkSubscriptionPayload",
        "name": "Link",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "mutation",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Link",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "url",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "description",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "votes",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "LinkSubscription",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "LinkSubscription",
    "operation": "subscription",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "LinkSubscriptionPayload",
        "name": "Link",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "mutation",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Link",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "url",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "description",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "votes",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "subscription LinkSubscription {\n  Link {\n    mutation\n    node {\n      id\n      url\n      description\n      votes\n    }\n  }\n}\n"
};

module.exports = batch;
