# UserApi

All URIs are relative to *http://localhost:2221*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**v1UserActionHistory**](UserApi.md#v1useractionhistory) | **GET** /api/v1/user/actionHistory | Get user action history |
| [**v1UserDelete**](UserApi.md#v1userdelete) | **DELETE** /api/v1/user/me | Delete current user |
| [**v1UserGet**](UserApi.md#v1userget) | **GET** /api/v1/user/me | Get current user |
| [**v1UserReset**](UserApi.md#v1userreset) | **POST** /api/v1/user/me/reset | Reset user state |
| [**v1UserSettings**](UserApi.md#v1usersettingsoperation) | **PUT** /api/v1/user/settings | Update user settings |



## v1UserActionHistory

> UserActionHistoryResponse v1UserActionHistory()

Get user action history

Returns the authenticated user\&#39;s given-name action history.

### Example

```ts
import {
  Configuration,
  UserApi,
} from '';
import type { V1UserActionHistoryRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new UserApi();

  try {
    const data = await api.v1UserActionHistory();
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

[**UserActionHistoryResponse**](UserActionHistoryResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | User action history |  -  |
| **401** | Not authenticated |  -  |
| **404** | User not found in request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## v1UserDelete

> v1UserDelete()

Delete current user

Deletes the authenticated user account, logs them out, and destroys the session.

### Example

```ts
import {
  Configuration,
  UserApi,
} from '';
import type { V1UserDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new UserApi();

  try {
    const data = await api.v1UserDelete();
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

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | User deleted and session terminated |  -  |
| **401** | Not authenticated |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## v1UserGet

> UserMeResponse v1UserGet()

Get current user

Returns the currently authenticated user.

### Example

```ts
import {
  Configuration,
  UserApi,
} from '';
import type { V1UserGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new UserApi();

  try {
    const data = await api.v1UserGet();
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

[**UserMeResponse**](UserMeResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Current user |  -  |
| **401** | Not authenticated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## v1UserReset

> SuccessResponse v1UserReset()

Reset user state

Resets the authenticated user\&#39;s data to an initial state.

### Example

```ts
import {
  Configuration,
  UserApi,
} from '';
import type { V1UserResetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new UserApi();

  try {
    const data = await api.v1UserReset();
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

[**SuccessResponse**](SuccessResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | User reset successfully |  -  |
| **401** | Not authenticated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## v1UserSettings

> UserSettingsResponse v1UserSettings(v1UserSettingsRequest)

Update user settings

Updates the authenticated user\&#39;s settings such as theme and surname.

### Example

```ts
import {
  Configuration,
  UserApi,
} from '';
import type { V1UserSettingsOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new UserApi();

  const body = {
    // V1UserSettingsRequest
    v1UserSettingsRequest: ...,
  } satisfies V1UserSettingsOperationRequest;

  try {
    const data = await api.v1UserSettings(body);
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
| **v1UserSettingsRequest** | [V1UserSettingsRequest](V1UserSettingsRequest.md) |  | |

### Return type

[**UserSettingsResponse**](UserSettingsResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | User settings updated |  -  |
| **400** | Invalid input (missing fields, invalid theme, or inappropriate language) |  -  |
| **401** | Not authenticated |  -  |
| **500** | Failed to update user settings |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

