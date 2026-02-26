
# UserActionHistory


## Properties

Name | Type
------------ | -------------
`givenName` | string
`state` | string
`dateUpdated` | Date
`givenCustomNameBridgeId` | number

## Example

```typescript
import type { UserActionHistory } from ''

// TODO: Update the object below with actual values
const example = {
  "givenName": Oliver,
  "state": APPROVED,
  "dateUpdated": 2026-02-01T18:42Z,
  "givenCustomNameBridgeId": 123,
} satisfies UserActionHistory

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserActionHistory
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


