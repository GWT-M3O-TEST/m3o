import type { FC } from 'react'
import type { SchemaObject } from 'openapi3-ts'
import { Fragment } from 'react'
import { PropertiesList } from './PropertiesList'
import { Property } from './Property'

interface Property {
  [propertyName: string]: SchemaObject
}

interface Props {
  title: string
  properties?: SchemaObject['properties']
}

export const PropertiesTable: FC<Props> = ({ title, properties = {} }) => {
  function createPropertyTree(localProperties: SchemaObject = {}) {
    return Object.keys(localProperties).map(key => {
      const property = localProperties[key] as SchemaObject

      if (property.type === 'object' || property.type === 'array') {
        const recursionProperties =
          property.type === 'object'
            ? property.properties
            : (property.items as SchemaObject).properties

        return (
          <Fragment key={key}>
            <Property
              type={property.type}
              description={property.description}
              title={key}
            />
            {property.properties && (
              <PropertiesList key={key}>
                {createPropertyTree(recursionProperties)}
              </PropertiesList>
            )}
          </Fragment>
        )
      }

      return (
        <Property
          type={property.type}
          description={property.description}
          key={key}
          title={key}
        />
      )
    })
  }

  const input = createPropertyTree(properties)

  return (
    <div className="mb-10">
      <h4 className="font-medium text-indigo-600 mb-3 text-sm dark:text-indigo-300 pb-2 ">
        {title}
      </h4>
      {input.length > 0 ? input : <small>{`{}`}</small>}
    </div>
  )
}
