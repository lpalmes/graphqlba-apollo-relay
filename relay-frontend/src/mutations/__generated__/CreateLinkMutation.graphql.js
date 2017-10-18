/**
 * @flow
 * @relayHash 5b1994c6cde0c8cde24a81e0d3dae18d
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type CreateLinkMutationVariables = {|
  url: string;
  description: string;
|};
export type CreateLinkMutationResponse = {|
  +createLink: ?{|
    +id: string;
  |};
|};
*/


/*
mutation CreateLinkMutation(
  $url: String!
  $description: String!
) {
  createLink(url: $url, description: $description) {
    id
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "url",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "description",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateLinkMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "description",
            "variableName": "description",
            "type": "String!"
          },
          {
            "kind": "Variable",
            "name": "url",
            "variableName": "url",
            "type": "String!"
          }
        ],
        "concreteType": "Link",
        "name": "createLink",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
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
  "name": "CreateLinkMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "url",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "description",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "CreateLinkMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "description",
            "variableName": "description",
            "type": "String!"
          },
          {
            "kind": "Variable",
            "name": "url",
            "variableName": "url",
            "type": "String!"
          }
        ],
        "concreteType": "Link",
        "name": "createLink",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation CreateLinkMutation(\n  $url: String!\n  $description: String!\n) {\n  createLink(url: $url, description: $description) {\n    id\n  }\n}\n"
};

module.exports = batch;
