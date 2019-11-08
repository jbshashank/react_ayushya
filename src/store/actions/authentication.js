export const passwordResetHashCreated = () => ({ type: 'AUTHENTICATION_PASSWORD_RESET_HASH_CREATED' });
export const passwordResetHashFailure = () => ({ type: 'AUTHENTICATION_PASSWORD_RESET_HASH_FAILURE' });


// function to send email address to be hashed

export function createHash(email) {
  return async (dispatch) => {
    await fetch(
      '/',
      {
        method: 'post',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'aplication/json',
        },
        credentials: 'same-origin',
      },
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json) => {
        if (json.username) {
          return dispatch(passwordResetHashCreated(json));
        }
        return dispatch(passwordResetHashFailure(new Error('Something went wrong, Please try again.')));
      })
      .catch(error => dispatch(passwordResetHashFailure(error)));
  };
}
