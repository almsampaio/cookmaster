/*
// Organização das camadas: Por função
  
PORT 3000
  │
server
   └─ app
        └─ layers 
              ├── connection ───────────────┐
              │                             │
              ├── users                     │
              │   ├── usersControllers      │
              │   │         ↓               │
              │   ├── usersMiddleware       │
              │   │         ↓               │
              │   ├── usersServices         │
              │   │         ↓               │
              │   └── usersModels ──────────┤
              │                             │
              ├── authentication            │
              │   └── authMiddleware        │
              │                             │
              ├── login                     │
              │   ├── loginControllers      │
              │   │         ↓               │
              │   └── loginMiddleware       │
              │                             │
              └── recipes                   │
                  ├── recipesControllers    │
                  │         ↓               │
                  ├── recipesMiddleware     │
                  │         ↓               │
                  ├── recipesServices       │
                  │         ↓               │
                  └── recipesModels ────────┘ 
*/
