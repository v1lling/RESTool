export default {
  "name": "Configuration",
  "favicon": "https://www.savignano.net/wp-content/uploads/fbrfg/favicon.ico?v=3",
  "baseUrl": "http://localhost:8080/api/v1",
  "auth": {
    "type": "sessioncookie",
    "loginEndpoint": "/auth/login",
    "logoutEndpoint": "/auth/logout",
    "userEndpoint": "/auth/user",
    "changePasswordEndpoint": "/auth/change-password",
    "icons": {
      "changePassword": "retweet",
      "logout": "sign-out"
    }
  },
  "requestHeaders": {
    "Accept": "application/json",
  },
  "errorMessageDataPath": [
    "errors.0",
    "error"
  ],
  "customLabels": {
    "successMessages": {
      "addItem": null,
      "editItem": null,
      "deleteItem": null,
    }
  },
  "customStyles": {
    "vars": {
      "logoHeaderBackground": '#fff',
    }
  },
  "pages": [
    {
      "name": "Uptrust General",
      "id": "uptrust",
      "icon": "cog",

      "methods": {
        "getAll": {
          "url": "/uptrust",
          "dataPath": "data",
          "display": {
            "type": "cards"
          },
          "fields": [
            // General
            {
              "name": "uptrustServerStatus",
              "type": "text"
            },
            {
              "name": "enabled",
              "type": "boolean",
            },
            // Incoming Mail 
            {
              "name": "checkTrust",
              "dataPath": "incomingMail",
              "type": "boolean",
            },
            {
              "name": "serverSideProtectionHandling",
              "dataPath": "incomingMail",
              "type": "boolean",
            },
            // Outgoing Mail
            {
              "name": "protection",
              "dataPath": "outgoingMail",
              "type": "text",
            },
            {
              "name": "protectionFailureBehaviour",
              "dataPath": "outgoingMail",
              "type": "text"
            },
            // Decoration
            {
              "name": "insertProtectionIndicators",
              "dataPath": "decoration",
              "type": "text",
            },
            {
              "name": "protectionIndicatorLocation",
              "dataPath": "decoration",
              "type": "text"
            },
            // Cryptography Encryption
            {
              "name": "pgpSymmetricKeyAlgorithm",
              "dataPath": "cryptography.encryption",
              "type": "text"
            },
            /*
            {
              "name": "smimeSymmetricKeyAlgorithm",
              "dataPath": "cryptography.encryption",
              "type": "text"
            },
            {
              "name": "smimeSymmetricKeySize",
              "dataPath": "cryptography.encryption",
              "type": "text"
            },
            */
            // Cryptography Decryption
            {
              "name": "pgpCheckInline",
              "dataPath": "cryptography.decryption",
              "type": "boolean"
            },
            {
              "name": "pgpBinaryRegex",
              "dataPath": "cryptography.decryption",
              "type": "text"
            },
            // Cryptography Validation
            {
              "name": "pgpCheckInline",
              "dataPath": "cryptography.validation",
              "type": "boolean"
            },
          ],
        },
        "put": {
          "url": "/uptrust",
          "fields": [
            // General
            {
              "name": "enabled",
              "type": "boolean",
            },
            // Incoming Mail
            {
              "name": "checkTrust",
              "dataPath": "incomingMail",
              "type": "boolean",
            },
            {
              "name": "serverSideProtectionHandling",
              "dataPath": "incomingMail",
              "type": "boolean",
            },
            // Outgoing Mail
            {
              "name": "protection",
              "dataPath": "outgoingMail",
              "type": "select",
              "options": ["SMIME_ONLY", "SMIME_PREFERRED", "PGP_ONLY", "PGP_PREFERRED"]
            },
            {
              "name": "protectionFailureBehaviour",
              "dataPath": "outgoingMail",
              "type": "select",
              "options": ["CONTINUE", "ABORT"]
            },
            // Decoration
            {
              "name": "insertProtectionIndicators",
              "dataPath": "decoration",
              "type": "select",
              "options": ["ALWAYS", "EXISTING", "NEVER"]
            },
            {
              "name": "protectionIndicatorLocation",
              "dataPath": "decoration",
              "type": "select",
              "options": ["BODY", "SUBJECT"]
            },
            // Cryptography Encryption
            {
              "name": "pgpSymmetricKeyAlgorithm",
              "dataPath": "cryptography.encryption",
              "type": "select",
              "options": [""]
            },
            {
              "name": "smimeSymmetricKeyAlgorithm",
              "dataPath": "cryptography.encryption",
              "type": "select",
              "options": ["1.3.6.1.4.1.188.7.1.1.2"]
            },
            {
              "name": "smimeSymmetricKeySize",
              "dataPath": "cryptography.encryption",
              "type": "select",
              "options": ["0", "4096"]
            },
            // Cryptography Decryption
            {
              "name": "pgpCheckInline",
              "dataPath": "cryptography.decryption",
              "type": "boolean"
            },
            {
              "name": "pgpBinaryRegex",
              "dataPath": "cryptography.decryption",
              "type": "text"
            },
            // Cryptography Validation
            {
              "name": "pgpCheckInline",
              "dataPath": "cryptography.validation",
              "type": "boolean"
            },
          ]
        },
        "post": {
          "url": "/uptrust/apply",
          "icon": "check",
          "fields": [],
        }
      },
    },
    {
      "name": "Uptrust Keysources",
      "id": "uptrust-keysources",
      "icon": "key",
      "methods": {
        "getAll": {
          "url": "/uptrust/keysources",
          "dataPath": "data",
          "dataTransform": (value) => {
            // change the "file" property to only contain the file name
            value.forEach((item) => {
              if (item.config && item.config.file) {
                // Handle both Windows and Unix paths
                const fileName = item.config.file.split(/[/\\]/).pop();
                item.config.file = fileName;
              }
            });
            return value;
          },
          "display": {
            "type": "table"
          },
          "fields": [
            {
              "name": "enabled",
              "type": "boolean",
            },
            {
              "name": "id",
              "type": "text",
            },
            {
              "name": "cryptography",
              "type": "text",
            },
            {
              "name": "confidentiality",
              "type": "text",
            },
            {
              "name": "type",
              "type": "text",
            }
          ]
        },
        // ----------------------------
        // Keysource UPDATE
        // ----------------------------
        "put": {
          "url": "/uptrust/keysources/:uuid",
          "fields": [
            {
              "name": "uuid",
              "type": "hidden"
            },
            // ---- ENABLED ----
            {
              "name": "enabled",
              "type": "boolean",
            },
            // ---- ID ----
            {
              "name": "id",
              "type": "text",
            },
            // ---- CRYPTOGRAPHY ----
            {
              "name": "cryptography",
              "type": "select",
              "options": ["PGP", "SMIME"],
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && typeField.value !== "keyserver";
              },
            },
            // ---- TYPE ----
            {
              "name": "type",
              "type": "select",
              "options": ["keystore", "keyserver", "keybox", "ldap", "globaldirectory"],
              "showFieldWhen": (fields) => {
                const cryptoField = fields.find(f => f.originalName === "cryptography");
                return !cryptoField.value;
              }
            },
            {
              "name": "type",
              "type": "select",
              "options": ["keystore", "keyserver", "keybox", "ldap", "globaldirectory"],
              "showFieldWhen": (fields) => {
                const cryptoField = fields.find(f => f.originalName === "cryptography");
                return cryptoField && cryptoField.value == "SMIME";
              }
            },
            {
              "name": "type",
              "type": "select",
              "options": ["keystore", "keybox", "ldap",],
              "showFieldWhen": (fields) => {
                const cryptoField = fields.find(f => f.originalName === "cryptography");
                return cryptoField && cryptoField.value == "PGP";
              }
            },
            // ---- CONFIDENTIALITY ----
            // private / public (Keystore)
            {
              "name": "confidentiality",
              "type": "select",
              "options": ["public", "private"],
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && typeField.value === "keystore";
              }
            },
            // ---- CONFIGURATION OBJECT ----
            // Keystore / Keybox
            {
              "name": "file",
              "type": "text",
              "readonly": true,
              "dataPath": "config",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && (typeField.value === "keystore" || typeField.value === "keybox");
              },
            },
            {
              "name": "fileUpload",
              "type": "file",
              "dataPath": "config",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && (typeField.value === "keystore" || typeField.value === "keybox");
              },
            },
            // Keystore / Keybox / Keyserver
            {
              "name": "url",
              "type": "text",
              "dataPath": "config",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && typeField.value === "keystore" || typeField.value === "keybox" || typeField.value === "keyserver";
              },
            },
            // Keystore SMIME/PGP - private 
            {
              "name": "password",
              "type": "text",
              "dataPath": "config",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                const confidentialityField = fields.find(f => f.originalName === "confidentiality");
                return typeField && typeField.value === "keystore" && confidentialityField && confidentialityField.value === "private";
              },
            },
            // Keystore SMIME
            {
              "name": "type",
              "type": "select",
              "options": ["PKCS7", "PKCS12", "BKS"],
              "dataPath": "config",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                const cryptoField = fields.find(f => f.originalName === "cryptography");
                return typeField && typeField.value === "keystore" && cryptoField && cryptoField.value === "SMIME";
              },
            },
            // Keyserver
            {
              "name": "encodeSearchParam",
              "type": "boolean",
              "dataPath": "config",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && typeField.value === "keyserver";
              },
            },
            {
              "name": "timeout",
              "type": "number",
              "dataPath": "config",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && typeField.value === "keyserver";
              },
            },
            // LDAP / GLOBALDIRECTORY
            {
              "name": "hostURL",
              "type": "text",
              "dataPath": "config",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && (typeField.value === "ldap" || typeField.value === "globaldirectory");
              },
            },
            // LDAP
            {
              "name": "baseDN",
              "type": "text",
              "dataPath": "config",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && typeField.value === "ldap";
              },
            },
            {
              "name": "emailAttribute",
              "type": "text",
              "dataPath": "config",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && typeField.value === "ldap";
              },
            },
            {
              "name": "filter",
              "type": "text",
              "dataPath": "config",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && typeField.value === "ldap";
              },
            },
            {
              "name": "disableTrustCheck",
              "type": "boolean",
              "dataPath": "config",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && typeField.value === "ldap";
              },
            },
            // LDAP / GLOBALDIRECTORY 
            {
              "name": "user",
              "type": "text",
              "dataPath": "config.auth",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && (typeField.value === "ldap" || typeField.value === "globaldirectory");
              },
            },
            {
              "name": "password",
              "type": "text",
              "dataPath": "config.auth",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && (typeField.value === "ldap" || typeField.value === "globaldirectory");
              },
            },
          ]
        },
        "post": {
          "url": "/uptrust/keysources",
          "fields": [
            {
              "name": "uuid",
              "type": "hidden"
            },

            // ---- ENABLED ----
            {
              "name": "enabled",
              "type": "boolean",
              "value": true,
            },
            // ---- ID ----
            {
              "name": "id",
              "type": "text",
            },
            // ---- CRYPTOGRAPHY ----
            {
              "name": "cryptography",
              "type": "select",
              "options": ["PGP", "SMIME"],
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && typeField.value !== "keyserver";
              },
            },
            // ---- TYPE ----
            {
              "name": "type",
              "type": "select",
              "options": ["keystore", "keyserver", "keybox", "ldap", "globaldirectory"],
              "showFieldWhen": (fields) => {
                const cryptoField = fields.find(f => f.originalName === "cryptography");
                return !cryptoField.value;
              }
            },
            {
              "name": "type",
              "type": "select",
              "options": ["keystore", "keyserver", "keybox", "ldap", "globaldirectory"],
              "showFieldWhen": (fields) => {
                const cryptoField = fields.find(f => f.originalName === "cryptography");
                return cryptoField && cryptoField.value == "SMIME";
              }
            },
            {
              "name": "type",
              "type": "select",
              "options": ["keystore", "keybox", "ldap",],
              "showFieldWhen": (fields) => {
                const cryptoField = fields.find(f => f.originalName === "cryptography");
                return cryptoField && cryptoField.value == "PGP";
              }
            },
            // ---- CONFIDENTIALITY ----
            // private / public (Keystore)
            {
              "name": "confidentiality",
              "type": "select",
              "options": ["public", "private"],
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && typeField.value === "keystore";
              }
            },
            // ---- CONFIGURATION OBJECT ----
            // Keystore / Keybox
            {
              "name": "fileUpload",
              "type": "file",
              "dataPath": "config",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && (typeField.value === "keystore" || typeField.value === "keybox");
              },
            },
            // Keystore / Keybox / Keyserver
            {
              "name": "url",
              "type": "text",
              "dataPath": "config",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && typeField.value === "keystore" || typeField.value === "keybox" || typeField.value === "keyserver";
              },
            },
            // Keystore SMIME/PGP - private 
            {
              "name": "password",
              "type": "text",
              "dataPath": "config",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                const confidentialityField = fields.find(f => f.originalName === "confidentiality");
                return typeField && typeField.value === "keystore" && confidentialityField && confidentialityField.value === "private";
              },
            },
            // Keystore SMIME
            {
              "name": "type",
              "type": "select",
              "options": ["PKCS7", "PKCS12", "BKS"],
              "dataPath": "config",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                const cryptoField = fields.find(f => f.originalName === "cryptography");
                return typeField && typeField.value === "keystore" && cryptoField && cryptoField.value === "SMIME";
              },
            },
            // Keyserver
            {
              "name": "encodeSearchParam",
              "type": "boolean",
              "dataPath": "config",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && typeField.value === "keyserver";
              },
            },
            {
              "name": "timeout",
              "type": "number",
              "dataPath": "config",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && typeField.value === "keyserver";
              },
            },
            // LDAP / GLOBALDIRECTORY
            {
              "name": "hostURL",
              "type": "text",
              "dataPath": "config",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && (typeField.value === "ldap" || typeField.value === "globaldirectory");
              },
            },
            // LDAP
            {
              "name": "baseDN",
              "type": "text",
              "dataPath": "config",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && typeField.value === "ldap";
              },
            },
            {
              "name": "emailAttribute",
              "type": "text",
              "value": "mail",
              "dataPath": "config",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && typeField.value === "ldap";
              },
            },
            {
              "name": "filter",
              "type": "text",
              "dataPath": "config",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && typeField.value === "ldap";
              },
            },
            {
              "name": "disableTrustCheck",
              "type": "boolean",
              "dataPath": "config",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && typeField.value === "ldap";
              },
            },
            // LDAP / GLOBALDIRECTORY 
            {
              "name": "user",
              "type": "text",
              "dataPath": "config.auth",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && (typeField.value === "ldap" || typeField.value === "globaldirectory");
              },
            },
            {
              "name": "password",
              "type": "text",
              "dataPath": "config.auth",
              "showFieldWhen": (fields) => {
                const typeField = fields.find(f => f.originalName === "type");
                return typeField && (typeField.value === "ldap" || typeField.value === "globaldirectory");
              },
            },
          ]
        },
        "delete": {
          "url": "/uptrust/keysources/:uuid"
        }
      },
    },
    {
      "name": "Uptrust Domainkeys",
      "id": "uptrust-domainkeys",
      "icon": "globe",
      "methods": {
        "getAll": {
          "url": "/uptrust/domainkeys",
          "dataPath": "data",
          "display": {
            "type": "table"
          },
          "fields": [
            {
              "name": "email",
              "type": "text",
            },
            {
              "name": "type",
              "type": "text",
            }
          ]
        },
        "put": {
          "url": "/uptrust/domainkeys/:uuid",
          "fields": [
            {
              "name": "email",
              "type": "text",
            },
            {
              "name": "type",
              "type": "select",
              "options": ["PGP", "SMIME"]
            }
          ]
        },
        "post": {
          "url": "/uptrust/domainkeys",
          "fields": [
            {
              "name": "email",
              "type": "text",
            },
            {
              "name": "type",
              "type": "select",
              "options": ["PGP", "SMIME"],
            }
          ]
        },
        "delete": {
          "url": "/uptrust/domainkeys/:uuid"
        }
      },
    },

  ]
}