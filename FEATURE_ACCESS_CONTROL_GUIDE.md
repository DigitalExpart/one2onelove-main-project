# 🔐 Feature Access Control Guide

This guide explains how to restrict features based on user subscription plans in One 2 One Love.

---

## 📋 Feature Access Matrix

| Feature | Basis (Free) | Premiere | Exclusive |
|---------|--------------|----------|-----------|
| Love Notes | 50 notes | 1,000 notes | Unlimited |
| Date Ideas | 5/month | Unlimited | Unlimited |
| AI Coach | ❌ | 50 questions/month | Unlimited |
| Quizzes | Basic | Advanced | Advanced |
| Ad-Free | ❌ | ✅ | ✅ |
| Priority Support | ❌ | ✅ | ✅ |
| AI Content Creator | ❌ | ❌ | ✅ |
| Expert Consultation | ❌ | ❌ | ✅ |
| VIP Badge | ❌ | ❌ | ✅ |

---

## 🛠️ Implementation Methods

### Method 1: FeatureGate Component (Recommended)

Use this to wrap entire components or pages that require a specific subscription plan.

```jsx
import FeatureGate from '@/components/subscription/FeatureGate';

function AICoachPage() {
  return (
    <FeatureGate 
      feature="ai_coach_limited" 
      requiredPlan="Premiere"
      showUpgradePrompt={true}
    >
      {/* This content only shows to Premiere and Exclusive users */}
      <AICoachComponent />
    </FeatureGate>
  );
}
```

**Props:**
- `feature` (string): Feature key from the access matrix
- `requiredPlan` (string): Minimum plan required ('Basis', 'Premiere', 'Exclusive')
- `showUpgradePrompt` (boolean): Show upgrade prompt if access denied (default: true)
- `fallback` (ReactNode): Custom component to show if access denied

---

### Method 2: useFeatureAccess Hook

Use this for conditional rendering or logic within components.

```jsx
import { useFeatureAccess } from '@/hooks/useFeatureAccess';

function LoveNotesPage() {
  const { hasAccess, plan } = useFeatureAccess('love_notes_extended');
  
  const maxNotes = hasAccess ? 1000 : 50;
  
  return (
    <div>
      <h2>Love Notes ({notes.length}/{maxNotes})</h2>
      {notes.length >= maxNotes && !hasAccess && (
        <UpgradePrompt message="Upgrade to access more notes!" />
      )}
    </div>
  );
}
```

**Returns:**
- `hasAccess` (boolean): Whether user has access to the feature
- `plan` (string): User's current plan
- `status` (string): Subscription status
- `user` (object): Full user object

---

### Method 3: Programmatic Check

Use this in service functions or API calls.

```jsx
import { hasFeatureAccess } from '@/lib/stripeService';
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user } = useAuth();
  
  const handleAction = () => {
    if (!hasFeatureAccess('unlimited_ai_coach', user)) {
      toast.error('This feature requires an Exclusive subscription');
      return;
    }
    
    // Proceed with action
  };
}
```

---

### Method 4: Feature Limits Hook

Use this to get feature limits for the current plan.

```jsx
import { useFeatureLimits } from '@/hooks/useFeatureAccess';

function DateIdeasPage() {
  const limits = useFeatureLimits();
  const monthlyIdeas = limits.dateIdeas; // 5, 'unlimited', or 'unlimited'
  
  return (
    <div>
      <h2>Monthly Date Ideas</h2>
      <p>
        {typeof monthlyIdeas === 'number' 
          ? `${usedIdeas}/${monthlyIdeas} ideas used this month` 
          : 'Unlimited ideas'}
      </p>
    </div>
  );
}
```

---

## 🎨 UI Components

### Feature Lock Badge

Shows a small "Premium" badge next to locked features.

```jsx
import { FeatureLockBadge } from '@/components/subscription/FeatureGate';

function FeatureCard({ title, feature }) {
  return (
    <Card>
      <CardTitle>
        {title}
        <FeatureLockBadge feature={feature} />
      </CardTitle>
    </Card>
  );
}
```

### Feature Access Message

Shows an inline upgrade message for locked features.

```jsx
import { FeatureAccessMessage } from '@/components/subscription/FeatureGate';

function AIContentCreator() {
  return (
    <div>
      <FeatureAccessMessage 
        feature="ai_content_creator" 
        requiredPlan="Exclusive" 
      />
      {/* Rest of component */}
    </div>
  );
}
```

---

## 🔑 Available Feature Keys

Use these keys with `hasFeatureAccess()` and `<FeatureGate>`:

### Basis (Free) Plan Features:
- `love_notes_limited` - 50+ notes
- `basic_quizzes` - Basic quizzes
- `date_ideas_limited` - 5 ideas/month
- `anniversary_reminders`
- `memory_timeline`
- `mobile_app`
- `email_support`

### Premiere Plan Features (includes all Basis features):
- `love_notes_extended` - 1000+ notes
- `ai_coach_limited` - 50 questions/month
- `unlimited_date_ideas`
- `goals_tracker`
- `advanced_quizzes`
- `surprise_messages`
- `ad_free`
- `priority_support`
- `early_access`

### Exclusive Plan Features (includes all Premiere features):
- `unlimited_love_notes`
- `unlimited_ai_coach`
- `ai_content_creator`
- `personalized_reports`
- `exclusive_community`
- `expert_consultation`
- `premium_support`
- `vip_badge`

---

## 📝 Real-World Examples

### Example 1: AI Relationship Coach Page

```jsx
import FeatureGate from '@/components/subscription/FeatureGate';
import { useFeatureLimits } from '@/hooks/useFeatureAccess';

function RelationshipCoach() {
  const limits = useFeatureLimits();
  const [questionsAsked, setQuestionsAsked] = useState(0);
  
  const canAskQuestion = 
    limits.aiQuestions === 'unlimited' || 
    questionsAsked < limits.aiQuestions;
  
  return (
    <FeatureGate feature="ai_coach_limited" requiredPlan="Premiere">
      <div>
        <h1>AI Relationship Coach</h1>
        
        {/* Show usage for limited plans */}
        {limits.aiQuestions !== 'unlimited' && (
          <div className="bg-yellow-50 p-4 rounded">
            <p>Questions used: {questionsAsked}/{limits.aiQuestions}</p>
            {!canAskQuestion && (
              <Button onClick={() => navigate('/subscription')}>
                Upgrade for Unlimited Questions
              </Button>
            )}
          </div>
        )}
        
        {/* AI Coach Component */}
        {canAskQuestion ? (
          <AICoachInput onSubmit={handleQuestion} />
        ) : (
          <UpgradePrompt />
        )}
      </div>
    </FeatureGate>
  );
}
```

### Example 2: Love Notes with Limits

```jsx
import { useFeatureAccess, useFeatureLimits } from '@/hooks/useFeatureAccess';
import { FeatureAccessMessage } from '@/components/subscription/FeatureGate';

function LoveNotesLibrary() {
  const { hasAccess: hasExtended } = useFeatureAccess('love_notes_extended');
  const { hasAccess: hasUnlimited } = useFeatureAccess('unlimited_love_notes');
  const [notes, setNotes] = useState([]);
  
  // Determine max notes based on plan
  const maxNotes = hasUnlimited ? Infinity : (hasExtended ? 1000 : 50);
  const isLimitReached = notes.length >= maxNotes;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>Love Notes Library</h1>
        <span className="text-sm text-gray-600">
          {notes.length} / {maxNotes === Infinity ? '∞' : maxNotes}
        </span>
      </div>
      
      {/* Show upgrade message when approaching limit */}
      {!hasUnlimited && notes.length >= maxNotes * 0.8 && (
        <FeatureAccessMessage 
          feature="unlimited_love_notes" 
          requiredPlan="Exclusive" 
        />
      )}
      
      {/* Prevent saving if limit reached */}
      <Button 
        onClick={handleSaveNote}
        disabled={isLimitReached}
      >
        {isLimitReached ? 'Upgrade to Save More' : 'Save Note'}
      </Button>
      
      {/* Display notes */}
      <div className="grid gap-4">
        {notes.map(note => <NoteCard key={note.id} note={note} />)}
      </div>
    </div>
  );
}
```

### Example 3: Date Ideas with Monthly Limit

```jsx
import { useFeatureLimits } from '@/hooks/useFeatureAccess';
import FeatureGate from '@/components/subscription/FeatureGate';

function DateIdeas() {
  const limits = useFeatureLimits();
  const [ideasViewedThisMonth, setIdeasViewedThisMonth] = useState(0);
  
  const canViewMore = 
    limits.dateIdeas === 'unlimited' || 
    ideasViewedThisMonth < limits.dateIdeas;
  
  return (
    <div>
      <h1>Date Ideas</h1>
      
      {/* Show usage indicator */}
      {limits.dateIdeas !== 'unlimited' && (
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-sm font-semibold">
            Monthly Limit: {ideasViewedThisMonth}/{limits.dateIdeas}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${(ideasViewedThisMonth / limits.dateIdeas) * 100}%` }}
            />
          </div>
        </div>
      )}
      
      {/* Date ideas grid */}
      {canViewMore ? (
        <DateIdeasGrid onView={() => setIdeasViewedThisMonth(prev => prev + 1)} />
      ) : (
        <FeatureGate feature="unlimited_date_ideas" requiredPlan="Premiere" />
      )}
    </div>
  );
}
```

### Example 4: Conditional Features in Navigation

```jsx
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { Lock } from 'lucide-react';

function NavigationMenu() {
  const { hasAccess: hasAICoach } = useFeatureAccess('ai_coach_limited');
  const { hasAccess: hasContentCreator } = useFeatureAccess('ai_content_creator');
  
  return (
    <nav>
      <NavLink to="/love-notes">Love Notes</NavLink>
      
      <NavLink 
        to={hasAICoach ? '/ai-coach' : '/subscription'}
        className={!hasAICoach ? 'opacity-60' : ''}
      >
        AI Coach
        {!hasAICoach && <Lock className="w-4 h-4 ml-1" />}
      </NavLink>
      
      <NavLink 
        to={hasContentCreator ? '/ai-creator' : '/subscription'}
        className={!hasContentCreator ? 'opacity-60' : ''}
      >
        AI Content Creator
        {!hasContentCreator && <Lock className="w-4 h-4 ml-1" />}
      </NavLink>
    </nav>
  );
}
```

---

## 🧪 Testing Feature Access

### Test as Different User Types

```jsx
// In development, you can manually set subscription plans to test:
// Go to Supabase Dashboard → Table Editor → users
// Update subscription_plan to: 'Basis', 'Premiere', or 'Exclusive'

// Test scenarios:
// 1. Free user trying to access AI Coach (should show upgrade prompt)
// 2. Premiere user accessing AI Coach (should work with 50 question limit)
// 3. Exclusive user accessing AI Coach (should work unlimited)
// 4. Free user reaching 50 note limit (should prompt upgrade)
```

---

## 🔄 Updating Feature Access

To add a new premium feature:

1. **Add to feature matrix** in `src/lib/stripeService.js`:

```js
const featureAccess = {
  Basis: ['existing_features...'],
  Premiere: ['existing_features...', 'new_premium_feature'],
  Exclusive: ['existing_features...', 'new_premium_feature']
};
```

2. **Protect the feature** in your component:

```jsx
<FeatureGate feature="new_premium_feature" requiredPlan="Premiere">
  <NewFeatureComponent />
</FeatureGate>
```

3. **Update documentation** - Add to feature list in this guide and subscription page

---

## 📞 Questions?

- Review `src/lib/stripeService.js` for feature definitions
- Check `src/hooks/useFeatureAccess.js` for hook implementations
- See `src/components/subscription/FeatureGate.jsx` for gate components

**Happy coding! 💕**

