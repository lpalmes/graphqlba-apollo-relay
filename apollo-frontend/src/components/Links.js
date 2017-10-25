import React from 'react'
import Link from './Link'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Links = ({ data }) => {
  if (data.loading) return 'Cargando'

  return (
    <section className="Links">
      {data.allLinks.map(link => (
        <Link
          key={link.id}
          link={link}
        />
      ))}
    </section>
  )
}

export const AllLinksQuery = gql`
  query AllLinks {
    allLinks {
      id
      url
      description
      votes
    }
  }
`

export default graphql(AllLinksQuery)(Links)
