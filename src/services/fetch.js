import { put } from 'redux-saga/effects'

// Define the handleSagaFetchError function
function* handleSagaFetchError(e, options = {}) {
  const { showErrorAlert = true } = options
  const { locale } = yield selectSettings()
  const { message, status } = handleFetchError(e)

  if (status === 401 || status === 403) {
    yield put(profileActions.resetCache())
    yield put(clearUserNonce())
  }

  if (showErrorAlert && message && message.length) {
    yield showSagaAlert({
      title: status ? `errors.${status}` : undefined,
      message: Array.isArray(message) ? message[0] : message,
      mode: 'Error',
      buttons: [
        {
          text: 'ok',
        },
      ],
    })
  }
}
