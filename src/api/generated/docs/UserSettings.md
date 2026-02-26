
# UserSettings


## Properties

Name | Type
------------ | -------------
`userId` | number
`theme` | string
`surName` | string

## Example

```typescript
import type { UserSettings } from ''

// TODO: Update the object below with actual values
const example = {
  "userId": 123,
  "theme": LIGHT,
  "surName": Stevens,
} satisfies UserSettings

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserSettings
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


