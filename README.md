# Section 10 Project Option API

[Link to Udemy](https://www.udemy.com/course/vuejs-2-the-complete-guide/learn/lecture/21526316#overview)

## Option API

- slots
- Teleport
- provide / inject
- is

## Icons

[ Link to lucide ](https://lucide.dev/icons)

```
<script>
import { Save, Trash2 } from 'lucide-vue-next';

export default {
  components: { Save, Trash2 }
}
</script>

<template>
  <button type="button" class="btn-cta">
    <Save :size="18" /> save
  </button>
</template>
```
