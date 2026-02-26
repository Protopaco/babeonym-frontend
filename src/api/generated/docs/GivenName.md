
# GivenName


## Properties

Name | Type
------------ | -------------
`givenName` | string
`givenCustomNameBridgeId` | number
`rating` | number
`percentile` | number
`gender` | string

## Example

```typescript
import type { GivenName } from ''

// TODO: Update the object below with actual values
const example = {
  "givenName": Oliver,
  "givenCustomNameBridgeId": 42,
  "rating": 1000,
  "percentile": 92,
  "gender": male,
} satisfies GivenName

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GivenName
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


