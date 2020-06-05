export class InvalidCredentialsError extends Error {
  message = 'Invalid username or password';
}

export class UserAlreadyExistsError extends Error {
  message = 'User already exists';
}
