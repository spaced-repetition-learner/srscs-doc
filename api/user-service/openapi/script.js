var spec = {
   "openapi": "3.0.0",
   "info": {
      "title": "User-Service API",
      "version": "v1.1"
   },
   "paths": {
      "/users": {
         "post": {
            "summary": "Creates a new user.",
            "tags": [
               "/users"
            ],
            "description": "Creates a new user with an unique username and mailaddress.",
            "requestBody": {
               "required": true,
               "content": {
                  "application/json": {
                     "schema": {
                        "$ref": "#/components/schemas/newUser"
                     }
                  }
               }
            },
            "responses": {
               "201": {
                  "description": "New user created.",
                  "content": {
                     "application/json": {
                        "schema": {
                           "$ref": "#/components/schemas/user"
                        }
                     }
                  }
               },
               "403": {
                  "description": "Possible causes are\n  - Username or mailaddress already in use\n"
               }
            }
         },
         "get": {
            "summary": "Retrieves a user by filter.",
            "tags": [
               "/users"
            ],
            "description": "Mutually exclusive filtering for username, mailaddress and user-id.\n",
            "parameters": [
               {
                  "in": "query",
                  "name": "filter",
                  "required": true,
                  "description": "Mutually exclusive.",
                  "style": "form",
                  "explode": true,
                  "schema": {
                     "type": "object",
                     "properties": {
                        "user-id": {
                           "$ref": "#/components/schemas/uuid"
                        },
                        "username": {
                           "$ref": "#/components/schemas/username"
                        },
                        "mail-address": {
                           "$ref": "#/components/schemas/mail"
                        }
                     },
                     "additionalProperties": false,
                     "oneOf": [
                        {
                           "required": [
                              "userId"
                           ]
                        },
                        {
                           "required": [
                              "username"
                           ]
                        },
                        {
                           "required": [
                              "mail-address"
                           ]
                        }
                     ]
                  }
               }
            ],
            "responses": {
               "200": {
                  "description": "Retrieves the queried user.",
                  "content": {
                     "application/json": {
                        "schema": {
                           "$ref": "#/components/schemas/user"
                        }
                     }
                  }
               },
               "404": {
                  "description": "User not found."
               }
            }
         }
      },
      "/users/{user-id}": {
         "delete": {
            "summary": "Disables the user.",
            "tags": [
               "/users"
            ],
            "description": "Soft deletes the user. No data will be removed.",
            "parameters": [
               {
                  "$ref": "#/components/parameters/userId"
               }
            ],
            "responses": {
               "200": {
                  "description": "User successfully deleted."
               },
               "404": {
                  "description": "User not found."
               }
            }
         }
      },
      "/logs": {
         "get": {
            "summary": "Exposes log-files for dev. purposes.",
            "tags": [
               "/logs"
            ],
            "parameters": [
               {
                  "in": "path",
                  "name": "file",
                  "required": true,
                  "examples": {
                     "info": {
                        "value": "info"
                     },
                     "error": {
                        "value": "error"
                     },
                     "dinfo": {
                        "value": "dinfo"
                     },
                     "dtrace": {
                        "value": "dtrace"
                     }
                  },
                  "schema": {
                     "type": "string"
                  }
               }
            ],
            "responses": {
               "200": {
                  "description": "Returns the queried logfile.",
                  "content": {
                     "text/plain": {
                        "schema": {
                           "type": "string"
                        }
                     }
                  }
               }
            }
         }
      }
   },
   "components": {
      "schemas": {
         "uuid": {
            "type": "string",
            "format": "uuid",
            "example": "d290f1ee-6c54-4b01-90e6-d701748f0851"
         },
         "mail": {
            "type": "string",
            "description": "Mailaddresses must be unique.",
            "format": "email",
            "example": "dadepu@gmail.com"
         },
         "username": {
            "type": "string",
            "description": "Usernames must be unique.",
            "example": "dadepu",
            "pattern": "^([A-Za-z0-9]){4,16}$"
         },
         "name": {
            "type": "string",
            "example": "Daniel",
            "pattern": "^([A-Za-z0-9 ]){3,12}$"
         },
         "password": {
            "type": "string",
            "format": "password",
            "example": "abc123"
         },
         "newUser": {
            "type": "object",
            "required": [
               "username",
               "mailAddress",
               "firstName",
               "lastName"
            ],
            "properties": {
               "username": {
                  "$ref": "#/components/schemas/username"
               },
               "mailAddress": {
                  "$ref": "#/components/schemas/mail"
               },
               "firstName": {
                  "$ref": "#/components/schemas/name"
               },
               "lastName": {
                  "$ref": "#/components/schemas/name"
               }
            }
         },
         "user": {
            "type": "object",
            "required": [
               "userId",
               "username",
               "mailAddress",
               "firstName",
               "lastName",
               "isActive"
            ],
            "properties": {
               "userId": {
                  "$ref": "#/components/schemas/uuid"
               },
               "username": {
                  "$ref": "#/components/schemas/username"
               },
               "mailAddress": {
                  "$ref": "#/components/schemas/mail"
               },
               "firstName": {
                  "$ref": "#/components/schemas/name"
               },
               "lastName": {
                  "$ref": "#/components/schemas/name"
               },
               "isActive": {
                  "type": "boolean"
               }
            }
         }
      },
      "parameters": {
         "userId": {
            "in": "path",
            "name": "user-id",
            "schema": {
               "$ref": "#/components/schemas/uuid"
            },
            "required": true
         }
      }
   }
}