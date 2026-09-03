
# NameFilters


## Properties

Name | Type
------------ | -------------
`genderOptions` | [Array&lt;FilterOption&gt;](FilterOption.md)
`decadeOptions` | [Array&lt;FilterOption&gt;](FilterOption.md)
`cultureOptions` | [Array&lt;FilterOption&gt;](FilterOption.md)
`languageOptions` | [Array&lt;FilterOption&gt;](FilterOption.md)

## Example

```typescript
import type { NameFilters } from ''

// TODO: Update the object below with actual values
const example = {
  "genderOptions": null,
  "decadeOptions": null,
  "cultureOptions": null,
  "languageOptions": null,
} satisfies NameFilters

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NameFilters
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


