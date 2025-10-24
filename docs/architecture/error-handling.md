# Error Handling

All errors use standardized format:

```typescript
class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500
  ) {
    super(message)
  }
}
```

**Response:**
```json
{
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "File exceeds 50MB limit",
    "statusCode": 400
  }
}
```

---
