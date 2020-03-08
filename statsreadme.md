# stats file
the stats file follows the following definitions:
```typescript
interface StatsFile
{
    choiceChances:{
        [choice:string]:ChoiceChance[]
    }

    totals:{
        [choice:string]:number
        total:number
    }
}

type ChoiceChance=number;
```

# ChoiceChance
When a choice is picked, the stat system records the choice's choice chance into the stats file, appending to the array of choice chances already held by the choice. The choice chance is the number of all choices that were present when the choice was made, **including itself**. Therefore, a decision with the following choices and a single choice:

```
1. choiceA
2. choiceB
3. choiceC

> choiceA
choiceChance=3
```

would result in a choiceChance of 3 being added to choiceA's array of choice chances in the stat file. A larger number therefore represents a choice being picked more in situations where it would be rare to be picked, yet it is still being picked.