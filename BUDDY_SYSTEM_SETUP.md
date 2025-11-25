## Buddy/Friend System Setup Guide

## 🎯 Overview

The FindFriends page now displays **real users** from your platform instead of mock data. Users can search for other members, send buddy requests, and connect with each other.

## 📋 Prerequisites

- Supabase project set up
- User authentication working
- Users registered in the `users` table

## 🚀 Step 1: Create Database Table

1. **Go to Supabase Dashboard**: https://app.supabase.com
2. **Select your project**
3. **Click "SQL Editor"** (left sidebar)
4. **Click "+ New query"**
5. **Copy and paste the SQL from** `supabase-buddy-system-schema.sql`
6. **Click "Run"** or press `Ctrl+Enter`

You should see: **"Success"**

## ✅ What This Creates

### Database Table: `buddy_requests`

Stores all buddy/friend requests:

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Unique request ID |
| `from_user_id` | UUID | User who sent the request |
| `to_user_id` | UUID | User who received the request |
| `status` | TEXT | pending, accepted, or rejected |
| `created_at` | TIMESTAMP | When request was created |
| `updated_at` | TIMESTAMP | Last update time |

### Row Level Security (RLS) Policies

✅ Users can only see requests they sent or received  
✅ Users can send requests to others  
✅ Users can accept/reject requests they received  
✅ Users can cancel their own pending requests  

### Constraints

✅ Unique buddy requests (prevents duplicate requests)  
✅ No self-requests (users can't request themselves)  

### Indexes

✅ Fast queries by from_user_id  
✅ Fast queries by to_user_id  
✅ Fast queries by status  

## 🎮 Step 2: Test the Feature

### View Real Users

1. **Sign in** to your app
2. **Navigate to**: http://localhost:5174/findfriends
3. **You should see**:
   - Real users from your database
   - No more mock data!
   - Users with their actual names, emails, and bios

### Send Buddy Request

1. **Find a user** in the list
2. **Click "Send Request"** button
3. **Verify**:
   - Button changes to "Cancel Request"
   - Success message appears
   - Request is saved in `buddy_requests` table

### Search for Users

1. **Type in the search box**: name, email, or bio text
2. **Results filter in real-time**
3. **Works with**:
   - User names
   - Email addresses
   - Bio descriptions
   - Relationship status

## 🔍 Verify in Supabase

### Check buddy_requests Table

1. Go to **Database** → **Tables** in Supabase
2. Click on **`buddy_requests`** table
3. You should see your sent requests!

### Check Users are Loading

1. Make sure you have users in the `users` table
2. The FindFriends page excludes:
   - The current user (you)
   - Non-regular users (therapists, influencers, professionals)

### Test Queries

```sql
-- See all buddy requests
SELECT * FROM buddy_requests;

-- See pending requests for a user
SELECT * FROM buddy_requests 
WHERE to_user_id = 'your-user-id' 
AND status = 'pending';

-- See accepted buddies
SELECT * FROM buddy_requests 
WHERE status = 'accepted';
```

## 🎯 Features Enabled

### ✅ Real User Discovery
- Shows actual registered users
- Excludes current user
- Shows only regular users (not therapists/professionals)
- Up to 50 users displayed

### ✅ Real-time Search
- Search by name
- Search by email
- Search by bio
- Search by relationship status

### ✅ Buddy Requests
- Send requests to other users
- Cancel pending requests
- Requests saved in database
- Duplicate request prevention

### ✅ User Information Display
- User name and email
- Profile avatar (generated if not uploaded)
- Bio/about section
- Relationship status
- Member since date

### ✅ Security
- Row Level Security enabled
- Users can only see own requests
- Can't send request to self
- Authenticated users only

## 🔄 Data Flow

1. **User visits FindFriends page**
2. **System fetches** real users from `users` table
3. **System fetches** sent requests to mark which users already have pending requests
4. **User searches** → filters locally in browser
5. **User sends request** → saves to `buddy_requests` table
6. **Request persists** in database for recipient to view later

## 🎨 User Experience

### Before (Mock Data)
- 4 fake users (Sarah, Mike, Emma, David)
- Always the same people
- Data never changes
- Requests don't save

### After (Real Data) ✅
- Real platform users
- Grows as more users sign up
- Search actually works
- Requests persist in database
- Shows when users joined

## 🐛 Troubleshooting

### Issue: No users showing up

**Solutions**:
1. ✅ Make sure you have users in the `users` table
2. ✅ Make sure users have `user_type = 'regular'`
3. ✅ Sign in as a user (can't see users if not authenticated)
4. ✅ Check browser console for errors

### Issue: "Loading users..." forever

**Solutions**:
1. ✅ Check Supabase credentials in `.env`
2. ✅ Restart dev server
3. ✅ Check browser network tab for API errors
4. ✅ Verify user is signed in

### Issue: Can't send buddy requests

**Solutions**:
1. ✅ Make sure you ran the buddy_requests table SQL
2. ✅ Check RLS policies are created
3. ✅ Verify user is authenticated
4. ✅ Check browser console for errors

### Issue: Seeing self in the list

**This shouldn't happen**, but if it does:
- Check the `getAllUsers` function excludes current user
- Verify `currentUserId` is being passed correctly

## 📊 Database Queries for Testing

### Count total users:
```sql
SELECT COUNT(*) FROM users WHERE user_type = 'regular';
```

### View all buddy requests:
```sql
SELECT 
  br.*,
  from_user.name as from_name,
  to_user.name as to_name
FROM buddy_requests br
JOIN users from_user ON br.from_user_id = from_user.id
JOIN users to_user ON br.to_user_id = to_user.id;
```

### Accepted buddies:
```sql
SELECT COUNT(*) FROM buddy_requests WHERE status = 'accepted';
```

## 🚀 Next Steps (Optional)

1. **Accept/Reject Requests**: Create a notifications page for incoming requests
2. **Buddy List**: Show accepted buddies in a separate page
3. **Profile Pages**: Click user to view full profile
4. **Mutual Friends**: Show if you have mutual buddies
5. **Advanced Search**: Filter by relationship status, join date, etc.
6. **Recommendations**: Suggest users based on interests

## 📚 API Reference

The buddy service (`src/lib/buddyService.js`) provides:

- `getAllUsers(userId, options)` - Get all users except current user
- `searchUsers(userId, query)` - Search users by query
- `sendBuddyRequest(fromUserId, toUserId)` - Send request
- `cancelBuddyRequest(requestId, userId)` - Cancel request
- `getSentBuddyRequests(userId)` - Get sent requests
- `getReceivedBuddyRequests(userId)` - Get received requests
- `acceptBuddyRequest(requestId, userId)` - Accept request
- `rejectBuddyRequest(requestId, userId)` - Reject request
- `getMyBuddies(userId)` - Get accepted buddies

## ✅ Done!

Your FindFriends page now shows **real users** from your platform! 🎉

No more fake data - it's all real now!

