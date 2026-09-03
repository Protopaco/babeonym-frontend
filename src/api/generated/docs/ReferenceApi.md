# ReferenceApi

All URIs are relative to *http://localhost:2221*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**v1ReferenceNameFilters**](ReferenceApi.md#v1referencenamefilters) | **GET** /api/v1/reference/nameFilters | Get name filter options |



## v1ReferenceNameFilters

> ReferenceNameFiltersResponse v1ReferenceNameFilters()

Get name filter options

Returns every filter option the name workspace offers, grouped by filter type. Each option carries the same shape, so a picker can render any group without knowing which one it has. 

### Example

```ts
import {
  Configuration,
  ReferenceApi,
} from '';
import type { V1ReferenceNameFiltersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ReferenceApi();

  try {
    const data = await api.v1ReferenceNameFilters();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**ReferenceNameFiltersResponse**](ReferenceNameFiltersResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Name filter options |  -  |
| **401** | Not authenticated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

