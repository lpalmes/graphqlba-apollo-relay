/**
 * @flow
 * @relayHash 9bded6c47ab6d8ed27aab0a3633695db
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type CreateMessageMutationVariables = {|
  username: string;
  message: string;
|};
export type CreateMessageMutationResponse = {|
  +createMessage: ?{|
    +id: string;
    +message: string;
    +username: string;
    +created: string;
  |};
|};
*/


/*
mutation CreateMessageMutation(
  $username: String!
  $message: String!
) {
  createMessage(username: $username, message: $message) {
    id
    message
    username
    created
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "username",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "message",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateMessageMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "message",
            "variableName": "message",
            "type": "String!"
          },
          {
            "kind": "Variable",
            "name": "username",
            "variableName": "username",
            "type": "String!"
          }
        ],
        "concreteType": "Message",
        "name": "createMessage",
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
            "name": "message",
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
            "name": "created",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "CreateMessageMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "username",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "message",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "CreateMessageMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "message",
            "variableName": "message",
            "type": "String!"
          },
          {
            "kind": "Variable",
            "name": "username",
            "variableName": "username",
            "type": "String!"
          }
        ],
        "concreteType": "Message",
        "name": "createMessage",
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
            "name": "message",
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
            "name": "created",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation CreateMessageMutation(\n  $username: String!\n  $message: String!\n) {\n  createMessage(username: $username, message: $message) {\n    id\n    message\n    username\n    created\n  }\n}\n"
};

module.exports = batch;
