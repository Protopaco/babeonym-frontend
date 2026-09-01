# ReferenceApi

All URIs are relative to *http://localhost:2221*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**v1ReferenceCultures**](ReferenceApi.md#v1referencecultures) | **GET** /api/v1/reference/cultures | Get cultures |
| [**v1ReferenceDecades**](ReferenceApi.md#v1referencedecades) | **GET** /api/v1/reference/decades | Get decades |
| [**v1ReferenceLanguages**](ReferenceApi.md#v1referencelanguages) | **GET** /api/v1/reference/languages | Get languages |



## v1ReferenceCultures

> ReferenceCulturesResponse v1ReferenceCultures()

Get cultures

Returns the list of available cultures.

### Example

```ts
import {
  Configuration,
  ReferenceApi,
} from '';
import type { V1ReferenceCulturesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ReferenceApi();

  try {
    const data = await api.v1ReferenceCultures();
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

[**ReferenceCulturesResponse**](ReferenceCulturesResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of cultures |  -  |
| **401** | Not authenticated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## v1ReferenceDecades

> ReferenceDecadesResponse v1ReferenceDecades()

Get decades

Returns the list of available decades.

### Example

```ts
import {
  Configuration,
  ReferenceApi,
} from '';
import type { V1ReferenceDecadesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ReferenceApi();

  try {
    const data = await api.v1ReferenceDecades();
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

[**ReferenceDecadesResponse**](ReferenceDecadesResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of decades |  -  |
| **401** | Not authenticated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## v1ReferenceLanguages

> ReferenceLanguagesResponse v1ReferenceLanguages()

Get languages

Returns the list of available languages.

### Example

```ts
import {
  Configuration,
  ReferenceApi,
} from '';
import type { V1ReferenceLanguagesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ReferenceApi();

  try {
    const data = await api.v1ReferenceLanguages();
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

[**ReferenceLanguagesResponse**](ReferenceLanguagesResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of languages |  -  |
| **401** | Not authenticated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

