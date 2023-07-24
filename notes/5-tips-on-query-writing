# Tips on Query Writing

So far, we've generally worked on backend. It's good time to talk about some tips about writing queries.

## Defining Fragments

To prevent repetitive parts on queries, it is possible to write fragments to use later on. 

```gql
fragment CompanyDetails on Company {
  name
  description
  id
  users {
    id
    age
  }
}

{
  company(id: "1") {
    ...CompanyDetails
  }
}
```

## Defining Aliases

It is also possible to define aliases to modify responses as you wish to handle data more efficiently.

```gql
{
  apple: company(id: "1") {
    ...CompanyDetails
  }
  google: company(id: "2") {
    ...CompanyDetails
  }
}

fragment CompanyDetails on Company {
  name
  description
  id
  users {
    id
    age
  }
}
```

```json
//result 

{
  "data": {
    "apple": {
      "name": "Apple",
      "description": "Apple Inc.",
      "id": "1",
      "users": [
        {
          "id": "23",
          "age": 20
        },
        {
          "id": "40",
          "age": 55
        }
      ]
    },
    "google": {
      "name": "Google",
      "description": "Google Inc.",
      "id": "2",
      "users": [
        {
          "id": "41",
          "age": 12
        }
      ]
    }
  }
}
```