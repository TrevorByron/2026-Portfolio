# As is — animation baseline

Snapshot of the **Get Sh!t Done** phone grid and animation as of this mark.

## State

- **Phones:** 6 columns × 2 rows (12 phones), 222px wide, 9:19.5 aspect, -6.5° rotation
- **Layout:** Top row `top: 15%`, bottom row `top: calc(15% + 498px)`; 242px horizontal gap, bottom row +57px for rotation
- **Animation:** Horizontal scroll only (`phoneRowX`: 500 → 200 → -200 → -500). No vertical or column X animation (all column Y/X return 0)
- **Container:** `-mt-20` (80px up from paragraph), `min(2000px, 120vh)`, gradient overlay on bottom

## Restore this state

Overwrite the current component with the snapshot:

```bash
cp components/SelectedWork.as-is.tsx components/SelectedWork.tsx
```

Or in Cursor: replace the contents of `components/SelectedWork.tsx` with `components/SelectedWork.as-is.tsx`.
