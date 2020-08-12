class AppError {
  readonly message: string
  readonly status: number

  constructor(message: string, status: number) {
    this.message = message
    this.status = status
  }
}

export default AppError
