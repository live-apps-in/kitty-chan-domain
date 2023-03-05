export interface HelloWorld{
  hello(data: HelloRequest): HelloResponse
}

export interface HelloRequest {
  name: string
}

export interface HelloResponse {
  message: string
}