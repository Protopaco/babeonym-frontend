
# GivenNameMutationResponse


## Properties

Name | Type
------------ | -------------
`approvedGivenNames` | [Array&lt;GivenName&gt;](GivenName.md)
`user` | [GivenNameMutationResponseUser](GivenNameMutationResponseUser.md)

## Example

```typescript
import type { GivenNameMutationResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "approvedGivenNames": null,
  "user": null,
} satisfies GivenNameMutationResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GivenNameMutationResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


