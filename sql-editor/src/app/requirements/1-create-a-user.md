the user exists already

```javascript
{
  name: 'users/105',
  state: 'ACTIVE',
  email: 'a@bytebase.com',
  title: 'adela',
  userType: 'USER',
  password: '',
  serviceKey: '',
  mfaEnabled: false,
  mfaSecret: '',
  recoveryCodes: [],
  phone: '',
  profile: {
    lastLoginTime: '2024-10-28T10:10:29.471813137Z',
    lastChangePasswordTime: null,
    source: ''
  }
}
```

Not exists
```javascript
{ code: 5, message: 'user 0 not found', details: [] }
```