/**
 * @flow
 * @relayHash 0362399f8c22276b668d207f0a98ffde
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type NewsLinksQueryResponse = {|
  +allLinks: $ReadOnlyArray<{|
    +id: string;
    +url: string;
    +description: string;
    +votes: number;
  |}>;
|};
*/


/*
query NewsLinksQuery {
  allLinks {
    id
    url
    description
    votes
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NewsLinksQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Link",
        "name": "allLinks",
        "plural": true,
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
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "NewsLinksQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "NewsLinksQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Link",
        "name": "allLinks",
        "plural": true,
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
    ]
  },
  "text": "query NewsLinksQuery {\n  allLinks {\n    id\n    url\n    description\n    votes\n  }\n}\n"
};

module.exports = batch;
