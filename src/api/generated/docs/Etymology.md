
# Etymology


## Properties

Name | Type
------------ | -------------
`meanings` | [Array&lt;EtymologyMeaning&gt;](EtymologyMeaning.md)
`languages` | [Array&lt;EtymologyLanguage&gt;](EtymologyLanguage.md)
`cultures` | [Array&lt;EtymologyCulture&gt;](EtymologyCulture.md)

## Example

```typescript
import type { Etymology } from ''

// TODO: Update the object below with actual values
const example = {
  "meanings": null,
  "languages": null,
  "cultures": null,
} satisfies Etymology

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Etymology
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


