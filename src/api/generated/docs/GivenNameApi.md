# GivenNameApi

All URIs are relative to *http://localhost:2221*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**v1GivenNameAction**](GivenNameApi.md#v1givennameactionoperation) | **POST** /api/v1/givenName/action | Update given name state |
| [**v1GivenNameApproved**](GivenNameApi.md#v1givennameapproved) | **GET** /api/v1/givenName/approved | Get approved given names |
| [**v1GivenNameCandidates**](GivenNameApi.md#v1givennamecandidates) | **GET** /api/v1/givenName/candidates | Get given name candidates |
| [**v1GivenNameCompare**](GivenNameApi.md#v1givennamecompareoperation) | **POST** /api/v1/givenName/compare | Compare two given names |
| [**v1GivenNameCustom**](GivenNameApi.md#v1givennamecustomoperation) | **POST** /api/v1/givenName/custom | Add a custom given name |
| [**v1GivenNameEtymology**](GivenNameApi.md#v1givennameetymology) | **GET** /api/v1/givenName/etymology/{givenCustomNameBridgeId} | Get given name etymology |
| [**v1GivenNameSearch**](GivenNameApi.md#v1givennamesearch) | **GET** /api/v1/givenName/search | Search given names |



## v1GivenNameAction

> ApprovedGivenNamesResponse v1GivenNameAction(v1GivenNameActionRequest)

Update given name state

Updates the state of a given name (approved, rejected, or snoozed) for the authenticated user.

### Example

```ts
import {
  Configuration,
  GivenNameApi,
} from '';
import type { V1GivenNameActionOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GivenNameApi();

  const body = {
    // V1GivenNameActionRequest
    v1GivenNameActionRequest: ...,
  } satisfies V1GivenNameActionOperationRequest;

  try {
    const data = await api.v1GivenNameAction(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **v1GivenNameActionRequest** | [V1GivenNameActionRequest](V1GivenNameActionRequest.md) |  | |

### Return type

[**ApprovedGivenNamesResponse**](ApprovedGivenNamesResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The user\&#39;s approved given names after the action |  -  |
| **400** | Invalid request parameters |  -  |
| **401** | Not authenticated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## v1GivenNameApproved

> Array&lt;GivenName&gt; v1GivenNameApproved()

Get approved given names

Returns the authenticated user\&#39;s approved given names.

### Example

```ts
import {
  Configuration,
  GivenNameApi,
} from '';
import type { V1GivenNameApprovedRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GivenNameApi();

  try {
    const data = await api.v1GivenNameApproved();
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

[**Array&lt;GivenName&gt;**](GivenName.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Approved given names |  -  |
| **401** | Not authenticated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## v1GivenNameCandidates

> Array&lt;GivenName&gt; v1GivenNameCandidates(popularity, genders, decadeIds, languageIds, cultureIds, limit, include)

Get given name candidates

Returns candidate given names for the authenticated user based on optional filters.

### Example

```ts
import {
  Configuration,
  GivenNameApi,
} from '';
import type { V1GivenNameCandidatesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GivenNameApi();

  const body = {
    // number | Popularity percentile target from 0.0 to 1.0. (optional)
    popularity: 8.14,
    // string | Comma-separated list of genders. (optional)
    genders: male,female,
    // string | Comma-separated list of decade IDs. (optional)
    decadeIds: 1,2,3,
    // string | Comma-separated list of language IDs. (optional)
    languageIds: 4,7,
    // string | Comma-separated list of culture IDs. (optional)
    cultureIds: 2,9,
    // number | Maximum number of results. (optional)
    limit: 56,
    // string | Comma-separated include options. (optional)
    include: meta,
  } satisfies V1GivenNameCandidatesRequest;

  try {
    const data = await api.v1GivenNameCandidates(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **popularity** | `number` | Popularity percentile target from 0.0 to 1.0. | [Optional] [Defaults to `undefined`] |
| **genders** | `string` | Comma-separated list of genders. | [Optional] [Defaults to `undefined`] |
| **decadeIds** | `string` | Comma-separated list of decade IDs. | [Optional] [Defaults to `undefined`] |
| **languageIds** | `string` | Comma-separated list of language IDs. | [Optional] [Defaults to `undefined`] |
| **cultureIds** | `string` | Comma-separated list of culture IDs. | [Optional] [Defaults to `undefined`] |
| **limit** | `number` | Maximum number of results. | [Optional] [Defaults to `undefined`] |
| **include** | `string` | Comma-separated include options. | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;GivenName&gt;**](GivenName.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Candidate given names |  -  |
| **401** | Not authenticated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## v1GivenNameCompare

> ApprovedGivenNamesResponse v1GivenNameCompare(v1GivenNameCompareRequest)

Compare two given names

Records a comparison result between two given names for the authenticated user.

### Example

```ts
import {
  Configuration,
  GivenNameApi,
} from '';
import type { V1GivenNameCompareOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GivenNameApi();

  const body = {
    // V1GivenNameCompareRequest
    v1GivenNameCompareRequest: ...,
  } satisfies V1GivenNameCompareOperationRequest;

  try {
    const data = await api.v1GivenNameCompare(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **v1GivenNameCompareRequest** | [V1GivenNameCompareRequest](V1GivenNameCompareRequest.md) |  | |

### Return type

[**ApprovedGivenNamesResponse**](ApprovedGivenNamesResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The user\&#39;s approved given names after the comparison |  -  |
| **400** | Invalid winnerId or loserId |  -  |
| **401** | Not authenticated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## v1GivenNameCustom

> ApprovedGivenNamesResponse v1GivenNameCustom(v1GivenNameCustomRequest)

Add a custom given name

Adds a user-defined custom given name for the authenticated user.

### Example

```ts
import {
  Configuration,
  GivenNameApi,
} from '';
import type { V1GivenNameCustomOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GivenNameApi();

  const body = {
    // V1GivenNameCustomRequest
    v1GivenNameCustomRequest: ...,
  } satisfies V1GivenNameCustomOperationRequest;

  try {
    const data = await api.v1GivenNameCustom(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **v1GivenNameCustomRequest** | [V1GivenNameCustomRequest](V1GivenNameCustomRequest.md) |  | |

### Return type

[**ApprovedGivenNamesResponse**](ApprovedGivenNamesResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The user\&#39;s approved given names after the custom name is added |  -  |
| **400** | Invalid or inappropriate custom given name |  -  |
| **401** | Not authenticated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## v1GivenNameEtymology

> Etymology v1GivenNameEtymology(givenCustomNameBridgeId)

Get given name etymology

Returns etymology information for a specific given name.

### Example

```ts
import {
  Configuration,
  GivenNameApi,
} from '';
import type { V1GivenNameEtymologyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GivenNameApi();

  const body = {
    // number | ID of the given name
    givenCustomNameBridgeId: 56,
  } satisfies V1GivenNameEtymologyRequest;

  try {
    const data = await api.v1GivenNameEtymology(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **givenCustomNameBridgeId** | `number` | ID of the given name | [Defaults to `undefined`] |

### Return type

[**Etymology**](Etymology.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Etymology data |  -  |
| **400** | Invalid givenCustomNameBridgeId |  -  |
| **401** | Not authenticated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## v1GivenNameSearch

> Array&lt;GivenName&gt; v1GivenNameSearch(search, limit)

Search given names

Searches given names for the authenticated user using a text query. 

### Example

```ts
import {
  Configuration,
  GivenNameApi,
} from '';
import type { V1GivenNameSearchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GivenNameApi();

  const body = {
    // string | Search text for given names
    search: search_example,
    // number | Maximum number of results to return (optional)
    limit: 56,
  } satisfies V1GivenNameSearchRequest;

  try {
    const data = await api.v1GivenNameSearch(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **search** | `string` | Search text for given names | [Defaults to `undefined`] |
| **limit** | `number` | Maximum number of results to return | [Optional] [Defaults to `10`] |

### Return type

[**Array&lt;GivenName&gt;**](GivenName.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Matching given names |  -  |
| **400** | Missing required search query |  -  |
| **401** | Not authenticated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

