# HealthApi

All URIs are relative to *http://localhost:2221*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**v1Health**](HealthApi.md#v1health) | **GET** /api/v1/health | Health check |



## v1Health

> HealthStatus v1Health()

Health check

Returns service health status.

### Example

```ts
import {
  Configuration,
  HealthApi,
} from '';
import type { V1HealthRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new HealthApi();

  try {
    const data = await api.v1Health();
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

[**HealthStatus**](HealthStatus.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Service is healthy |  -  |
| **503** | Service is unhealthy |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

