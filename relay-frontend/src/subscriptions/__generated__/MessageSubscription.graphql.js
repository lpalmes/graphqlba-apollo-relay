/**
 * @flow
 * @relayHash 1a6edebd2ca01f55d7c2670454124f06
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type MessageSubscriptionVariables = {| |};
export type MessageSubscriptionResponse = {|
  +Message: ?{|
    +mutation: "CREATED" | "UPDATED" | "DELETED";
    +node: ?{|
      +id: string;
      +username: string;
      +message: string;
      +created: string;
    |};
  |};
|};
*/


/*
subscription MessageSubscription {
  Message {
    mutation
    node {
      id
      username
      message
      created
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MessageSubscription",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "MessageSubscriptionPayload",
        "name": "Message",
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
            "concreteType": "Message",
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
                "name": "username",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "message",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "created",
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
  "name": "MessageSubscription",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "MessageSubscription",
    "operation": "subscription",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "MessageSubscriptionPayload",
        "name": "Message",
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
            "concreteType": "Message",
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
                "name": "username",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "message",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "created",
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
  "text": "subscription MessageSubscription {\n  Message {\n    mutation\n    node {\n      id\n      username\n      message\n      created\n    }\n  }\n}\n"
};

module.exports = batch;
