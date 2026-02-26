# AuthApi

All URIs are relative to *http://localhost:3000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**v1AuthAnonymous**](AuthApi.md#v1authanonymous) | **GET** /api/v1/auth/anonymous | Create an anonymous user session |
| [**v1AuthGoogle**](AuthApi.md#v1authgoogle) | **GET** /api/v1/auth/google | Start Google OAuth login |
| [**v1AuthLogout**](AuthApi.md#v1authlogout) | **POST** /api/v1/auth/logout | Log out the current user |
| [**v1AuthMicrosoft**](AuthApi.md#v1authmicrosoft) | **GET** /api/v1/auth/microsoft | Start Microsoft OAuth login |
| [**v1AuthMicrosoftCallback**](AuthApi.md#v1authmicrosoftcallback) | **GET** /api/v1/auth/microsoft/callback | Handle Microsoft OAuth callback |
| [**v2AuthGoogleCallback**](AuthApi.md#v2authgooglecallback) | **GET** /api/v1/auth/google/callback | Handle Google OAuth callback |



## v1AuthAnonymous

> V1AuthAnonymous200Response v1AuthAnonymous()

Create an anonymous user session

Creates a new anonymous user and logs them in via session cookie.

### Example

```ts
import {
  Configuration,
  AuthApi,
} from '';
import type { V1AuthAnonymousRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthApi();

  try {
    const data = await api.v1AuthAnonymous();
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

[**V1AuthAnonymous200Response**](V1AuthAnonymous200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Anonymous session created |  -  |
| **400** | User is already authenticated |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## v1AuthGoogle

> v1AuthGoogle()

Start Google OAuth login

Redirects the user to Google OAuth consent screen.

### Example

```ts
import {
  Configuration,
  AuthApi,
} from '';
import type { V1AuthGoogleRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthApi();

  try {
    const data = await api.v1AuthGoogle();
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
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **302** | Redirect to Google OAuth provider |  * Location - Redirect URL <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## v1AuthLogout

> v1AuthLogout()

Log out the current user

### Example

```ts
import {
  Configuration,
  AuthApi,
} from '';
import type { V1AuthLogoutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthApi();

  try {
    const data = await api.v1AuthLogout();
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
| **204** | Logout successful |  -  |
| **401** | Not authenticated |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## v1AuthMicrosoft

> v1AuthMicrosoft()

Start Microsoft OAuth login

Redirects the user to Microsoft OAuth consent screen.

### Example

```ts
import {
  Configuration,
  AuthApi,
} from '';
import type { V1AuthMicrosoftRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthApi();

  try {
    const data = await api.v1AuthMicrosoft();
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
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **302** | Redirect to Microsoft OAuth provider |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## v1AuthMicrosoftCallback

> v1AuthMicrosoftCallback(code, autherror)

Handle Microsoft OAuth callback

Handles the Microsoft OAuth callback, links or logs in a user as needed, and redirects to the frontend with success or error state. 

### Example

```ts
import {
  Configuration,
  AuthApi,
} from '';
import type { V1AuthMicrosoftCallbackRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthApi();

  const body = {
    // string | OAuth authorization code returned by Microsoft (optional)
    code: code_example,
    // string | OAuth error returned by Microsoft (optional)
    autherror: autherror_example,
  } satisfies V1AuthMicrosoftCallbackRequest;

  try {
    const data = await api.v1AuthMicrosoftCallback(body);
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
| **code** | `string` | OAuth authorization code returned by Microsoft | [Optional] [Defaults to `undefined`] |
| **autherror** | `string` | OAuth error returned by Microsoft | [Optional] [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **302** | Redirect to frontend (success, linking flow, or error) |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## v2AuthGoogleCallback

> v2AuthGoogleCallback(code, authError)

Handle Google OAuth callback

Handles the Google OAuth callback, links or logs in a user as needed, and redirects to the frontend with success or error state. 

### Example

```ts
import {
  Configuration,
  AuthApi,
} from '';
import type { V2AuthGoogleCallbackRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthApi();

  const body = {
    // string | OAuth authorization code returned by Google (optional)
    code: code_example,
    // string | OAuth error returned by Google (optional)
    authError: authError_example,
  } satisfies V2AuthGoogleCallbackRequest;

  try {
    const data = await api.v2AuthGoogleCallback(body);
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
| **code** | `string` | OAuth authorization code returned by Google | [Optional] [Defaults to `undefined`] |
| **authError** | `string` | OAuth error returned by Google | [Optional] [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **302** | Redirect to frontend (success, linking flow, or error) |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

